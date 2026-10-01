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
  and imported in `config/_default/config.toml`. No local `layouts/` exists yet.
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
