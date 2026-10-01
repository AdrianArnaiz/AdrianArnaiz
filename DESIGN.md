# Research website visual system

## Direction

An editorial academic site: warm paper, deep green ink, quiet rules, readable
Source Sans Pro body text, and Georgia headings. Dense research content stays
visible and stationary. The first-section network responds only to pointer interaction.
No scroll reveals, animated paragraphs, gradient decoration, or nested cards.

The original biography, publication records, author resolution, citations,
permalinks, taxonomy filters, search, and theme selector remain in place.
Tutorials become responsive editorial entries. Publication rows separate year,
title, authors, venue, and native Academic actions. Page sections use whitespace
and fine rules instead of alternating gray panels.

## Architecture and extension points

- Legacy Hugo Academic/Wowchemy module: `v0.0.0-20210106233222-68b9925c9351`.
- Netlify: Hugo Extended 0.79.1; local installed Hugo: 0.95.0 Extended.
- Bootstrap and Hugo Pipes/Sass, with theme-provided jQuery and search libraries.
- No npm, Tailwind, PostCSS, React, or new site runtime library is introduced.
- The pinned theme imports `assets/scss/custom.scss` at the end of its stylesheet.
- Its real hooks are `layouts/partials/custom_head.html` and `custom_js.html`;
  modern HugoBlox hook-directory examples do not apply here.
- JS is minified and SHA-256 fingerprinted by Hugo. The graph script loads only
  on the homepage. Interface accessibility bridges load site-wide.
- The theme still owns dark-mode persistence and its `body.dark` class.

Local overrides of `about.html`, `li_citation.html`, and `_default/baseof.html`
are based on this pinned module. The base template adds a skip link and main
landmark; book/docs layouts retain their own main landmark. No module cache or
vendor file is edited. Compare these small overrides against upstream if an
upgrade is intentionally undertaken later.

## Graph decision

The network spans the entire first homepage section: portrait, name, biography,
interests, and education. It is positioned behind the section's content and never
intercepts input. Later homepage sections and interior pages have no graph.

An initial portrait-only version had almost imperceptible ambient movement and a
pause button. Following author feedback, the graph now stays still at rest;
there is no ambient loop or pause control. Pointer interaction displaces nearby
nodes by up to 24 CSS pixels over a 190-pixel radius, with smooth settling and a
small increase in local edge visibility. Moving away returns nodes to rest.

There are 84 seeded nodes in twelve loose communities, with nearest-neighbor
links and bridges between adjacent communities. Topology is computed once.
Content rectangles are measured on resize, then cached attenuation factors make
lines and nodes fainter behind biography, interests, education, and profile text.
Expanding the biography updates the canvas size and these quiet regions.
No layout is measured inside the drawing loop.

Rendering is event-driven, capped at 30 FPS during settling, and completely idle
after settling. The backing buffer caps both DPR at 1.5 and total pixels at two
million, including tall mobile/expanded sections. Reduced-motion, touch/coarse
pointer, and data-saving modes get a static graph. Hidden/offscreen pages stop
interaction. Theme changes repaint the same topology in the matching palette.
The canvas is decorative, aria-hidden, and pointer-events:none; page pointer
listeners are passive. Core content needs no graph JavaScript.

To disable it site-wide, set `[research_design] network = false` in
`config/_default/params.toml`. For tuning, use `CONFIG` and `communities` in
`assets/js/network-background.js`.

## Technology choices

| Technology | Used? | Reason |
| --- | --- | --- |
| tsParticles | No | Its slim/custom packages can link particles and handle interaction, but this fixed 84-node topology needs only a small renderer. |
| Custom Canvas | Yes | Exact topology, bounded movement, event-driven rendering, no dependency. |
| CSS / WAAPI | CSS only | Fast, interruptible navigation underline and social-link feedback. No programmatic sequence needs WAAPI. |
| Motion | No | Vanilla animation APIs are useful, but no selected interaction needs its runtime. |
| Anime.js | No | No coordinated SVG/path timeline. |
| GSAP | No | No pinned scenes, scroll choreography, or advanced timeline. |
| Morphicons | No | Existing accessible theme/menu controls do not need icon-morph infrastructure. |
| Haikei | No | Generic exported geometry would duplicate the specific network motif. |
| Spline | No | 3D adds no research communication value here. |
| shadcn concepts | Principles only | Borrow restrained spacing, clear states, tokens, and semantic controls; no React components. |

