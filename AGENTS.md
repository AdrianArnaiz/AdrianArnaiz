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
- Search metadata and indexing conventions are documented in [SEO_AUDIT.md](SEO_AUDIT.md).
  Use `description` for concise search copy and `noindex: true` for retained
  demonstration/utility pages; the generated sitemap excludes them. Keep archive
  pagination queries synchronized with `layouts/partials/research/metadata.html`.
  Keep DOI fields as identifiers, not publisher URLs; use native resource/link
  fields for those URLs. Enable `math`/`diagram` only where content needs them.
  Netlify `HUGO_DEPLOY_CONTEXT` controls preview noindex headers; do not block crawling of
  those pages before engines can read their noindex directive. Special slide
  templates and CMS pages use Netlify response headers for indexing control.
  Production builds target `https://adrianarnaiz.me/`; preserve host-specific
  redirects and preview base URLs. The local widget-page override uses h2
  section headings below the homepage profile h1. Deferred Netlify Identity
  registers its login handler on load; retain that timing when editing the head.
  Preserve the root IndexNow ownership text file documented in SEO_AUDIT.md;
  submit only canonical, indexable production URLs after live-file verification.
- Keep page bundles (`index.md` plus related media) together. Preserve the
  distinction between `index.md`, section `_index.md`, and headless widget files.
- Homepage widgets live in `content/home/`. Check `active`, `headless`, `weight`,
  and content filters when adjusting visibility or ordering. Coordinate section
  filename changes with navigation anchors in `config/_default/menus.toml`.
  Publications/talks archive links live in their widget subtitle fields so they
  belong to the sticky section heading. Do not duplicate them in widget bodies.
- Preserve slugs and public URLs. Talk sources live in `content/event/`, while
  individual talk URLs follow `/talk/:slug/` in the permalink configuration.
- Distinguish event/publication `date` from page `publishDate`. Check normal and
  future-content builds when changing scheduled content.
- Talk listing appearance is shared by `layouts/partials/research/talk-row.html`
  and `layouts/section/event.html`. Preserve the homepage's featured selection
  and archive pagination. Bracketed venue prefixes are separated for display;
  original titles and URLs stay intact. Optional `list_title`, `list_venue`, and
  `list_summary` customize listing copy only. Keep resource URLs in native fields.
- Shared downloads belong in `static/media/`, linked as `/media/<filename>`.
  Keep page-specific media in its page bundle.
- Read [DESIGN.md](DESIGN.md) before changing appearance or motion. Custom Sass
  is imported by the pinned theme; custom JS uses its `custom_js.html` hook.
  Keep the tsParticles network decorative, confined to the first homepage section,
  static for reduced motion and touch devices. Use the evolving network without
  visible controls and continuous drift while visible, as requested by the author.
  Pause rendering when the document is hidden or the section is offscreen. Keep the pinned vendor bundle unmodified; tune
  the site-owned controller instead. Do not add unrelated animation libraries.
- Interface-state polish uses `assets/js/research-interface.js` and custom Sass.
  The local `layouts/partials/citation.html` preserves the pinned dialog while
  adding a native copy button and feedback. Keep one copy handler, announce only
  confirmed success, and preserve keyboard focus and failure/manual-copy paths.
- Font Awesome Free 7.3.1 is pinned independently in `data/assets.toml`, with
  verified stylesheet SRI. Keep all other CDN entries at their module pins. Use
  `icon: x-twitter` / `icon_pack: fab` for X and preserve the accessible
  "X (formerly Twitter)" label. No SVG-mask workaround is needed. Custom Sass
  updates the legacy theme's hardcoded pseudo-element font family; verify search,
  callouts, and card hovers as well as native icons when upgrading the font.
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
hugo server --disableFastRender

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

## Design tools reference

[DESIGN_TOOLS.md](DESIGN_TOOLS.md) is the single catalog of all design tools,
agent guidance, inspiration references, and potential integrations. Maintain
that inventory there; do not duplicate it here or in DESIGN.md. Listing a tool
is not authorization to add a runtime dependency. Follow the implemented visual
system and extension points in [DESIGN.md](DESIGN.md).
