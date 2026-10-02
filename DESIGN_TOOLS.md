# Design tools and references

This is the single catalog of design tools for this repository. Keep tool
inventories and future integration assessments here; [DESIGN.md](DESIGN.md)
documents the implemented visual system, extension points, and verification.
[AGENTS.md](AGENTS.md) contains editing and validation instructions.

All entries previously listed in those documents are retained below. Listing a
tool is not an instruction to install it. Status describes this website, not a
claim that a candidate has already been tested against its pinned Hugo version.

## Website rendering and interaction

| Tool / approach | Current status | Useful application and Hugo/Wowchemy fit |
| --- | --- | --- |
| [tsParticles](https://particles.js.org/) | Used: pinned 4.4.0 slim bundle | Excellent vanilla-browser fit. The first homepage section uses evolving proximity links, continuous desktop drift, and local pointer response. The site-owned controller handles static reduced-motion/touch behavior and visibility. Keep the existing self-contained, self-hosted bundle and supported JS hook. |
| Custom Canvas | Previous implementation; retained alternative | Excellent native fit and potentially smaller payload for a narrowly defined graph aesthetic. The custom renderer was replaced during the author's tsParticles exploration; it is no longer shipped. Reconsider only if a specific visualization warrants owning its rendering and interactions. |
| CSS / WAAPI | CSS used; WAAPI available natively | First choice for focus, hover, press, disclosure, and simple SVG state changes. No library or build step is needed. Prefer transform/opacity; WAAPI can add interruptible, user-triggered coordination where CSS is insufficient. |
| [Motion / motion.dev](https://motion.dev/docs/animate) | Candidate; no runtime dependency | Excellent vanilla-JS fit for a purposeful graph message-passing explainer or coordinated state changes. Evaluate the mini/native API first and the broader API only for necessary SVG/timeline capabilities. Load a pinned browser distribution through custom_js.html only where used; preserve Bootstrap behavior and use one animation owner per element. |
| [Anime.js](https://animejs.com/documentation/) | Candidate; no runtime dependency | Very good alternative for SVG edge drawing, path animation, and step-by-step GNN timelines. Its modular vanilla APIs and WAAPI option merit evaluation for that use. A pinned browser/ESM build can accompany a Hugo shortcode. Choose it instead of Motion when its SVG/timeline features materially help. |
| [GSAP](https://gsap.com/docs/v3/Installation/) | Candidate; ordinary homepage motion does not justify it | Framework-agnostic and technically compatible. Reserve for a substantive research explainer needing complex timelines, MotionPath, MorphSVG, or ScrollTrigger. Load conditionally on that page, retain normal scrolling, and supply static content. No pinned storytelling or scroll choreography is currently needed. |
| [Morphicons](https://www.morphicons.com/) | Candidate; native CSS/SVG first | Consider selected hamburger/close, sun/moon, or copy/check transitions. Verify the selected package's plain-JS integration rather than introducing framework wrappers. Synchronize local SVG states with actual Bootstrap/theme events; retain accessible labels and immediate reduced-motion states. It has no role in the network background. |
| [Haikei](https://haikei.app/) | Static-asset candidate | Excellent fit for locally exported SVG geometry, graph-like/grid motifs, low-poly patterns, or quiet section transitions with no animation runtime. Generic blobs and waves would dilute the current scientific-network identity; purpose-built SVG may suit tutorial diagrams better. |
| [Spline / Spline Viewer](https://docs.spline.design/exporting-your-scene/web/exporting-as-spline-viewer) | Candidate; no demonstrated homepage need | Compatible as a native web component emitted by a Hugo shortcode. Consider one meaningful interactive 3D research object only if 3D improves the explanation. Reserve dimensions, provide a static poster, control loading, and measure GPU/load costs. A decorative 3D hero does not currently add research value. |
| [shadcn/ui concepts](https://ui.shadcn.com/) | Principles only | Borrow proportions, spacing, tokens, accessible states, and component restraint in native Hugo/CSS. Its React-oriented component runtime would introduce a second UI system; do not install it wholesale or migrate the site to use it. |

## Agent-side design and audit guidance

These are aids for authoring and review, not website runtime dependencies. Check
available skills before using them; a reference here does not mean it is installed.
The initial visual-system work consulted published Impeccable, Emil Kowalski, and
Vercel guidance without installing Impeccable's CLI or hooks. The installed skill
catalog at that time had no frontend-design package.

| Tool / reference | Purpose in this repository |
| --- | --- |
| [Impeccable](https://github.com/pbakaus/impeccable) | Design critique, art direction, hierarchy, responsive polish, accessibility, and detecting generic template/AI design patterns. Supports agent workflows including Codex. Apply judgment: academic content and repository requirements take priority. |
| [Emil Kowalski skills](https://github.com/emilkowalski/skills) | Motion and design-engineering review. Previously identified skills: emil-design-eng, animate, find-animation-opportunities, review-animations, improve-animations, and animation-vocabulary. Animate only when motion communicates state, continuity, focus, causality, or occasional restrained delight. |
| [Vercel Web Interface Guidelines](https://vercel.com/design/guidelines) ([agent repository](https://github.com/vercel-labs/web-interface-guidelines)) | Final keyboard, focus, semantic-control, contrast, touch, reduced-motion, and interface audit. Apply the guidelines to the existing legacy controls rather than replacing their underlying functionality. |
| [frontend-design skill](https://github.com/PaulRBerg/agent-skills/blob/main/skills/frontend-design/SKILL.md) | Art direction, a coherent visual system, responsive implementation, and rendered verification. Preserve this originally listed skill reference; locate and read the applicable package before invocation. |

## Additional inspiration and authoring references

These six references were previously listed under "More" in AGENTS.md. Their
names are normalized here, including aliases so none disappear from the catalog.
They are retained for consideration, not treated as installed site dependencies.

| Reference | Practical use / compatibility boundary |
| --- | --- |
| [Refero](https://refero.design/) (Refero style) | Study editorial hierarchy, spacing, and navigation examples. Select patterns appropriate to research publishing; do not copy product dashboards or marketing layouts wholesale. |
| [Cult UI](https://www.cult-ui.com/docs) (cult-ui) | Component and interaction inspiration from a React/Tailwind/shadcn ecosystem. Reimplement a justified pattern natively; importing its stack would conflict with this Hugo site's architecture. |
| [ShaderGradient](https://shadergradient.co/) (shader Gradient) | Retained shader/gradient visual reference. No current application: animated gradients compete with the sparse scientific graph. Evaluate a specific export/runtime and its rendering cost only if a future content need warrants it. |
| [Manus](https://manus.im/) (Manus.im) | External authoring/agent-tool reference, not a Hugo animation library. It may aid exploration; repository inspection, maintainable native code, and rendered verification remain required for any output adopted here. |
| [Kokonut UI](https://kokonutui.com/) (kokonut ui) | React/Tailwind component inspiration for proportions and restrained interaction states. Borrow relevant patterns in native HTML/CSS; do not import a component-app stack for homepage polish. |
| [Bklit UI](https://ui.bklit.com/docs) (bklit ui) | React/shadcn chart and data-visualization reference. Potential inspiration for a future research figure with actual data. Prefer a standalone SVG or small native implementation where sufficient; avoid ornamental dashboard metrics. |

## Homepage improvements and remaining opportunities

The interface-state improvements below are implemented; tutorial illustrations
remain a proposal. Preserve the existing featured selection, biography wording,
tutorial links, and native academic actions.

| Status | Existing content / interaction | Improvement / opportunity | Technique |
| --- | --- | --- | --- |
| Implemented | "Learn more about my journey" biography disclosure | A small rotating indicator follows the native open/closed state. Content opens immediately and remains stationary; no panel-height animation was added. Native disclosure works without JS. | CSS, 160 ms transform transition; reduced motion overrides it. |
| Implemented | Publication citation dialog and its copy action | "Copied" and a check icon confirm actual success, with a polite live announcement. A native button retains keyboard focus; failure feedback and manual copying remain available. | Native clipboard API with legacy fallback, CSS opacity/transform; pinned citation template overridden locally. |
| Implemented | Mobile menu and theme selector | Menu/close bars follow Bootstrap aria-expanded; local sun/moon SVG follows the actual body.dark state. The theme control announces the currently rendered theme. | CSS/local SVG, 160 ms transitions; no Morphicons dependency needed. |
| Implemented | Long Selected Publications and Selected Talks sections | Section headings retain context beneath the desktop navbar while scrolling their own section. Mobile and viewports shorter than 600 px retain ordinary flow. | CSS sticky at widths of at least 992 px; headings stay within their section row. |
| Proposed | ICML 2024 Graph Learning and LoG 2022 Graph Rewiring tutorials | Add compact, topic-specific SVG illustrations: a small neighborhood aggregation example and a before/after edge-rewiring example. A user-triggered step or brief focus/click response could explain the idea. Do not imply the decorative sketch is a measured paper result. | Static SVG first; CSS/WAAPI for one step. Consider Motion or Anime.js, not both, only if a coordinated explanation requires it. |

Review interface-state polish with Impeccable/design guidance and Vercel's
interface checks. The tutorial illustrations offer a distinctive
research identity if their explanatory value survives the small available space.
Keep the portrait stationary and the evolving hero network as the sole ambient
animation; do not add section-wide reveals or animated body text.

## Compatibility and adoption rules

- Preserve Hugo Extended 0.79.1, the pinned legacy Wowchemy modules, and the
  Bootstrap/jQuery content model. Use the actual custom_js.html/custom_head.html
  hooks, local partials/shortcodes, and custom Sass documented in DESIGN.md.
- Prefer CSS, static SVG, then small native JS/WAAPI before a new library. Design
  guidance and inspiration services are not automatically runtime dependencies.
- Prefer a pinned, already-built browser distribution, self-hosted and
  fingerprinted. Test new syntax against Hugo 0.79.1's legacy minifier; vendor
  distributions can be fingerprinted without re-minification.
- The existing hook can load type="module" scripts. Self-host the complete ESM
  dependency graph: an entry file containing unresolved bare imports is not
  sufficient. Add a prebuild/bundler only if a selected feature warrants it.
  Never ship CDN @latest URLs.
- Preserve native semantics, progressive enhancement, visible keyboard focus,
  theme contrast, touch behavior, and prefers-reduced-motion. No new interaction
  may depend exclusively on hover. Pause expensive work when hidden/offscreen.
- Evaluate payload, layout shift, rendering cost, mobile behavior, and actual
  explanatory value before adoption. Verify affected pages in both themes and
  responsive widths with the pinned Hugo build. Record implemented decisions and
  checks in DESIGN.md; keep this catalog as their single tool reference.
