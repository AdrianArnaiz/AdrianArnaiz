# Search discoverability audit

Audited on 3 October 2026. This repository is Adrian Arnaiz-Rodriguez's personal
academic website at `https://adrianarnaiz.me/`. The user confirmed this
scope after the original request named "Ahugo WOW Academy". No evidence in the
production sources supports that academy identity, an educational organization,
commercial courses, or a local business. Those entities and claims were not added.

The highest-impact improvements clarify the person who owns the site, correct
archive canonicals, improve page descriptions, exclude demonstration and preview
content from indexing, and make research records easier to interpret. No framework
upgrade, runtime dependency, visual redesign, or change to existing public
publication/talk URLs was required. Production deployment uses the custom domain;
preview deployments retain their own base URLs.

## Existing implementation

- Hugo Academic / legacy Wowchemy modules are pinned to `68b9925c9351`;
  Netlify uses Hugo Extended 0.79.1. Root sources, not `exampleSite/`, are deployed.
- Hugo generates static HTML, a sitemap, robots.txt, RSS, a search JSON index,
  and a web manifest. Research content does not depend on JavaScript to be read.
- The theme already generates titles, canonical links, Open Graph metadata,
  X/Twitter cards, icon sizes, Article/BlogPosting and Event JSON-LD.
- The site title, visible name, affiliation, portrait, contact details and academic
  profiles already identify Adrian. ORCID and Google Scholar links are present.
- HTTPS, readable page bundles, stable publication URLs, and `/talk/:slug/`
  permalinks are configured. Navigation, archive links and pagination are real
  HTML links. Draft introductory posts and draft policy placeholders are unpublished.
- Responsive styling, a viewport declaration, a main landmark, a skip link,
  self-hosted fonts, sized responsive homepage portraits, and lazy tutorial logos
  were already implemented. The decorative network pauses offscreen/when hidden
  and respects reduced motion and touch devices.
- Google verification already had an HTML ownership file and a configured token.
  The pinned theme did not output that configured token as a meta tag.
- Author profiles are deliberately unrendered through
  `content/authors/_index.md`; the homepage is the public profile. This was retained.

## Findings and implemented changes

| Priority | Evidence before changes | Implementation |
| --- | --- | --- |
| High | Homepage WebSite JSON-LD omitted the site name; no primary Person entity was emitted. Article publisher used ELLIS Alicante with the personal site's icon. | Named WebSite, Person, ProfilePage, WebPage/CollectionPage and BreadcrumbList nodes use stable IDs. The homepage links the person to the site, portrait, actual academic profiles and affiliation. The personal site's publisher is Adrian, and ELLIS Alicante remains an affiliation. |
| High | Repository baseurl used the Netlify hostname, although the live site already used the custom domain. The Netlify hostname returned a duplicate 200 response. | Production baseurl and build command explicitly use `https://adrianarnaiz.me/`. Forced host-specific 301 redirects consolidate the Netlify and www hosts without affecting deploy-preview hostnames. Shared download links use `/media/` paths. |
| High | Later archive pages canonicalized to page one even though they contain different records. | Self-canonical pagination URLs, matching Open Graph URLs, and page-number titles/descriptions. The original queries, chronology and pagination are retained. |
| High | 83 standard pages reused the generic site description; Experience had an empty description. Some descriptions contained raw Markdown. | Explicit descriptions for key destinations; truthful contextual taxonomy descriptions; Markdown/plain-text normalization and concise fallback excerpts. The homepage title names Adrian and his research areas. |
| High | Preview and branch builds had no repository-level indexing protection. | Netlify HUGO_DEPLOY_CONTEXT drives HTML noindex and a generated `_headers` file with `X-Robots-Tag: noindex, follow` for every preview file. Production stays indexable. Preview robots.txt allows crawling so engines can read noindex and omits the sitemap advertisement. |
| Medium | An introductory slide deck was published; its nonrendered HTML section appeared in the sitemap. One publication contained Lorem ipsum text. | The sample deck and its section are excluded from the sitemap. The section is marked noindex; the pinned theme currently produces only its RSS feed. Netlify supplies noindex headers for the deck and CMS. Placeholder abstract text was cleared; its summary now uses only the existing title and venue facts. |
| Medium | Two news destinations and a linked image referenced incorrect talk slugs. | Corrected internal URLs and added permanent Netlify redirects for the old destinations, including the Parliament bundle's media paths. |
| Medium | DOI fields sometimes contained a full doi.org URL or an OpenReview URL, producing broken theme DOI links; one author was `admin,`. | Normalized two known DOI identifiers, moved two non-DOI sources into native source/custom link fields, and corrected the author reference. Original research destinations remain available. |
| Medium | Publications had no Highwire citation meta tags; Article schema included only one author. | All actual authors are resolved, with ScholarlyArticle for publication records. Citation title, individual authors, publication date and validated DOI are emitted. A citation PDF URL is emitted only for an explicitly configured PDF in the same bundle. |
| Medium | Featured page images lacked alt text and intrinsic dimensions. | The pinned header gains dimensions, async decoding and an alt fallback using existing image descriptions/captions, then the page title. Social images also receive alt metadata. More specific author-written descriptions remain preferable for complex figures. |
| Medium | The icon link selected a 32px derivative; the default social portrait was 1,089,694 bytes. | The favicon link selects a 48px square PNG. The default Person sharing image is a 600px author-portrait derivative, approximately 25 KB in the audited build, with a square summary card. The original media files are preserved. |
| Medium | MathJax, Mermaid and Leaflet loaded across the site despite no visible homepage use. | Disabled global math/diagram/map loading and unused per-post diagram settings. Math remains enabled on the AI resources page containing an equation and on the unpublished technical sample. Existing library pins and network behavior are unchanged. |
| Medium | Netlify Identity blocked parsing/rendering on the homepage. Lighthouse also found skipped heading levels and a 179 KB tutorial logo displayed at 48?90px. | Identity loads with `defer` and attaches its login redirect on load, avoiding the pinned footer timing dependency. Main sections use h2 below the profile h1; role/affiliation become styled paragraphs. A Hugo image derivative serves the logo at 90/180px (6/13 KB); the original public asset is preserved. |
| Medium | Bare `hugo server` on installed Hugo 0.95 denied reads of CONTEXT; the old preview helper also used an unsupported warning flag. | Netlify explicitly supplies HUGO_DEPLOY_CONTEXT for production/previews/branches, which Hugo permits by default. The cross-version preview command is `hugo server --disableFastRender`. No security allowlist was broadened. |
| Low | Ownership token support was incomplete. | The existing Google token now renders; an optional empty Bing token setting renders `msvalidate.01` only after a real token is supplied. |

