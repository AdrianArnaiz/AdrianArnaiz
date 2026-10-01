/* Small accessibility bridges for the pinned 2021 theme. Core content is static. */
(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  function motionPreference() {
    // The legacy theme uses jQuery for anchor scrolling and modal effects.
    if (window.jQuery) window.jQuery.fx.off = reduce.matches;
  }
  motionPreference(); reduce.addEventListener('change',motionPreference);
  // Legacy author/share partials hide focusable icon links from assistive tech.
  const iconNames = {'ai-google-scholar':'Google Scholar','ai-orcid':'ORCID',
    'fa-github':'GitHub','fa-linkedin':'LinkedIn','fa-linkedin-in':'LinkedIn',
    'fa-twitter':'Twitter','fa-envelope':'Contact'};
  document.querySelectorAll('.network-icon, .share-box').forEach(group=>{
    group.removeAttribute('aria-hidden');
    group.querySelectorAll('a').forEach(link=>{
      const icon=link.querySelector('i');
      if (!icon) return;
      icon.setAttribute('aria-hidden','true');
      if (!link.hasAttribute('aria-label')) {
        const name=Object.keys(iconNames).find(key=>icon.classList.contains(key));
        if (name) link.setAttribute('aria-label',iconNames[name]);
      }
    });
  });
  const publicationSearch=document.querySelector('.filter-search');
  if (publicationSearch) publicationSearch.setAttribute('aria-label','Search publications');
  document.querySelectorAll('.pub-filters').forEach(select=>{
    select.setAttribute('aria-label', select.dataset.filterGroup==='year'?'Publication year':'Publication type');
  });
  const toggle=document.querySelector('.navbar-toggler');
  if (toggle) toggle.setAttribute('aria-controls','navbar-content');
  const nav=document.querySelector('#navbar-main');
  if (nav) nav.setAttribute('aria-label','Main navigation');
  // Restore the focus behavior expected by Bootstrap's existing citation dialog.
  const citation=document.querySelector('#modal');
  let citationTrigger, searchTrigger;
  document.addEventListener('click',event=>{
    const link=event.target.closest('a');
    if (!link) return;
    if (link.matches('.js-cite-modal')) citationTrigger=link;
    if (link.matches('#navbar-main .js-search')) searchTrigger=link;
  },true);
  if (citation) {
    citation.tabIndex=-1;
    const title=citation.querySelector('.modal-title');
    if (title) { title.id='citation-title'; citation.setAttribute('aria-labelledby',title.id); }
    const error=citation.querySelector('#modal-error');
    if (error) error.setAttribute('aria-live','polite');
    if (window.jQuery) window.jQuery(citation).on('hidden.bs.modal',()=>{
      if (citationTrigger) citationTrigger.focus({preventScroll:true});
    });
  }
  const search=document.querySelector('#search');
  let wasSearching=false;
  if (search) {
    search.setAttribute('role','dialog'); search.setAttribute('aria-modal','true');
    search.setAttribute('aria-label','Search');
    search.addEventListener('keydown',event=>{
      if (event.key!=='Tab') return;
      const controls=Array.from(search.querySelectorAll('a[href], input, button, [tabindex="0"]'))
        .filter(el=>el.getClientRects().length);
      const first=controls[0], last=controls[controls.length-1];
      if (event.shiftKey && document.activeElement===first) { event.preventDefault();last.focus(); }
      else if (!event.shiftKey && document.activeElement===last) { event.preventDefault();first.focus(); }
    });
  }
  function themeSurface() {
    const searching=document.body.classList.contains('searching');
    document.querySelectorAll('.page-header, .page-body, .page-footer').forEach(el=>{el.inert=searching;});
    if (wasSearching && !searching && searchTrigger) searchTrigger.focus({preventScroll:true});
    wasSearching=searching;
    const dark=document.body.classList.contains('dark');
    document.documentElement.style.colorScheme=dark?'dark':'light';
    const meta=document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content=dark?'#172322':'#faf9f6';
  }
  themeSurface();
  new MutationObserver(themeSurface).observe(document.body,{attributes:true,attributeFilter:['class']});
})();
