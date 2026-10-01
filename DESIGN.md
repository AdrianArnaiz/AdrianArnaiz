# Research website visual system

## Direction

An editorial academic site: warm paper, deep green ink, quiet rules, readable
Source Sans Pro body text, and Georgia headings. Dense research content stays
visible and stationary. The first-section network uses tsParticles with continuous drift and cursor interaction.
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
- No npm build step, Tailwind, PostCSS, or React is introduced. tsParticles 4.4.0
  is a pinned, self-hosted browser dependency loaded only on the homepage.
- The pinned theme imports `assets/scss/custom.scss` at the end of its stylesheet.
- Its real hooks are `layouts/partials/custom_head.html` and `custom_js.html`;
  modern HugoBlox hook-directory examples do not apply here.
- Site JS is minified and SHA-256 fingerprinted by Hugo. The prebuilt vendor
  bundle is fingerprinted without re-minification. The graph script loads only
  on the homepage. Interface accessibility bridges load site-wide.
- The theme still owns dark-mode persistence and its `body.dark` class.

Local overrides of `about.html`, `li_citation.html`, and `_default/baseof.html`
are based on this pinned module. The base template adds a skip link and main
landmark; book/docs layouts retain their own main landmark. No module cache or
vendor file is edited. Compare these small overrides against upstream if an
upgrade is intentionally undertaken later.

## Portrait treatment

The homepage portrait uses a tighter top-anchored crop, softly rounded square
corners (10px), a 4px paper-colored rim, and a fine theme-aware outline. The
portrait stays still; the surrounding network supplies motion. No portrait
animation or new runtime dependency is added.

The original avatar file is untouched. The about-widget override creates the
homepage admin crop with two Hugo Fill operations, compatible with 0.79.1, and
provides 270px/540px responsive sources for high-density displays. Other author
portraits retain their original crop. The existing avatar.shape setting remains
supported: circle selects a circular border; square uses the soft corners.

Verified the pinned production build and desktop/mobile light/dark views at
DPR 2. The browser selected the 540px source; no overflow or page JS errors were
observed. A circular alternative was also rendered for comparison.

## Graph decision

The network spans the entire first homepage section: portrait, name, biography,
interests, and education. It is positioned behind the section's content and never
intercepts input. Later homepage sections and interior pages have no graph.

The author requested a tsParticles exploration after the initial custom Canvas
versions. The active renderer is the official **tsParticles 4.4.0 slim bundle**.
It supplies node movement, proximity links, repulsion, grab, and local-connect
interactions. The old hand-written renderer is no longer shipped.

The selected **Evolving** network has 100 desktop nodes and 42 phone nodes.
Distance-based links form and dissolve as nearby nodes change position. Nodes
have a radius of 2.5-4.5 CSS pixels; movement speed is 0.3. The initial arrangement is random per visit.
The preset selector, Pause, and New layout controls were removed at the author's
request; old saved preset/pause preferences are no longer read.

Desktop drift continues while the section and document are visible, with
pointer repulsion and continuously updated proximity links. The author requested
removal of the introductory cutoff while retaining no visible controls.
Reduced-motion, touch, and data-saving users receive a static graph. Hidden
documents and offscreen sections pause, then resume without resetting positions.
There is no in-page pause control; reduced motion remains an OS/browser setting.

Soft paper-colored layers behind profile text, biography, interests, and
education protect readability. They follow content sizing, including biography
expansion. Colors follow --research-graph and --research-paper in both themes.
The decorative container is aria-hidden and pointer-events:none.

Rendering is capped at 30 FPS and uses 1x CSS-pixel resolution. Hidden
documents and offscreen sections stop drawing. Static previews render
once. Rebuilds are serialized to avoid accumulating canvases during theme/layout
changes. Content and navigation remain available if the library fails to load.

### Personalization

- `assets/js/network-background.js`: NETWORK contains count, link distance,
  drift speed, edge opacity, and node radius. CONFIG contains FPS, mobile count,
  and an optional initial-position seed. There is no motion-duration timer.
- `addNodes()` sets distributed starting positions; tsParticles computes
  subsequent proximity connections. This is decoration, not research data.
- `options()` sets repulsion strength/range and mobile link visibility. Version 4
  uses `paint.color`, rather than the old `particles.color` field.
- `protectText()` selects protected content; `.research-network-shield` in
  custom.scss controls attenuation opacity and softness.
- Set `research_design.network = false` in `config/_default/params.toml` to
  omit the graph and its scripts. There is no visitor-facing preset setting.

### Previous timed-introduction verification (2026-10-01)

- Hugo Extended 0.79.1 production build passed (221 pages, 72 aliases).
- Desktop/mobile light and dark views checked in headless Edge. Nodes measured
  within the configured 1.5-2.3 px radius; no selector or action controls remain.
- Verified automatic settling, pointer displacement and subsequent stopping,
  reduced-motion behavior, and that old saved preferences cannot select a
  removed preset. No horizontal overflow or page JavaScript errors.
- axe WCAG 2 A/AA and 2.1 AA checks returned zero violations on those views.
  This is a bounded automated check, not a full accessibility certification.
