/* tsParticles 4.4.0 evolving network, confined to the first homepage section.
 * PERSONALIZE: NETWORK controls density, edge reach, speed and node radius.
 * CONFIG controls rendering limits and the initial layout seed. Colors: --research-graph in custom.scss.
 * The official slim bundle is self-hosted; only this controller is custom.
 */
(() => {
  'use strict';
  const host=document.querySelector('#research-network-canvas');
  if (!host || !window.tsParticles || !window.loadSlim) return;
  const section=host.closest('.home-section');
  const shields=section.querySelector('.research-network-shields');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const fine=matchMedia('(hover: hover) and (pointer: fine)');
  const connection=navigator.connection;
  // Continuous drift while visible; reduced-motion/touch/data-saving stay static.
  const CONFIG={fps:40, mobileCount:42, seed:null};
  // seed:null gives a fresh arrangement per visit. Set an integer for repeatable
  // initial POSITIONS; tsParticles' initial velocities are still stochastic.
  const NETWORK={count:120, distance:180, speed:.3, opacity:.45, radius:{min:2.5,max:5}};
  // distance/radius: CSS pixels. speed: tsParticles movement units. opacity: edge
  // alpha. Links form/dissolve by proximity during continuous drift and pointer input.
  const seed=CONFIG.seed===null?Math.floor(Math.random()*2147483646)+1:CONFIG.seed;
  let visible=true, container, building=false, pending=false, timer=0;
  let pageAway=false, currentDark=document.body.classList.contains('dark');
  const motionAllowed=()=>!reduce.matches && fine.matches && !(connection && connection.saveData);
  function syncPlayback() {
    if (!container || container.destroyed) return;
    // Visibility pauses save work without resetting the graph. No elapsed-time
    // cutoff: movement resumes when the section/tab becomes visible again.
    const running=motionAllowed() && visible && !document.hidden && !pageAway;
    if (running) container.play();
    else if(container.animationStatus) container.pause();
    host.dataset.state=running?'running':motionAllowed()?'paused':'static';
  }
  function protectText() {
    // Read layout only on resize/content changes. These soft paper-colored layers
    // attenuate the library's output without modifying tsParticles internals.
    const base=section.getBoundingClientRect(), fragment=document.createDocumentFragment();
    section.querySelectorAll('.article-style, .portrait-title, .network-icon, .section-subheading, .ul-interests, .ul-edu').forEach(el=>{
      const r=el.getBoundingClientRect();if(!r.width || !r.height) return;
      const mask=document.createElement('div');mask.className='research-network-shield';
      Object.assign(mask.style,{left:(r.left-base.left)+'px',top:(r.top-base.top)+'px',width:r.width+'px',height:r.height+'px'});
      fragment.appendChild(mask);
    });
    shields.replaceChildren(fragment);
  }
  function options() {
    const p=NETWORK, mobile=section.clientWidth<600;
    const rgb=getComputedStyle(document.body).getPropertyValue('--research-graph').trim();
    const color='rgb('+(rgb||'45, 105, 91')+')';
    return {
      fullScreen:{enable:false}, autoPlay:false, fpsLimit:CONFIG.fps,
      // 1x CSS resolution avoids huge high-DPI buffers for a section-wide decoration.
      detectRetina:false, pauseOnBlur:false, pauseOnOutsideViewport:false,
      // The controller owns playback, including document and section visibility.
      resize:{enable:false},
      particles:{
        number:{value:0,density:{enable:false}}, // Explicit positions added after load.
        paint:{color:{value:color}}, shape:{type:'circle'},
        opacity:{value:{min:.38,max:.64}}, size:{value:p.radius},
        links:{enable:true,distance:mobile?Math.max(145,p.distance*.9):p.distance,color,opacity:mobile?Math.max(.2,p.opacity):p.opacity,width:.7},
        move:{enable:motionAllowed(),speed:p.speed,direction:'none',random:false,straight:false,
          outModes:{default:'bounce'}},
        collisions:{enable:false}
      },
      interactivity:{
        // Document-level detection lets links and text remain fully clickable.
        detectsOn:'window', events:{onHover:{enable:motionAllowed(),mode:['repulse']},onClick:{enable:false}},
        modes:{
          repulse:{distance:145,speed:.35,factor:12,maxSpeed:2,restore:{enable:true,delay:.15,speed:.06,follow:true}}
        }
      }
    };
  }
  function addNodes() {
    let value=seed;
    const random=()=>{value=value*16807%2147483647;return(value-1)/2147483646;};
    const mobile=section.clientWidth<600;
    const count=mobile?CONFIG.mobileCount:NETWORK.count;
    const size=container.canvas.size;
    for(let i=0;i<count;i++) {
      // Jittered grid keeps the distribution even without a particle soup.
      const columns=mobile?4:10,rows=Math.ceil(count/columns);
      const x=(i%columns+.15+random()*.7)/columns;
      const y=(Math.floor(i/columns)+.15+random()*.7)/rows;
      container.particles.addParticle({x:Math.max(.015,Math.min(.985,x))*size.width,y:Math.max(.015,Math.min(.985,y))*size.height});
    }
  }
  async function rebuild() {
    if(building){pending=true;return;}
    building=true;
    try {
      if(container) container.destroy();
      container=await tsParticles.load({id:host.id,options:options()});
      if(!container) return;
      addNodes();
      const canvas=container.canvas.domElement;
      canvas.setAttribute('aria-hidden','true');canvas.tabIndex=-1;
      host.dataset.preset='evolving';protectText();
      // One initial frame also renders static/reduced-motion previews.
      syncPlayback();
      if(!container.animationStatus) container.draw(true);
    } catch(error) {
      host.dataset.state='unavailable';
      console.warn('Network enhancement unavailable:',error);
    } finally {
      building=false;if(pending){pending=false;requestRebuild();}
    }
  }
  function requestRebuild() {clearTimeout(timer);timer=setTimeout(rebuild,100);}
  reduce.addEventListener('change',requestRebuild);fine.addEventListener('change',requestRebuild);
  if(connection) connection.addEventListener('change',requestRebuild);
  document.addEventListener('visibilitychange',syncPlayback);
  new MutationObserver(()=>{
    const dark=document.body.classList.contains('dark');
    if(dark!==currentDark){currentDark=dark;requestRebuild();}
  }).observe(document.body,{attributes:true,attributeFilter:['class']});
  if('IntersectionObserver' in window) new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;syncPlayback();}).observe(host);
  let lastWidth=section.clientWidth;
  if('ResizeObserver' in window) new ResizeObserver(async()=>{
    protectText();
    // Rebalance density when switching between phone/desktop widths.
    const width=section.clientWidth;
    if((width<600)!==(lastWidth<600)){lastWidth=width;requestRebuild();}
    // Own resize and redraw together: the library's delayed resize can otherwise
    // clear a static canvas after its only frame has already been painted.
    const current=container;
    if(current && !current.destroyed) {
      await current.canvas.windowResize();
      if(current===container && !current.destroyed && !current.animationStatus) current.draw(true);
    }
  }).observe(section);
  else window.addEventListener('resize',requestRebuild,{passive:true});
  if(document.fonts) document.fonts.ready.then(protectText);
  window.addEventListener('pagehide',()=>{pageAway=true;syncPlayback();});
  window.addEventListener('pageshow',()=>{pageAway=false;syncPlayback();});
  loadSlim(tsParticles).then(rebuild).catch(error=>console.warn('Network engine unavailable:',error));
})();
