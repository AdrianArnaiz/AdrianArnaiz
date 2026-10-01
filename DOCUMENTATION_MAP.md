# Documentation map

This personal academic website uses the **Hugo Academic / legacy Wowchemy**
template. Root directories contain the production site. `exampleSite/` contains
separate template examples.

## Start here

| Document | Purpose |
| --- | --- |
| [README.md](README.md) | Project introduction and public profile links. |
| [AGENTS.md](AGENTS.md) | Repository instructions, editing conventions, and validation commands. |
| [DOCUMENTATION_MAP.md](DOCUMENTATION_MAP.md) | This guide to documentation and site sources. |
| [HUGO_TEMPLATE_DOC.md](HUGO_TEMPLATE_DOC.md) | Original Academic/Wowchemy introduction and upstream links; historical template context. |
| [LICENSE.md](LICENSE.md) | Repository license. |

## Content editing map

| Task | Source | Notes |
| --- | --- | --- |
| Biography, affiliations, education, and profile links | [content/authors/admin/_index.md](content/authors/admin/_index.md) | Main author profile; portrait media lives alongside it. |
| Homepage sections | [content/home/](content/home/) | `index.md` declares the widget page; other files define sections and ordering. |
| Selected publications | [content/home/featured.md](content/home/featured.md) | Homepage widget; records live in `content/publication/`. |
| Selected talks | [content/home/talks.md](content/home/talks.md) | Homepage widget; records live in `content/event/`. |
| Publication records | [content/publication/](content/publication/) | Page bundles and attachments; `_index.md` controls the section listing. |
| Talks and events | [content/event/](content/event/) | Page bundles; individual pages use `/talk/:slug/`. |
| Experience | [content/experience/experience.md](content/experience/experience.md) | Widget rendered within [content/experience/index.md](content/experience/index.md). |
| Awards | [content/awards/index.md](content/awards/index.md) | Honors and awards page. |
| Scientific community | [content/community/index.md](content/community/index.md) | Service and community activities. |
| News | [content/news/_index.md](content/news/_index.md) | News section content. |
| Press | [content/press/_index.md](content/press/_index.md) | Press coverage content. |
| Blog | [content/post/](content/post/) | Posts and section listing. |
| Projects | [content/project/](content/project/) | Project bundles. |
| Markdown slide decks | [content/slides/](content/slides/) | Includes an example deck. |
| Privacy and terms | [content/privacy.md](content/privacy.md), [content/terms.md](content/terms.md) | Existing policy page sources. |
| CV and shared downloads | [static/media/](static/media/) | Served at `/media/`; includes `resume.pdf` and presentation PDFs. |

## Configuration and design

| Source | Responsibility |
| --- | --- |
| [config/_default/config.toml](config/_default/config.toml) | Title, base URL, permalinks, Markdown rendering, taxonomies, and module imports. |
| [config/_default/params.toml](config/_default/params.toml) | Theme/font selection, contact details, sharing, search, CMS, and other Wowchemy features. |
| [config/_default/menus.toml](config/_default/menus.toml) | Navigation, homepage anchors, and submenus. |
| [config/_default/languages.toml](config/_default/languages.toml) | Language configuration; English is configured. |
| [config.toml](config.toml) | Compatibility stub pointing to the actual configuration directory. |
| [data/themes/mydark.toml](data/themes/mydark.toml) | Custom color theme selected in `params.toml`. |
| [data/fonts/myroboto.toml](data/fonts/myroboto.toml) | Custom font set selected in `params.toml`. |
| [data/page_sharer.toml](data/page_sharer.toml) | Sharing button definitions. |
| [assets/images/icon.png](assets/images/icon.png) | Source site icon. |
| [static/](static/) | Files served directly, including downloads and site verification HTML. |
| [theme.toml](theme.toml) | Academic template metadata and declared minimum Hugo version. |

There are currently no local layout overrides. Imported Wowchemy modules provide
templates, widgets, shortcodes, and theme assets. Match their pinned version when
investigating rendering or adding overrides.

## Build and maintenance

| Source | Responsibility |
| --- | --- |
| [go.mod](go.mod), [go.sum](go.sum) | Module dependencies and checksums. Both Wowchemy modules are pinned to `v0.0.0-20210106233222-68b9925c9351`; `go.mod` declares Go 1.15. |
| [netlify.toml](netlify.toml) | Deployment commands, `public/` output, Hugo `0.79.1` pin, environment settings, and headers. Deploy previews use `--buildFuture`. |
| [view.sh](view.sh) | Preview helper: `hugo server --disableFastRender --i18n-warnings`. |
| [update_wowchemy.sh](update_wowchemy.sh) | Legacy updater that changes dependencies and the Netlify Hugo pin without a confirmation prompt. |
| [scripts/init_kickstart.sh](scripts/init_kickstart.sh) | Legacy reset/import script with old theme paths; can overwrite customizations. Not a normal setup step. |
| [.editorconfig](.editorconfig) | Encoding, indentation, and whitespace conventions. |
| [.gitignore](.gitignore) | Excludes generated `public/` and root `resources/`, among other files. |
| [exampleSite/](exampleSite/) | Samples with their own config, module manifest, Netlify settings, and CMS configuration. Use root sources for production edits. |

Run commands from the repository root. See [AGENTS.md](AGENTS.md) for preview,
production-style build, future-content build, and validation instructions.
`public/` and `resources/` are generated output/cache directories, not sources.
The root `.hugo_build.lock` is currently tracked; avoid incidental edits.

Update this map when documentation or major source locations change. Source
files remain authoritative for dependency pins and deployment commands.