Consulted references (agent guidance, not website dependencies):
[Impeccable](https://github.com/pbakaus/impeccable),
[Emil Kowalski's skills](https://github.com/emilkowalski/skills), and
[Vercel Web Interface Guidelines](https://vercel.com/design/guidelines).
The installed skill catalog had no frontend-design package. The published
Impeccable guidance was consulted without installing its CLI or hooks.

Primary technology references:
[tsParticles](https://particles.js.org/), [Motion vanilla](https://motion.dev/docs/animate),
[Anime.js](https://animejs.com/documentation/), [GSAP](https://gsap.com/),
[Morphicons](https://www.morphicons.com/), [Haikei](https://haikei.app/),
[Spline](https://spline.design/), [shadcn/ui](https://ui.shadcn.com/).

## Typography and assets

The existing Source Sans Pro typeface is now self-hosted as WOFF2, with regular,
bold, and matching italics. Latin/Latin Extended subsets are loaded only as
needed; other scripts retain system fallback. The two primary Latin weights
are preloaded; `font-display: optional` prevents a late font swap on slow links.
Georgia and the code font (Consolas with monospace fallback) need no download.
Font licenses and source provenance ship alongside the unchanged font files.
Existing ICML and LoG tutorial logos are served locally with reserved dimensions.

Keep palette values in `data/themes/mydark.toml` aligned with the CSS variables
in `assets/scss/custom.scss`; the legacy theme uses some `!important` menu rules
which require correct native theme values.

## Motion and interface audit

| Before | After | Reason |
| --- | --- | --- |
| Inline glow and `transition: all` on biography actions | Shared native link styles, immediate focus and bounded press feedback | Clear state without a decorative halo or uncontrolled transitions. |
| Almost invisible ambient drift and pause button | Section-wide, pointer-driven topology, idle at rest | Clear interaction without ongoing decorative movement. |
| Generic motion on dense content | No entry/reveal animation | Visitors can read and follow links immediately. |
| Theme jQuery motion ignores user preference | Reduced motion disables jQuery effects plus CSS motion | Covers existing scrolling behavior as well as the new enhancement. |
| Hidden-from-AT social list | Named, keyboard-accessible links and decorative icons | Academic profiles are available to assistive technology. |
| No skip link or main landmark | Static skip link and appropriate landmark | Keyboard access does not rely on the decorative script. |

The interface bridge also labels publication filters and legacy sharing links,
restores citation-dialog Escape/focus behavior through Bootstrap, and keeps
keyboard focus inside search while it is open. Underlying search, citation,
filtering, and menu implementations remain the theme's own.

## Initial visual-system verification (2026-10-01)

The graph-specific payload and timing figures below describe the initial portrait
implementation; the section-wide revision is verified separately below.

- Production builds passed with both the installed Hugo Extended 0.95.0 and
  Netlify-pinned Extended 0.79.1. The latter generated 221 pages and 72 aliases.
  The newer executable reports existing legacy-template deprecations.
- Headless Microsoft Edge views checked at 1440, 1024, 768, 390, and 320 CSS
  pixels; desktop/mobile checked in light and dark mode. Inspected hero,
  tutorials, publications, talks, contact/footer, search, citation modal,
  publication archive, article thumbnail/inline SVG, and a project page.
  No horizontal overflow occurred at these widths.
- axe-core WCAG 2 A/AA and 2.1 AA checks reported zero violations across the
  seven homepage configurations and tested publication article/archive.
  This is an automated audit of these surfaces, not a site-wide certification.
- Verified keyboard skip link, mobile menu expansion, search results and focus,
  citation content/Escape/focus restoration, publication year/text filtering,
  theme switching, and content availability with JavaScript disabled.
- Verified pointer response, persisted pause/resume, static reduced-motion and
  touch rendering, offscreen pause/resume, and the visibility-change event path.
- Cumulative layout shift after localizing fonts was below 0.00004 on tested
  desktop/laptop views and zero on tablet/mobile. Earlier remote-font swaps
  caused visible shifts; reserved dimensions, local preloads, and optional font
  display removed them in these runs.
- The pinned production build adds 8,761 bytes of minified JavaScript:
  network 5,367 bytes (2,254 gzip) on the homepage and interface 3,394 bytes
  (1,308 gzip) site-wide. Combined compressed homepage addition: 3,562 bytes.
  Eight local font subsets total 147,704 bytes on disk; only needed subsets load.
- A three-second Chrome DevTools Protocol sample at device pixel ratio 3
  recorded 60 graph draws, 44.17 ms of total browser task time, and zero layout
  time. Offscreen: zero draws, 2.05 ms total task time. Canvas buffer was capped
  at 607 by 477 pixels for a 405 by 318 CSS-pixel region.
  These are local headless measurements, not a physical-device battery benchmark
  or a Lighthouse score. Two initial-load long tasks (116/82 ms) remain in the
  overall page; the existing theme still carries its original JS dependencies.

Playwright and axe were installed only in a temporary audit directory; no npm
manifest, test dependency, or generated browser artifact was added to the site.

## Section-wide graph revision verification (2026-10-01)

- Exact pinned Hugo Extended 0.79.1 production build passed.
- Inspected 1440-pixel desktop light/dark, 1024-pixel laptop, and 390-pixel mobile
  light/dark. The canvas bounds matched the full section in all five cases,
  including after expanding the biography. No horizontal overflow or page JS
  errors; axe WCAG 2 A/AA and 2.1 AA found zero violations on these views.
- Instrumented Canvas drawing: zero redraws at rest and after pointer settling;
  measured nearby-node displacement of 21.8-21.9 CSS pixels. Reduced-motion mode
  remained static when the pointer moved. All backing buffers stayed under the
  two-million-pixel cap at simulated DPR 2.
- Hidden-document and offscreen interaction checks passed. The revised graph
  script is 6,221 bytes minified / 2,571 bytes gzip; combined new homepage JS
  (graph plus interface) is 3,879 bytes gzip.
- Removed the pause button and its storage handling because there is no ongoing
  ambient animation. Previous stored pause values no longer affect the graph.

## Potential modern integrations

These are optional next steps, not new dependencies in this revision. Integration
assessments are based on the libraries' published browser APIs; each actual
addition should be tested against the pinned Hugo build and selected browsers.
No template migration is necessary for these browser-side enhancements.

| Technology | Useful application | Compatibility work in this repository |
| --- | --- | --- |
| [Motion](https://motion.dev/docs/quick-start) | A user-triggered graph message-passing explanation, or coordinated state transitions | Load a pinned vanilla browser build through custom_js.html only where used. Use one motion owner per element; retain Bootstrap control behavior and reduced-motion handling. |
| [Anime.js](https://animejs.com/documentation/getting-started/installation/) | SVG edge drawing or a step-by-step GNN diagram | A pinned ESM or UMD build can accompany a Hugo shortcode. Prefer this instead of Motion when SVG timelines are the main requirement. |
| [tsParticles](https://particles.js.org/) | More configurable graph interaction or changing particle behaviors | Replace the Canvas renderer, preserving section bounds, text attenuation, input rules, and lifecycle controls. Benchmark a selected bundle; avoid shipping both renderers. |
| [Morphicons](https://www.morphicons.com/) | Menu/close or theme-icon state transitions | Use its plain-JS core with local SVG path data, replacing selected Font Awesome icons. Synchronize with Bootstrap/theme events and keep labels and immediate reduced-motion states. |
| [GSAP](https://gsap.com/docs/v3/Installation/) | An advanced research explainer with coordinated timelines | Load on that page through a conditional hook; retain normal scrolling and provide static content. Ordinary site navigation does not warrant it. |
| [Spline Viewer](https://docs.spline.design/exporting-your-scene/web/exporting-as-spline-viewer) | One meaningful interactive 3D research object | A Hugo shortcode can emit the native web component with reserved dimensions, a static poster, and controlled loading. Measure GPU/load costs before adoption. |

For modern vendor JS, prefer a pinned, already-built browser distribution and
fingerprinting. Avoid passing new syntax through Hugo 0.79.1's legacy minifier
without testing it. A browser module can also be loaded with type=module through
the existing hook. Self-host the complete dependency graph when choosing ESM;
copying only an entry file with bare imports is not sufficient. A dedicated
prebuild/bundler is optional if future requirements justify it, not required for
these enhancements. Never load CDN @latest URLs in production.

Static Haikei SVG exports would require only a local asset; shadcn spacing/state
principles remain compatible as native CSS. Its React component runtime would
add an unnecessary second UI system here.

## Later opportunities

A separate content pass could shorten the introductory prose or select fewer
featured papers, but this work intentionally preserves the author's wording and
selection. Search/math/icon CDN assets and old tweet embeds remain upstream
performance dependencies. A future targeted audit could localize or conditionally
load those assets without coupling that effort to a theme migration.
