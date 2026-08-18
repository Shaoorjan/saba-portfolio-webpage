# Saba Gul — research site

The personal site of Saba Gul, independent researcher in organizational
safeguarding and PSEAH: open-access research and free tools for U.S. nonprofit
organizations.

**Live at:** https://pseacrosswalk.org/ (falls back to https://shaoorjan.github.io/saba-portfolio-webpage/)

## What's here

Plain HTML with one stylesheet and one small script. No build step, no framework,
no package manager, no third-party requests. The site works opened straight from
disk as well as hosted.

| File | Page |
|---|---|
| `index.html` | Home |
| `about.html` | About |
| `research.html` | Research & publications |
| `toolkit.html` | The toolkit — all four tools |
| `self-assessment.html` | The 30-indicator safeguarding self-assessment, scored in the browser |
| `project.html` | The U.S. Nonprofit Safeguarding Crosswalk Project |
| `contact.html` | Contact |
| `404.html` | Not-found page |
| `assets/css/style.css` | The entire design system |
| `assets/js/self-assessment.js` | Scoring for the self-assessment (nothing else) |

## The self-assessment page

`self-assessment.html` is a web edition of Tool 2 of the Implementation Toolkit.
The indicators, domain questions, scoring bands, and scope note are transcribed
from the published PDF — **if the toolkit is revised, this page must be revised
with it**, or the site contradicts the record it cites.

The script stores and transmits nothing: no network requests, no `localStorage`,
no cookies. The page states that answers never leave the browser, so that has to
stay literally true. Never add analytics events to the indicators or the score.

## Editing

Open any `.html` file here on GitHub, click the pencil icon, edit the text, and
click **Commit changes**. GitHub Pages redeploys within a minute or two, and every
edit is a commit you can revert.

Two things that break hand-edited HTML:

1. Deleting one half of a tag pair — if you remove an opening `<span …>`, remove
   its `</span>` too.
2. Pasting from Word or Google Docs, which carries invisible formatting into the
   source. Type text directly instead.

## Publishing

**Settings → Pages → Deploy from a branch → `main` / `(root)`.**

`.nojekyll` tells Pages to serve the files as-is rather than running them through
Jekyll. All paths are relative, so the site works from a project subpath as well
as from a domain root.

**Custom domain:** live at `pseacrosswalk.org` via GitHub Pages (Settings →
Pages → Custom domain). DNS is on GoDaddy: four `A` records on `@` pointing at
GitHub's four Pages IPs, plus a `CNAME` on `www` → `shaoorjan.github.io`. GitHub
writes the `CNAME` file in this repo itself — don't add or edit it by hand.
`robots.txt` and `sitemap.xml` point at `pseacrosswalk.org`; resubmit the sitemap
in Google Search Console if the domain ever changes again.

## License

Site text and design © 2026 Saba Gul. The published research and tools the site
links to are licensed CC BY 4.0 and archived on Zenodo:

- *Safeguarding Without a Baseline* (Module 1) — https://doi.org/10.5281/zenodo.21847737
- Implementation Toolkit v1.0 (Tools 1–4) — https://doi.org/10.5281/zenodo.21856846
