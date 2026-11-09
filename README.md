# Johan Tampubolon — portfolio

UX writing and AI content-design portfolio. Static HTML, CSS, and a small script. Published with GitHub Pages as a project site:

**https://johan-tampubolon.github.io/portfolio/**

Links and assets are relative, so they resolve under the `/portfolio/` base path.

## Pages

| URL | File |
|---|---|
| `/` | `index.html` — home |
| `/grab/` | `grab/index.html` — GrabMerchant AI Assistant collection |
| `/grab/#vernacular` | collection, vernacular row open |
| `/grab/#recommendations` | collection, recommendations row open |
| `/grab/#chitchat` | collection, chitchat row open |
| `/grab/#support` | collection, support row open |
| `/grab/vernacular/` | `grab/vernacular/index.html` |
| `/grab/recommendations/` | `grab/recommendations/index.html` |
| `/grab/chitchat/` | `grab/chitchat/index.html` |
| `/grab/support/` | `grab/support/index.html` |
| `/traveloka/` | `traveloka/index.html` |

Spenmo stays a card on the home page (`#spenmo`). The case is marked **Case study in development** — there is no detail page. The Traveloka “next” link returns to that card.

## Edit the copy

Page text lives in the HTML file for that page. Keep it aligned with the design handoff:

- Do not add metrics, launch results, or employer claims.
- Evidence labels stay visible and worded exactly, including `Illustrative reconstruction — for review`, `Project confirmed · details pending`, `Outcomes pending confirmation`, `Historical figures, with caveat`, `Case study in development`, `Conceptual image — generated, not a real workspace`, `From portfolio record`, `Illustrative concept — pending confirmation`, and `Prompt guidance shapes behavior — it is not a guarantee of enforcement`.
- Contact is `mailto:hi@johantampubolon.com` on the “Get in touch” button.
- The résumé control is a disabled button (“Résumé (PDF) — link pending” / Coming soon). When a PDF exists, replace that button with a real link to the file.

Shared styling is `css/styles.css` (type, color, spacing from the handoff tokens). Accordions, the mobile menu, hash deep links, and scroll restore when returning from a Grab project are in `js/site.js`.

Fonts load from Google Fonts: Newsreader, Inter, IBM Plex Mono, Caveat.

## Preview locally

From the repo root, serve the parent directory so the site is under `/portfolio/`:

```bash
mkdir -p /tmp/preview
ln -sfn "$PWD" /tmp/preview/portfolio
python3 -m http.server 8765 --directory /tmp/preview
```

Open http://127.0.0.1:8765/portfolio/ and http://127.0.0.1:8765/portfolio/grab/#chitchat.

## GitHub Pages

`.github/workflows/pages.yml` builds a static artifact and deploys it on every push to `main`, using `actions/configure-pages`, `actions/upload-pages-artifact`, and `actions/deploy-pages`.

**Johan needs to set the Pages source once:** in the repository on GitHub, open **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**. Until that is selected, the workflow cannot publish the site. After it is set, merging to `main` deploys https://johan-tampubolon.github.io/portfolio/.
