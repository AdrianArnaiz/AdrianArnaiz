/* Seeded topology across the first home section. Pointer-driven; no idle loop.
 * PERSONALIZATION GUIDE
 * - CONFIG: hover strength/reach, rendering limits, and settling threshold.
 * - communities / seed / node loop: layout, reproducibility, and node count.
 * - addEdge / bridge loop: connection density and community structure.
 * - paint(): response speed, line thickness, node size, and opacity.
 * - resize() / quiet(): how much the graph fades behind readable content.
 * - palette(): colors come from --research-graph in assets/scss/custom.scss.
 *
 * Coordinates in the topology are fractions of the section (0 to 1).
 * Interaction distances and drawing sizes are CSS pixels, independent of DPR.
 * There is no automatic drift; rendering stops when pointer movement settles.
 * Keep reduced-motion/touch handling and visibility checks when customizing.
 * To disable the graph, set research_design.network = false in params.toml.
 */
(() => {
  'use strict';
  const canvas = document.querySelector('[data-research-network]');
  if (!canvas || !canvas.getContext) return;
  const context = canvas.getContext('2d');
  if (!context) return;
  const host = canvas.parentElement;
  const section = canvas.closest('.home-section');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const connection = navigator.connection;
  const CONFIG = {
    fps: 30, // Maximum update rate while reacting; higher is smoother but costs more.
    dpr: 1.5, // Pixel-density cap: higher makes the canvas sharper, using more memory.
    maxPixels: 2000000, // Total backing-buffer budget; also limits tall mobile sections.
    displacement: 24, // Maximum repulsion in CSS px. Try 12 for softer, 32 for stronger.
    radius: 190, // Pointer influence radius in CSS px. Larger affects more nodes.
    settle: .04 // Residual-error cutoff (position + emphasis). Smaller runs longer.
  };
  // COMMUNITY LAYOUT: 3 rows x 4 columns = 12 groups, ordered row by row.
  // Each [x, y] is a group center relative to the whole section's width/height.
  // .08/.12 are starting offsets; .28/.37 are spacing between columns/rows.
  // To change the grid dimensions, ALSO update the bridge indices below.
  const communities = [];
  for (let row=0; row<3; row++) for (let col=0; col<4; col++) {
    communities.push([.08+col*.28, .12+row*.37]);
  }
  const nodes = [], edges = [], pairs = new Set();
  // REPRODUCIBILITY: a fixed seed creates the same graph on every page load.
  // Pick another integer from 1 to 2147483646 for a different repeatable graph.
  // For a fresh graph per load, replace 47 with:
  // Math.floor(Math.random() * 2147483646) + 1
  let seed = 47;
  const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  communities.forEach(([cx,cy], group) => {
    // NODE COUNT: 7 per community = 84 total. More nodes also create more edges.
    for (let i=0;i<7;i++) {
      // Uniform scatter within an ellipse. The .12/.14 multipliers below set
      // horizontal/vertical spread as fractions of the section dimensions.
      // The .015/.985 and .025/.975 clamps keep centers inside the section.
      const angle=random()*Math.PI*2, radius=Math.sqrt(random());
      nodes.push({x:Math.max(.015,Math.min(.985,cx+Math.cos(angle)*radius*.12)),
        y:Math.max(.025,Math.min(.975,cy+Math.sin(angle)*radius*.14)),
        group, dx:0, dy:0, emphasis:0, px:0, py:0, quiet:1});
    }
  });
  const distance = (a,b) => Math.hypot(a.x-b.x,a.y-b.y);
  function addEdge(a,b) {
    const key=Math.min(a,b)+':'+Math.max(a,b);
    if (!pairs.has(key)) { pairs.add(key); edges.push({a,b,quiet:1}); }
  }
  // CONNECTION DENSITY: slice(0,2) chooses two nearest neighbors in each group.
  // Try 1 for sparser or 3 for denser connections. Shared edges are deduplicated;
  // a node can still have more than two links when others select it.
  // Distances use normalized coordinates, so resizing preserves the topology.
  nodes.forEach((node,i)=>nodes.map((other,j)=>({j,d:distance(node,other)}))
    .filter(({j})=>j!==i && nodes[j].group===node.group).sort((a,b)=>a.d-b.d)
    .slice(0,2).forEach(({j})=>addEdge(i,j)));
  // BRIDGES: join each community to its right-hand and lower neighbor.
  // These indices assume FOUR columns and THREE rows (matching the grid above):
  // group%4<3 guards the right edge; group<8 guards the bottom row; +4 moves down.
  // For C columns and R rows: use %C < C-1, < (R-1)*C, and +C respectively.
  // Skipping this entire loop leaves disconnected communities.
  communities.forEach((_,group)=>{
    [group%4<3?group+1:-1,group<8?group+4:-1].filter(g=>g>=0).forEach(next=>{
      let best=[0,0,Infinity];
      nodes.forEach((a,i)=>nodes.forEach((b,j)=>{
        if (a.group===group && b.group===next && distance(a,b)<best[2]) best=[i,j,distance(a,b)];
      }));
      addEdge(best[0],best[1]);
    });
  });
  let width=0, height=0, rect, color, timer=0, frameId=0, visible=false;
  const pointer={x:-10000,y:-10000};
  const allowed=()=>!reduce.matches && fine.matches && !(connection && connection.saveData);
  const canInteract=()=>allowed() && visible && !document.hidden;
  function stop() {
    clearTimeout(timer); cancelAnimationFrame(frameId); timer=frameId=0;
    canvas.dataset.state=allowed()?'idle':'static';
  }
  function paint(interactive) {
    context.clearRect(0,0,width,height);
    let unsettled=false;
    const mx=pointer.x-rect.left, my=pointer.y-rect.top;
    nodes.forEach(node=>{
      const x=node.x*width, y=node.y*height;
      const dx=x-mx, dy=y-my, length=Math.hypot(dx,dy);
      const near=interactive?Math.max(0,1-length/CONFIG.radius):0;
      const tx=length?dx/length*near*CONFIG.displacement:0;
      const ty=length?dy/length*near*CONFIG.displacement:0;
      if (interactive) {
        // RESPONSE SPEED: .22 moves 22% of the remaining distance per update.
        // Keep the three factors equal. Try .12 for softer/slower or .3 for faster.
        // This approaches the target without bounce or an ongoing physics loop.
        node.dx+=(tx-node.dx)*.22; node.dy+=(ty-node.dy)*.22;
        node.emphasis+=(near-node.emphasis)*.22;
        const moving=Math.abs(tx-node.dx)+Math.abs(ty-node.dy)+Math.abs(near-node.emphasis);
        if (moving>CONFIG.settle) unsettled=true;
        else {node.dx=tx;node.dy=ty;node.emphasis=near;}
      } else {node.dx=node.dy=node.emphasis=0;}
      node.px=x+node.dx;node.py=y+node.dy;
    });
    // EDGE STYLE: thickness in CSS px; keep thin for the scientific-graph look.
    context.lineWidth=.7;
    edges.forEach(edge=>{
      const a=nodes[edge.a], b=nodes[edge.b], emphasis=Math.max(a.emphasis,b.emphasis);
      // Edge opacity: .23 at rest, plus up to .3 on hover, multiplied by quiet.
      // Keep base + hover <= 1 when changing these values.
      context.strokeStyle='rgba('+color+','+((.23+emphasis*.3)*edge.quiet)+')';
      context.beginPath();context.moveTo(a.px,a.py);context.lineTo(b.px,b.py);context.stroke();
    });
    nodes.forEach(node=>{
      // Node opacity: .58 at rest, plus up to .24 on hover, multiplied by quiet.
      context.fillStyle='rgba('+color+','+((.58+node.emphasis*.24)*node.quiet)+')';
      // Node RADIUS: 1.35 CSS px at rest, growing by up to .65 on hover.
      context.beginPath();context.arc(node.px,node.py,1.35+node.emphasis*.65,0,Math.PI*2);context.fill();
    });
    return unsettled;
  }
  function frame() {
    timer=frameId=0;
    if (!canInteract()) { reset();return; }
    if (paint(true)) timer=setTimeout(()=>{timer=0;frameId=requestAnimationFrame(frame);},1000/CONFIG.fps);
    else stop();
  }
  function wake() {
    if (!canInteract() || timer || frameId) return;
    canvas.dataset.state='reacting';frameId=requestAnimationFrame(frame);
  }
  function reset() {
    stop();pointer.x=pointer.y=-10000;
    if (width) paint(false);
  }
  function resize() {
    rect=host.getBoundingClientRect();width=rect.width;height=rect.height;
    if (!width || !height) {stop();return;}
    const dpr=Math.min(devicePixelRatio||1,CONFIG.dpr,Math.sqrt(CONFIG.maxPixels/(width*height)));
    canvas.width=Math.floor(width*dpr);canvas.height=Math.floor(height*dpr);
    context.setTransform(dpr,0,0,dpr,0,0);
    // TEXT READABILITY: add/remove selectors here to choose protected content.
    // The +/-12 values expand each protected rectangle by 12 CSS px.
    // These measurements are cached on resize, including biography expansion;
    // do not move DOM/layout measurements into paint().
    const zones=Array.from(section.querySelectorAll('.article-style, .portrait-title, .network-icon, .section-subheading, .ul-interests, .ul-edu'))
      .map(el=>el.getBoundingClientRect()).map(r=>({left:r.left-rect.left-12,right:r.right-rect.left+12,top:r.top-rect.top-12,bottom:r.bottom-rect.top+12}));
    function quiet(x,y) {
      let value=1;
      zones.forEach(r=>{
        const distance=Math.hypot(Math.max(r.left-x,0,x-r.right),Math.max(r.top-y,0,y-r.bottom));
        // Inside a protected area, retain 30% of the normal graph opacity (.3).
        // Over the next 36 CSS px, fade back to full opacity (.3 + .7 = 1).
        // For quieter text backgrounds, try .15 + .85; keep the pair summing to 1.
        value=Math.min(value,.3+.7*Math.min(1,distance/36));
      });
      return value;
    }
    nodes.forEach(n=>{n.quiet=quiet(n.x*width,n.y*height);});
    edges.forEach(e=>{
      const a=nodes[e.a],b=nodes[e.b];e.quiet=1;
      // Five samples per edge keep a crossing edge faint near protected content.
      for(let i=0;i<=4;i++) e.quiet=Math.min(e.quiet,quiet((a.x+(b.x-a.x)*i/4)*width,(a.y+(b.y-a.y)*i/4)*height));
    });
    reset();
  }
  // THEME COLORS: edit --research-graph in custom.scss under :root (light) and
  // body.dark (dark). Supply an RGB triplet such as 45, 105, 91, without rgb().
  // Opacity belongs in paint(), not this CSS variable. The value below is fallback.
  function palette() {
    color=getComputedStyle(document.body).getPropertyValue('--research-graph').trim()||'45, 105, 91';
    if (width) {paint(false);wake();}
  }
  window.addEventListener('pointermove',event=>{
    if (!canInteract() || event.pointerType==='touch') return;
    const inside=event.clientX>=rect.left && event.clientX<=rect.right && event.clientY>=rect.top && event.clientY<=rect.bottom;
    if (!inside && pointer.x===-10000) return;
    pointer.x=inside?event.clientX:-10000;pointer.y=inside?event.clientY:-10000;wake();
  },{passive:true});
  section.addEventListener('pointerleave',()=>{pointer.x=pointer.y=-10000;wake();});
  window.addEventListener('scroll',()=>{if(visible){rect=host.getBoundingClientRect();reset();}},{passive:true});
  document.addEventListener('visibilitychange',reset);
  reduce.addEventListener('change',reset);fine.addEventListener('change',reset);
  if(connection) connection.addEventListener('change',reset);
  new MutationObserver(palette).observe(document.body,{attributes:true,attributeFilter:['class']});
  palette();resize();
  if('ResizeObserver' in window) new ResizeObserver(resize).observe(host);
  else window.addEventListener('resize',resize,{passive:true});
  if(document.fonts) document.fonts.ready.then(resize);
  if('IntersectionObserver' in window) new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;reset();}).observe(host);
  else visible=true;
  window.addEventListener('pagehide',stop);window.addEventListener('pageshow',reset);
})();