- Resize and static redraw now share one observer. Visibility updates only pause
  an active animation, so they cannot cancel a pending static frame.
- Measurements in the initial exploration section below describe that earlier
  three-preset implementation, not the simplified controller.

### Vendor maintenance

The unmodified `assets/vendor/tsparticles/4.4.0/tsparticles.slim.bundle.min.js`
contains both slim features and its engine. Load this self-contained file alone.
Loading the separate engine as well caused duplicate range-class identities in
4.4.0 and prevented spatial queries from generating links; this was reproduced
and resolved during integration. Do not alter library files to work around it.

The npm tarball was checked against its published SHA-512 integrity. The vendor
folder includes the MIT license and PROVENANCE.json with source and SHA-256.
Hugo fingerprints the bundle but does not run its old minifier over modern vendor
syntax. Updating it is an explicit dependency change: verify the new distribution,
update versioned paths/provenance, then test links, interactions, pause, theme,
resize, and reduced motion. The current library requires OffscreenCanvas; older
unsupported browsers retain the complete site without this decoration.

## Technology choices

| Technology | Used? | Reason |
| --- | --- | --- |
| tsParticles | Yes | Pinned self-contained slim 4.4.0 bundle for evolving links and pointer repulsion. |
| Custom Canvas renderer | Replaced | The engine now owns drawing, motion, and links; site code owns configuration and lifecycle. |
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
| Fixed custom topology | Evolving tsParticles presets with explicit pause | Author-requested exploration of changing connections and interactions. |
| Generic motion on dense content | No entry/reveal animation | Visitors can read and follow links immediately. |
| Theme jQuery motion ignores user preference | Reduced motion disables jQuery effects plus CSS motion | Covers existing scrolling behavior as well as the new enhancement. |
| Hidden-from-AT social list | Named, keyboard-accessible links and decorative icons | Academic profiles are available to assistive technology. |
| No skip link or main landmark | Static skip link and appropriate landmark | Keyboard access does not rely on the decorative script. |

The interface bridge also labels publication filters and legacy sharing links,
restores citation-dialog Escape/focus behavior through Bootstrap, and keeps
keyboard focus inside search while it is open. Underlying search, citation,
filtering, and menu implementations remain the theme's own.

## Initial tsParticles exploration verification (2026-10-01)

- Pinned Hugo Extended 0.79.1 production build passed: 221 pages, 72 aliases.
- All three presets were exercised across desktop light/dark (1440), laptop
  (1024), mobile light/dark (390), and small mobile (320): 18 combinations.
  Canvas/node counts remained stable with one engine container; no horizontal
  overflow, page JS errors, or WCAG 2 A/AA and 2.1 AA axe violations were found.
- Verified changing edge identities over three seconds, visible repulsion and
  local connect/grab effects, pause persistence, New layout while paused,
  reduced-motion static rendering, hidden/offscreen pause/resume, expanded
  biography sizing, rapid preset changes, keyboard controls, and theme changes.
- Mobile link distances/opacity were subsequently adjusted for readable static
  previews and all three phone presets rechecked in both themes. Phone count is
  42; paused/static states perform no ongoing drawing.
- Decoration/script failure and JavaScript-disabled checks retained visible
  biography/links and hid the controls. Publication pages loaded no graph bundle.
- Layout shift on the tested pages was 0 on mobile and desktop light, below
  0.00004 on laptop/desktop dark. These are local measurements, not field data.
- Actual pinned-build gzip sizes measured with Node/zlib: vendor 44,601 bytes,
  controller 2,874 bytes; graph total **47,475 bytes gzip** (166,186 raw/minified
  bytes). The earlier custom renderer was 2,571 bytes gzip. Different gzip
  implementations/levels may produce slightly different byte counts.
- In headless Edge, two-second samples at DPR 3 recorded 45-46 draws per preset
  (about 22-23 FPS), 84-96 ms of total browser task time, and zero layout time.
  Pausing yielded zero draws. Backing canvas: 1440 by 909 pixels at 1x resolution.
  This confirms local behavior; it is not a physical-device battery benchmark.

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

## Previous custom-Canvas revision verification (2026-10-01)

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

Except for tsParticles, these remain optional future work. Integration
assessments are based on the libraries' published browser APIs; each actual
addition should be tested against the pinned Hugo build and selected browsers.
No template migration is necessary for these browser-side enhancements.

| Technology | Useful application | Compatibility work in this repository |
| --- | --- | --- |
| [Motion](https://motion.dev/docs/quick-start) | A user-triggered graph message-passing explanation, or coordinated state transitions | Load a pinned vanilla browser build through custom_js.html only where used. Use one motion owner per element; retain Bootstrap control behavior and reduced-motion handling. |
| [Anime.js](https://animejs.com/documentation/getting-started/installation/) | SVG edge drawing or a step-by-step GNN diagram | A pinned ESM or UMD build can accompany a Hugo shortcode. Prefer this instead of Motion when SVG timelines are the main requirement. |
| [tsParticles](https://particles.js.org/) | Implemented: evolving network with pointer response | Uses the existing hook and self-contained slim bundle; the custom renderer is replaced. |
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
