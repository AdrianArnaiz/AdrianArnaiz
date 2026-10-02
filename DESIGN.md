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

## Talk listings

Selected Talks keeps the native featured-widget query, filters, ordering, and
count. `layouts/partials/li_list.html` dispatches event records to the shared
`research/talk-row.html` partial; other types retain the pinned theme's original
list markup. The homepage has all 11 currently featured talks, with dates,
subjects, venues/locations, and direct resources. No summaries are shown there.

`layouts/section/event.html` groups each archive page by event year, newest first,
and uses the same rows with short summaries. Existing pagination remains at
10 entries, preserving `/event/`, `/event/page/2/`, and `/event/page/3/`. There
are 29 current records across those pages. Year groups may continue on the next
page. Detail templates and `/talk/:slug/` URLs are unchanged.

Display titles remove the leading bracketed venue and terminal `(Sp)` marker.
The venue comes from that prefix, with event_short/event as fallbacks; `(Sp)`
is shown as plain ?In Spanish? metadata. Original titles and content remain
intact. Optional list_title/list_venue/list_summary fields can override only
listing copy when a record needs a clearer label. Do not infer talk categories.

Available Video, Slides, Paper, Code, Poster, and Data links resolve page-bundle
resources or configured URLs. Markdown slides are supported. General Follow
and organisation links remain on the native detail page. Links have descriptive
accessible names, visible focus, and 44px minimum heights. There is no added JS,
animation, imagery, or runtime dependency. Mobile rows stack naturally; long
titles wrap. Colors use the existing light/dark tokens.

Validation (2026-10-01): normal and buildFuture production builds passed with
Hugo Extended 0.79.1. Checked both views at 1440, 1024, 768, 390, and 320 CSS px
in both themes; no overflow, page JS errors, or axe WCAG 2 A/AA and 2.1 AA
violations on these surfaces. Verified all 29 unique archive links, chronological
ordering, preserved detail-page titles, pagination navigation, keyboard focus,
and homepage/archive content without JavaScript. These automated accessibility
checks are scoped to these views, not a site-wide certification.

## Homepage interface polish

The homepage keeps its editorial layout and existing content. Publication and
Talk section headings become sticky only at desktop widths of at least 992px
and viewport heights of at least 600px. They remain bounded by their section
row; small screens and short viewports use normal flow. Tutorial titles now
share the ink-colored title hierarchy used by publications and talks.

The "See complete list..." links sit directly beneath each section's subtitle,
inside the native section-heading column. They are authored in the widgets'
subtitle fields and remain visible with the sticky desktop heading. Mobile
keeps them beneath the subtitle before the first record. The link wording,
archive URLs, featured queries, and archive pagination are unchanged.

Heading-link validation (2026-10-02): normal and buildFuture builds passed with
Hugo Extended 0.79.1. Checked both themes at 1440, 1024, 768, 390, and 320px;
links remain visible in desktop sticky headings and follow subtitles on mobile.
No horizontal overflow, page JS errors, or axe WCAG 2 A/AA and 2.1 AA violations
were found on these homepage views. Verified one link per section, 44px minimum
link height, keyboard focus, unchanged featured-talk count, archive destinations,
and navigation without JavaScript. Temporary preview stopped after verification.

The biography's native disclosure has a thin rotating chevron. Only the
indicator moves; the long biography opens immediately and stays stationary.
The mobile hamburger changes to a close symbol using CSS driven by Bootstrap's
aria-expanded state. A local sun/moon SVG reflects the theme's actual body.dark
state, with an accessible label naming the currently rendered theme. Indicator
transitions are 160ms, interruptible, and covered by reduced-motion rules.

The pinned citation partial is overridden locally to use a native copy button,
keyboard-scrollable BibTeX text, and a polite status announcement. The site-owned
interface bridge replaces the legacy copy handler: it uses the Clipboard API
with an execCommand fallback, confirms only actual success, restores button
focus, and exposes a manual-copy error if both methods fail. Feedback resets
after 2.2 seconds or on dialog changes; a generation guard discards stale async
results. Loading, downloading, and modal behavior remain owned by the theme.

No animation library, new build step, scroll reveal, or body-text animation was
added. The evolving network controller and author-tuned settings are unchanged.

