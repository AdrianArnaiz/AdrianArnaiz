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
    'fa-x-twitter':'X (formerly Twitter)','fa-envelope':'Contact'};
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
  if (toggle) {
    toggle.setAttribute('aria-controls','navbar-content');
    const icon=toggle.querySelector('span');
    if (icon) icon.innerHTML='<span class="research-menu-icon" aria-hidden="true"><span></span></span>';
  }
  const themeControl=document.querySelector('.theme-dropdown > .nav-link');
  const themeLabel=themeControl && themeControl.getAttribute('aria-label');
  if (themeControl) {
    // A local SVG changes state without a framework or icon-morph dependency.
    themeControl.innerHTML='<svg class="research-theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true" focusable="false"><g class="research-theme-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4L19 5"/></g><g class="research-theme-moon"><path d="M20.8 14.1A9 9 0 0 1 9.9 3.2a9 9 0 1 0 10.9 10.9Z"/></g></svg>';
  }
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
    const copy=citation.querySelector('.js-copy-cite');
    const label=copy && copy.querySelector('[data-copy-label]');
    const status=citation.querySelector('[data-copy-status]');
    if (copy && label && status) {
      const originalLabel=label.textContent;
      let timer, generation=0;
      function resetCopy() {
        generation++; clearTimeout(timer); copy.disabled=false;
        copy.classList.remove('is-copied'); label.textContent=originalLabel;
        status.textContent=''; if (error) error.textContent='';
      }
      // Replace only the pinned theme's copy handler. Loading/downloading the
      // citation and Bootstrap's dialog behavior remain owned by the theme.
      if (window.jQuery) {
        window.jQuery(copy).off('click');
        window.jQuery(citation).on('show.bs.modal hidden.bs.modal',resetCopy);
      }
      copy.addEventListener('click',async event=>{
        event.preventDefault(); event.stopImmediatePropagation();
        const restoreFocus=document.activeElement===copy;
        const code=citation.querySelector('.modal-body code');
        const text=code && code.textContent;
        if (!text || !text.trim()) {
          if (error) error.textContent='Citation is not available yet. Please try again.';
          return;
        }
        const attempt=++generation; clearTimeout(timer); copy.disabled=true;
        if (error) error.textContent='';
        let copied=false;
        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text); copied=true;
          }
        } catch (_) { /* Legacy fallback also covers denied clipboard access. */ }
        if (attempt!==generation) return;
        if (!copied) {
          const selection=window.getSelection(), range=document.createRange();
          range.selectNodeContents(code); selection.removeAllRanges(); selection.addRange(range);
          try { copied=document.execCommand('copy'); } catch (_) { copied=false; }
          selection.removeAllRanges();
        }
        // Closing or opening another citation invalidates stale async feedback.
        if (attempt!==generation) return;
        copy.disabled=false;
        if (restoreFocus) copy.focus({preventScroll:true});
        if (copied) {
          copy.classList.add('is-copied'); label.textContent='Copied';
          status.textContent='Citation copied to clipboard.';
          timer=setTimeout(resetCopy,2200);
        } else if (error) error.textContent='Could not copy. Select the citation text and copy it manually.';
      },true);
      document.addEventListener('click',event=>{
        if (event.target.closest('.js-cite-modal')) {
          resetCopy();
          // Do not permit copying the previous record while the new one loads.
          const code=citation.querySelector('.modal-body code');
          if (code) code.textContent='';
        }
      },true);
    }
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
    if (themeControl) themeControl.setAttribute('aria-label',themeLabel+': '+(dark?'dark':'light')+' theme');
    document.documentElement.style.colorScheme=dark?'dark':'light';
    const meta=document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content=dark?'#172322':'#faf9f6';
  }
  themeSurface();
  new MutationObserver(themeSurface).observe(document.body,{attributes:true,attributeFilter:['class']});
})();
