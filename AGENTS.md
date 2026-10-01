# Repository instructions

## Project context

This is Adrian Arnaiz-Rodriguez's personal academic website, built with the
**Hugo Academic template / legacy Wowchemy**. Work from the repository root.
Read [DOCUMENTATION_MAP.md](DOCUMENTATION_MAP.md) to locate relevant sources.

- Production sources are the root `content/`, `config/`, `assets/`, `data/`, and
  `static/` directories. `exampleSite/` contains separate template samples.
- Actual configuration lives in `config/_default/`. Root `config.toml` is a
  compatibility stub for Blogdown and Forestry.
- Theme templates and shortcodes come from Hugo modules declared in `go.mod`
  and imported in `config/_default/config.toml`. Local overrides and visual
  extension points are documented in [DESIGN.md](DESIGN.md).
- Both Wowchemy modules are pinned to
  `v0.0.0-20210106233222-68b9925c9351`; Netlify pins Hugo `0.79.1`.
  Preserve this setup unless the task includes an upgrade. Do not assume current
  Hugo Blox configuration or widgets are compatible with this legacy template.

## Editing conventions

- Make focused edits and preserve unrelated user changes. Follow `.editorconfig`:
  UTF-8, LF, two-space indentation, and a final newline. Preserve intentional
  Markdown line breaks, accents, and existing language choices.
- Use a nearby production page of the same type as a starting point for new
  publications, talks, posts, or projects. Replace copied metadata and remove
  irrelevant fields and attachments. Never invent research or biographical facts.
- Preserve YAML front matter and legacy Academic field names. Publications use
  `publication_types`, `authors`, `featured`, and `url_*`. The `admin` author
  references `content/authors/admin/_index.md`.
- Keep page bundles (`index.md` plus related media) together. Preserve the
  distinction between `index.md`, section `_index.md`, and headless widget files.
- Homepage widgets live in `content/home/`. Check `active`, `headless`, `weight`,
  and content filters when adjusting visibility or ordering. Coordinate section
  filename changes with navigation anchors in `config/_default/menus.toml`.
- Preserve slugs and public URLs. Talk sources live in `content/event/`, while
  individual talk URLs follow `/talk/:slug/` in the permalink configuration.
- Distinguish event/publication `date` from page `publishDate`. Check normal and
  future-content builds when changing scheduled content.
- Shared downloads belong in `static/media/`, linked as `/media/<filename>`.
  Keep page-specific media in its page bundle.
- Read [DESIGN.md](DESIGN.md) before changing appearance or motion. Custom Sass
  is imported by the pinned theme; custom JS uses its `custom_js.html` hook.
  Keep the tsParticles network decorative, confined to the first homepage section,
  static for reduced motion and touch devices. Use the evolving network without
  visible controls and continuous drift while visible, as requested by the author.
  Pause rendering when the document is hidden or the section is offscreen. Keep the pinned vendor bundle unmodified; tune
  the site-owned controller instead. Do not add unrelated animation libraries.
- Customize colors and fonts in `data/themes/mydark.toml`,
  `data/fonts/myroboto.toml`, and `config/_default/params.toml`. Inspect the pinned
  module before adding a local `layouts/` override. Do not edit the module cache.
- Do not hand-edit or commit generated `public/` or `resources/`. Avoid incidental
  edits to the tracked `.hugo_build.lock`.
- Do not run `scripts/init_kickstart.sh` for ordinary maintenance: it copies demo
  sources over site customizations and uses old theme paths.
- Use `update_wowchemy.sh` only for an intended dependency upgrade. It changes
  modules and the Netlify Hugo pin. Despite its introductory comment, the script's
  executable code runs without asking for confirmation.

## Preview and validation

Use Hugo Extended for theme asset processing and Go for Hugo modules. Use the
Netlify-pinned Hugo version to check deployment compatibility. `go.mod` declares
Go 1.15. Initial module resolution may require network access.

Run from the repository root:

```sh
# Local preview; also the command in view.sh.
hugo server --disableFastRender --i18n-warnings

# Production-style build using the configured base URL.
hugo --gc --minify

# Include future-dated content, as Netlify deploy previews do.
hugo --gc --minify --buildFuture
```

Netlify additionally supplies the base URL with `-b` and publishes `public/`.
See `netlify.toml` for exact production, preview, and branch commands.

For content, configuration, or styling changes, run the relevant build and
inspect affected pages, links, media, navigation, and responsive layout. Check
light and dark modes for appearance changes. There is no repository unit-test
suite or GitHub Actions build workflow at present. Documentation-only changes
need path/link checks and `git diff --check`, not a site rebuild. Report checks
actually run and any blockers; do not claim deployment parity from another Hugo
version alone.

Update this file and the documentation map when structure, commands, dependencies,
or editing conventions change.