The sitemap remains generated from Hugo pages. It excludes opted-out pages,
404s and unrendered pages with no permalink; it does not invent modification
dates or list nonexistent author-profile destinations. Paginated URLs remain
discoverable through HTML navigation even though Hugo's sitemap lists the base
archive URLs.

## Search appearance and content opportunities

The intended homepage title is
`Adrian Arnaiz-Rodriguez | Trustworthy AI & Graph Learning`. The description
identifies his postdoctoral role, ELLIS Alicante, trustworthy AI, graph neural
networks, algorithmic fairness and AI regulation. The named WebSite, connected
Person, profile links, visible name, social identity and favicon give search
systems consistent evidence for a professional personal-site result.
Google chooses the displayed title, snippet, site name and favicon; rendering
these signals does not guarantee their selection.
[Google site name guidance](https://developers.google.com/search/docs/appearance/site-names)
and [favicon guidance](https://developers.google.com/search/docs/appearance/favicon-in-search)
describe the relevant signals.

Existing navigation and crawlable archive links support useful sitelinks to
Publications, Talks, Experience, Awards and Scientific Community. Breadcrumbs
describe page hierarchy. Sitelinks are automated; there is no markup that orders
Google to display a chosen set. The obsolete sitelinks search-box SearchAction
was not carried into the replacement WebSite graph.
[Google sitelinks guidance](https://developers.google.com/search/docs/appearance/sitelinks)
explains how clear structure, headings and links help selection.

Supported topic opportunities include trustworthy AI, algorithmic fairness,
graph neural networks, graph rewiring/DiffWire, FairShap data reweighting,
structural group unfairness, human-AI complementarity, and AI regulation/labour
law. The existing tutorials, publications, talks and resource compilation provide
substantive destinations. They were not repackaged as courses the site sells.
Future improvements should add verified abstracts, precise image descriptions,
and useful explanations tied to actual research, with links between related
records. Broad highly competitive topics alone are not a promise of rankings.

Static accessible text, clear identity, factual citations and crawlable links
also help AI search systems. No speculative llms.txt file, synthetic FAQ, keyword
stuffing, fabricated organization, or unsupported claim was added.
[Google AI search guidance](https://developers.google.com/search/docs/appearance/ai-features)
connects eligibility to ordinary indexing and search fundamentals.

## Validation and limits

- Production, future-content, deploy-preview and branch-deploy builds passed
  with Hugo Extended 0.79.1, the pinned modules, Netlify Git-info settings and
  representative deployment base URLs. Output/resources stayed in temporary
  audit directories. Production and future builds each report 221 Hugo pages
  including aliases and auxiliary output; this is not an indexable-URL count.
- Generated-page checks cover 137 standard HTML pages, excluding verification,
  CMS, redirect stubs and the special Reveal slide deck. Checked descriptions,
  unique titles, self-canonicals, JSON parsing, featured-image alt/dimensions,
  all local HTML links/image paths, citation tags and sitemap destinations.
  The final production output has 128 sitemap URLs, 50 featured images with
  alt text and dimensions, 17 scholarly records with core citation tags, and
  166 syntactically valid JSON-LD blocks. Local link/image checks covered 2,379
  references. No duplicate titles, missing descriptions or broken local
  destinations were found on the scoped pages.
- Preview and branch output were checked for page noindex, the exact `_headers`
  content, and robots behavior. Netlify's actual response headers and redirect
  application still require verification after deployment.
- Browser checks passed at 1440, 768, 390 and 320 CSS pixels in both themes:
  no homepage overflow, page errors or axe WCAG 2 A/AA and 2.1 AA violations.
  Reviewed representative desktop/light and mobile/dark screenshots. Checked
  the talk archive, a publication, a project and the AI resources page on mobile.
  Equations render; all 17 publication entries and the selected talks remain
  reachable without JavaScript; archive pagination also works without JavaScript.
- Installed Hugo 0.95 successfully built and served HTTP 200 after the environment
  variable fix. Expected legacy .Path/tweet warnings are nonfatal.
- Additional desktop/mobile browser checks passed in both themes after the heading
  and Identity changes, including axe best-practice checks and exactly one login
  redirect handler. A mocked login event navigated to `/admin/`; no real account
  login was attempted.
- Mobile Lighthouse before deployment: the existing live site scored 41 performance,
  98 accessibility and 100 SEO (LCP 9.2s, TBT 710ms, CLS 0). The final local build
  scored 80 performance, 100 accessibility and 100 SEO (LCP 3.8s, TBT 200ms, CLS 0).
  These are single lab runs on different origins; local responses were uncompressed
  and did not reproduce Netlify caching, so they do not establish a production
  improvement or real-user Core Web Vitals.
- `git diff --check` passed. No generated `public/` or `resources/` sources,
  module pins, vendor bundles or tracked build lock were edited for this work.

These are local checks, not a guarantee of indexing or rich results. No Search
Console or Bing account access was available. Publication download links were
checked with real HTTP requests: CoMatch now links to the verified arXiv PDF,
and the labour-law causality article links to the verified publisher PDF while
retaining its landing page as Source. Other landing-page or bot-blocked PDFs
remain for author review. COMSOTEC BibTeX placeholder fields were replaced with
the existing verified workshop name/year; unknown pages/organization were removed
and the malformed author separator was fixed. Actual author order still needs
reconciliation between the page front matter and its BibTeX record.
No real-user LCP/INP/CLS measurements were obtained. Google's public PageSpeed
API returned quota-exceeded (429); a local Lighthouse CLI audit was used instead.
Native Event markup was retained, but enhanced event presentation may need
additional verified venue/organizer details; none were fabricated.
The homepage now has one main h1, section h2s and item h3s. The heading change
preserves the existing typography and spacing. Some long research titles and concise taxonomy archives are
intentional; no blanket removal of research archives was applied.

## External actions and remaining work

1. Deploy the changes. Verify the production homepage is indexable, preview
   responses send noindex, the two legacy talk paths redirect, `/admin/` and
   `/slides/example/` send noindex, and the icon/portrait URLs return successfully.
2. Confirm ownership in Google Search Console for `https://adrianarnaiz.me/`
   using the retained verification file/token. A Domain property for
   `adrianarnaiz.me` can use Google's actual TXT token at the authoritative DNS
   provider (Namecheap only if DNS is managed there). A URL-prefix property
   can use the existing HTML/meta verification. Do not guess a DNS token.
   Submit `/sitemap.xml`, inspect the homepage and important research pages,
   and request a recrawl after deployment. Review indexing, queries and Core
   Web Vitals. Verify structured data with Schema Markup Validator and relevant
   types with Google's Rich Results Test; site-name markup has no dedicated
   Rich Results Test result.
3. Add the site to Bing Webmaster Tools, importing the Search Console property
   where supported or supplying the actual Bing verification token. Submit the
   same sitemap. No token or registration was fabricated.
4. Keep the canonical homepage and name consistent in ORCID, Google Scholar,
   GitHub, LinkedIn, ELLIS/institutional biographies and conference profiles.
   Ask for legitimate links when the institution/publication context warrants
   them. A knowledge panel depends on Google's broader entity evidence; no
   repository change can create or guarantee one.
5. Supply the verified COMSOTEC abstract, more specific alt descriptions for
   scientific figures, and complete journal/conference citation details where
   needed. Several `url_pdf` values lead to HTML landing pages rather than a
   direct PDF; confirm real full-text URLs and sharing rights before replacing
   them. Google Scholar also requires accessible scholarly content and proper
   bibliographic metadata, beyond the new core tags.
   [Scholar inclusion guidance](https://scholar.google.com/intl/en/scholar/inclusion.html)
   covers these constraints.
6. Monitor production performance and field Core Web Vitals. The legacy theme
   still loads shared libraries and icon fonts; CMS identity startup
   and the decorative network have costs. Preserve CMS login and the requested
   design when evaluating any future changes. Optimize oversized bundle images
   only after identifying an actual loading bottleneck.

The custom domain already resolves over HTTPS; no speculative Namecheap DNS
change is needed. Keep `adrianarnaiz.me` as Netlify's primary domain and update
external profiles to that same URL.
An academic personal site does not by itself establish eligibility for a Google
Business Profile. Searches for "Ahugo WOW Academy" require the actual academy's
site and identity; this audit improves branded searches for Adrian's name.
