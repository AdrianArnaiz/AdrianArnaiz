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
| [DESIGN.md](DESIGN.md) | Implemented visual system, graph implementation, and verification. |
| [DESIGN_TOOLS.md](DESIGN_TOOLS.md) | Single catalog of all design tools, adoption status, compatibility notes, and future homepage opportunities. |
| [LICENSE.md](LICENSE.md) | Repository license. |

## Content editing map

| Task | Source | Notes |
| --- | --- | --- |
| Biography, affiliations, education, and profile links | [content/authors/admin/_index.md](content/authors/admin/_index.md) | Main author profile; portrait media lives alongside it. |
| Homepage sections | [content/home/](content/home/) | `index.md` declares the widget page; other files define sections and ordering. |
| Selected publications | [content/home/featured.md](content/home/featured.md) | Homepage widget; subtitle includes the complete-list link in the sticky heading; records live in `content/publication/`. |
| Selected talks | [content/home/talks.md](content/home/talks.md) | Homepage widget; subtitle includes the complete-list link in the sticky heading; records live in `content/event/`. |
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
| [data/assets.toml](data/assets.toml) | Font Awesome 7.3.1 version/SRI override; preserves all other module asset pins. |
| [assets/images/icon.png](assets/images/icon.png) | Source site icon. |
| [static/](static/) | Files served directly, including downloads and site verification HTML. |
| [theme.toml](theme.toml) | Academic template metadata and declared minimum Hugo version. |

Local visual extensions are isolated in:

- [assets/scss/custom.scss](assets/scss/custom.scss): tokens, layout, responsive rules, focus, and motion preferences.
- [assets/scss/_research-fonts.scss](assets/scss/_research-fonts.scss): local font faces.
- [assets/js/network-background.js](assets/js/network-background.js): tsParticles evolving network, personalization, and first-section lifecycle.
- [assets/vendor/tsparticles/4.4.0/](assets/vendor/tsparticles/4.4.0/): pinned self-contained slim bundle, MIT license, and source/checksum provenance.
- [assets/js/research-interface.js](assets/js/research-interface.js): accessibility bridges, menu/theme state indicators, and citation-copy feedback for the legacy theme.
- [layouts/partials/custom_head.html](layouts/partials/custom_head.html) and [layouts/partials/custom_js.html](layouts/partials/custom_js.html): supported legacy asset hooks.
- [layouts/partials/widgets/about.html](layouts/partials/widgets/about.html): accessible profile and network placement.
- [layouts/partials/research/network.html](layouts/partials/research/network.html): decorative canvas markup.
- [layouts/partials/research/talk-row.html](layouts/partials/research/talk-row.html): shared editorial talk rows, display metadata, and direct resource links.
- [layouts/partials/li_list.html](layouts/partials/li_list.html): routes event listings to talk rows; keeps the pinned list view for other types.
- [layouts/section/event.html](layouts/section/event.html): year-grouped talk archive with preserved pagination.
- [layouts/partials/li_citation.html](layouts/partials/li_citation.html): publication hierarchy, retaining native author/action partials.
- [layouts/partials/citation.html](layouts/partials/citation.html): pinned citation dialog with native copy button, keyboard-scrollable citation, and feedback status.
- [layouts/_default/baseof.html](layouts/_default/baseof.html): original page shell with skip link and main landmark.
- [static/fonts/source-sans-pro/](static/fonts/source-sans-pro/): licensed, self-hosted existing typeface.
- [static/media/tutorials/](static/media/tutorials/): locally served existing conference logos.

Imported Wowchemy modules still provide the underlying templates, widgets,
shortcodes, and theme assets. See [DESIGN.md](DESIGN.md) before changing overrides.

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