Validation (2026-10-01): normal and buildFuture production builds passed with
Hugo Extended 0.79.1 (221 pages, 72 aliases). Reviewed desktop/mobile light/dark
renders of the hero, tutorials, publications, talks, menu, and citation feedback.
Responsive checks at 1440, 1024, 768, 390, and 320 CSS px found no horizontal
overflow, page JS errors, or axe WCAG 2 A/AA and 2.1 AA violations. Additional
citation-dialog checks in both themes at 1440 and 390 found zero violations.
Verified copying actual BibTeX, failure/manual-copy feedback, reset on reopening,
keyboard focus, Escape/focus restoration, disclosure without JS, theme changes,
reduced-motion transitions, and normal heading flow in a 540px-high viewport.
Automated accessibility checks are scoped to these views, not a certification.

The interface bridge is 6,245 bytes minified / 2,311 bytes gzip in the pinned
production build. There are no new runtime dependencies or animation loops.
These local payload figures may vary with gzip implementation/settings. Audit
scripts/screenshots remain outside the repository. The temporary preview was
stopped after verification.

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

## Design tools reference

The complete tool catalog, current adoption status, future integration notes,
and grounded homepage opportunities live in [DESIGN_TOOLS.md](DESIGN_TOOLS.md).
Maintain tool inventories there. This document records the implemented visual
system and its verification.

## Font Awesome and X icons

Font Awesome Free **7.3.1** replaces the module's 5.14.0 stylesheet through
`data/assets.toml`. Hugo 0.79.1 replaces the complete data file, so this override
copies the pinned module's asset manifest and changes only Font Awesome,
preserving every other version and integrity value. The CDN URL stays versioned
and the SHA-512 integrity was independently computed from the CSS and
matched against cdnjs metadata. No Hugo/Wowchemy upgrade or module-cache edit is
needed. Upgrade reference: https://docs.fontawesome.com/upgrade/upgrade-from-older-versions

Native `fab`, `fas`, and `far` classes and legacy icon-name aliases remain
supported by the new stylesheet. Profile, contact, article-sharing, and talk
resource metadata use `x-twitter` with `icon_pack: fab`. Existing account URLs
and Twitter/Open Graph metadata remain intact. The homepage and interface bridge
retain the accessible "X (formerly Twitter)" label. The local X SVG mask and its
unused asset have been removed; the font glyph inherits the link color and
renders without JavaScript.

The pinned theme hardcodes `Font Awesome 5 Free` in search, article callouts,
and card hover pseudo-elements. Site-owned Sass switches those selectors to
`Font Awesome 7 Free`, preserving their codepoints and weight. No extra shim
stylesheet, icon JavaScript, or animation dependency is added. Existing talk
resource entries used the unavailable Free icon `browser`; these now use the
Free `globe` glyph, retaining their labels and resource URLs.

Validation (2026-10-02): normal and buildFuture production builds passed with
Hugo Extended 0.79.1 (221 pages, 72 aliases). All 137 generated HTML pages with
theme assets in each build have exactly one Font Awesome 7.3.1 stylesheet with
SRI; none references the retired Twitter/browser glyphs or SVG mask. Every
non-Font-Awesome asset entry matches the pinned module manifest exactly.

Reviewed the homepage/contact, publication archive/article, published blog
callout, project archive, and talk-resource icons at 1440px and 390px in both
themes. No horizontal overflow or page JS errors appeared in the five-page
responsive audit; publication-article axe WCAG 2 A/AA and 2.1 AA checks found no
violations. Verified all 26 distinct Font Awesome icon classes against the actual
solid/brands font codepoint maps, CSS integrity, search, callouts, and X rendering
and its homepage label without JS. Unused card-hover, aside, and warning
pseudo-element selectors were checked with temporary browser fixtures and their
codepoints exist in the solid font. These checks are scoped to these surfaces.
Temporary audit scripts/screenshots stay outside the repository.

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
| Fixed custom topology | Evolving tsParticles links and pointer response | Author-requested exploration of changing connections and interactions. |
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

## Later opportunities

A separate content pass could shorten the introductory prose or select fewer
featured papers, but this work intentionally preserves the author's wording and
selection. Search/math/icon CDN assets and old tweet embeds remain upstream
performance dependencies. A future targeted audit could localize or conditionally
load those assets without coupling that effort to a theme migration.