## Potential design tools

| Tool / approach | Hugo/Wowchemy fit | What I’d use it for |
|---|---|---|
| **tsParticles** | **Excellent** | Primary candidate for the interactive graph/network background. Vanilla/CDN support, links + cursor repulsion/grab, reduced-motion controls. ([GitHub][1]) |
| **Custom Canvas** | **Excellent** | Alternative to tsParticles if the exact network aesthetic can be implemented cleanly with less code/dependency. |
| **Motion / motion.dev** | **Excellent** | My preferred general-purpose motion library if one is needed. It supports plain JS, SVG and WebGL; the mini API is deliberately small. ([Motion][2]) |
| **Anime.js** | **Excellent** | Very good alternative for SVG/path/timeline work. Current Anime.js is modular, supports vanilla JS and has a lightweight WAAPI implementation. ([Anime.js][3]) |
| **GSAP** | **Excellent technically**, probably unnecessary initially | Best if we eventually want sophisticated scroll choreography, pinned sections, path animation, etc. It is explicitly framework-agnostic. ([GSAP][4]) |
| **Morphicons** | **Good** | Tiny high-quality microinteraction for e.g. hamburger→close, sun→moon, external-link states. Not for the background. It supports plain JS and multiple frameworks. ([morphicons][5]) |
| **Haikei** | **Excellent** | Static SVG decoration: subtle graph-like patterns, low-poly grids, waves, section separators. Zero runtime animation cost. ([Haikei][6]) |
| **Spline** | **Compatible**, but use sparingly | A single intentional interactive 3D hero/object. Its Viewer is a native web component and can react to page-level cursor/scroll. ([Spline][7]) |
| **shadcn/ui** | **Not something I would install wholesale** | It is fundamentally aimed at component-app stacks such as React/Vite/etc. Borrow its spacing, tokens, component restraint and interaction patterns instead. ([shadcn/ui][8]) |
| **Vercel Web Interface Guidelines** | **Very useful** | Agent-side design/accessibility audit. They explicitly provide an agent skill. ([Vercel][9]) |
| **Impeccable** | **Very useful** | Agent-side visual/design review and polishing, not a runtime dependency. It explicitly supports Codex skills. ([GitHub][10]) |
| **Emil Kowalski skills** | **Very useful** | You meant **Emil Kowalski**. His current skills include `animate`, `review-animations`, `improve-animations`, `find-animation-opportunities`, etc., and explicitly target Codex too. ([Skills][11]) |
| **frontend-design skill** | **Useful** | Gives the agent art-direction and rendered-verification discipline; again, agent guidance rather than code shipped to visitors. ([GitHub][12]) |


**More**
* Refero style
* cult-ui
* shader Gradient
* Manus.im
* kokonut ui
* bklit ui


[1]: https://github.com/tsparticles/tsparticles/blob/main/websites/website/docs/guide/getting-started.md?utm_source=chatgpt.com "tsparticles/websites/website/docs/guide/getting-started.md at main · tsparticles/tsparticles · GitHub"

[2]: https://motion.dev/?utm_source=chatgpt.com "Motion (prev Framer Motion): JavaScript & React animation library"

[3]: https://animejs.com/documentation/animation/?utm_source=chatgpt.com "Animation | Documentation | Anime.js | JavaScript Animation Engine"

[4]: https://gsap.com/docs/v3/Installation/?utm_source=chatgpt.com "Installation | GSAP | Docs & Learning"

[5]: https://www.morphicons.com/?utm_source=chatgpt.com "morphicons — SVG icon morphing library for React, Vue & Svelte"

[6]: https://haikei.app/?utm_source=chatgpt.com "Generate unique SVG design assets | Haikei"

[7]: https://docs.spline.design/exporting-your-scene/web/exporting-as-spline-viewer?utm_source=chatgpt.com "Exporting as Spline Viewer | Spline Documentation"

[8]: https://ui.shadcn.com/docs/official?utm_source=chatgpt.com "Official shadcn/ui Website - shadcn/ui"

[9]: https://vercel.com/design/guidelines?utm_source=chatgpt.com "Web Interface Guidelines"

[10]: https://github.com/pbakaus/impeccable/blob/main/.agent/skills/impeccable/SKILL.md?utm_source=chatgpt.com "impeccable/.agent/skills/impeccable/SKILL.md at main · pbakaus/impeccable · GitHub"

[11]: https://www.skills.sh/emilkowalski/skills/animate?utm_source=chatgpt.com "animate — emilkowalski/skills"

[12]: https://github.com/PaulRBerg/agent-skills/blob/main/skills/frontend-design/SKILL.md?utm_source=chatgpt.com "agent-skills/skills/frontend-design/SKILL.md at main · PaulRBerg/agent-skills · GitHub"