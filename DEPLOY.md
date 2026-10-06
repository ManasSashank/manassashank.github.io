# Putting Manas Sashank Juvvi's portfolio online (free, on GitHub Pages)

A complete walkthrough, from the files on your computer to a live URL you can put on a CV.
No build tools, no frameworks, no monthly cost. Budget about 30 minutes the first time.

**End result:** `https://YOUR-USERNAME.github.io`. Served over HTTPS, on GitHub's CDN.

---

## Contents

1. [What you have](#1-what-you-have)
2. [Preview it on your own machine](#2-preview-it-on-your-own-machine)
3. [Before you publish (what is done and what is left)](#3-before-you-publish-what-is-done-and-what-is-left)
4. [Create the GitHub repository](#4-create-the-github-repository)
5. [Upload the files](#5-upload-the-files)
6. [Turn on GitHub Pages](#6-turn-on-github-pages)
7. [Check it works](#7-check-it-works)
8. [Updating the site later](#8-updating-the-site-later)
9. [Optional: your own domain name](#9-optional-your-own-domain-name)
10. [Troubleshooting](#10-troubleshooting)
11. [Costs and limits](#11-costs-and-limits)
12. [Design notes](#12-design-notes)

---

## 1. What you have

```
portfolio/
├── index.html            Home page with bio, step-response graphic, news, capabilities, projects
├── research.html         Seven projects: thesis, IROS, ICRA, F1TENTH, rover, ETH, e-Yantra
├── publications.html     IROS 2025, ICRA 2024, ICCPS 2024 poster
├── experience.html       Positions, education, skills, awards
├── contact.html          Contact details and notes for recruiters and researchers
├── 404.html              Shown when someone hits a URL that does not exist
├── .nojekyll             Tells GitHub to serve these files as-is (see §10)
├── DEPLOY.md             This file
└── assets/
    ├── css/style.css     All styling. Every colour is a variable at the top.
    ├── js/main.js        Mobile menu and scroll reveal. The site works without it.
    ├── img/
    │   ├── portrait.svg  Placeholder, replace with your photo
    │   └── figure.svg    Placeholder, replace with one figure per project
    └── cv/cv.pdf         Placeholder, replace with your CV
```

Plain HTML and CSS. You edit it in any text editor, and what you see is what gets served.

---

## 2. Preview it on your own machine

Before uploading anything, look at it locally.

**The quick way:** double-click `index.html`. It opens in your browser and everything works.

**The better way**. A local server, which matches how GitHub will serve it:

```bash
cd path/to/portfolio
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Stop it with `Ctrl+C`.

Use this while you edit: change a file, save, refresh the browser. Keep the tab open the whole
time you work through the next section.

---

## 3. Before you publish (what is done and what is left)

The pages have been rewritten from Manas's CV. Placeholder copy is gone; only the image and
PDF assets are left to swap in.

### 3.1 Already done

- All content now comes from the full CV: dates, job title, lab, supervisors, education
  (MSc, ETH summer school, BTech), skills, hardware platforms and extracurriculars.
- Links taken from the CV: email, LinkedIn, GitHub (`ManasSashank`), Google Scholar, IEEE Xplore
  pages and videos for both papers, and the e-Yantra code repository and video.
- Research: seven projects (MSc thesis, motion primitive RL, safe multi-robot exploration,
  F1TENTH, outdoor rover, ETH summer school, e-Yantra Strawberry Stacker).
- The phone number is left off deliberately. A public page attracts spam calls.

### 3.2 Still to do

| Where | What to add |
| --- | --- |
| `assets/img/portrait.svg` | Replace with a square photo, about 800×800 px |
| `research.html` | Figures from both papers are already in `assets/img/projects/`. Add photos for the thesis, F1TENTH, rover or ETH projects if you have them (see 3.3) |

### 3.3 Adding figures to a project

Every project is currently text-only, which the layout handles on its own. To add a figure,
put a `project__media` block before the `project__text` block:

```html
<article class="project rise">
  <div class="project__media">
    <figure class="shot">
      <img src="assets/img/stl-go1.jpg" alt="Quadruped following an STL-compliant plan"
           loading="lazy" decoding="async">
      <figcaption>Fig. 1. One line saying what the reader is looking at.</figcaption>
    </figure>
  </div>
  <div class="project__text"> ... </div>
</article>
```

Add more `figure` elements to stack several. For a full-width gallery, add `project--gallery`
to the `<article>` and move the media block after the text. Figure shape classes:
`shot--crop` (fill frame, good for photos), `shot--tall` (3:4), `shot--wide` (21:9),
`shot--free` (keep the image's own proportions). Keep images around 1200 px on the long edge
and under 300 KB; always write a real `alt` description.

### 3.4 Project videos

Three projects embed their YouTube video beside the text, alternating sides. The IROS and
e-Yantra videos sit on the right, the ICRA one on the left, and on a phone each video drops
below its text.

Each embed starts at 8 seconds, which is a guess to skip the title card. To start a video at a
better moment, edit the `start=` value in `research.html` (the number is in seconds):

```html
<iframe src="https://www.youtube-nocookie.com/embed/xo2cXRYdDPQ?start=8&amp;rel=0"
```

The embeds use youtube-nocookie.com, so no tracking cookies are set until a visitor presses
play. Each one also has an "Open on YouTube" link underneath, which still works if an embed is
ever blocked.

### 3.5 If a YouTube video shows "Error 153"

Error 153 means YouTube did not receive a usable `Referer` header from the page, so it refuses
to start the player. The video itself is fine, and the "Open on YouTube" link below each embed
still works.

It almost always means the page was opened straight from disk, so the address bar reads
`file:///home/...` rather than `http://`. A `file://` page has no origin, so the browser sends
no `Referer` at all. Serve the folder over HTTP instead:

```bash
cd manas-juvvi-website
python3 -m http.server 8000
```

Then open `http://localhost:8000/research.html`. Once the site is live on GitHub Pages the
problem disappears, because the page is served from a real https domain.

The pages already do their part. Each iframe carries
`referrerpolicy="strict-origin-when-cross-origin"`, which is what YouTube asks for, and
`research.html` sets the same policy in a meta tag.

If a particular embed still refuses to play, download your own video from YouTube and self-host
it instead. Put the file in `videos/` and swap the `<iframe>` block for a `<video>` block,
copying the pattern already used by the outdoor robot project. A self-hosted file never depends
on YouTube's embed rules.

### 3.4 File layout

Everything is already in the right folders. Unzip, then start the preview server from inside
the unzipped folder, the one that contains `index.html`:

```bash
cd manas-juvvi-website
python3 -m http.server 8000
```

If the page ever shows plain black text with no styling, the server is running from the wrong
folder or `assets/css/style.css` is missing.

---

## 4. Create the GitHub repository

### 4.1 Sign up

Go to [github.com](https://github.com) and create a free account if you do not have one.

**Choose your username carefully**. It becomes your web address. Something like `manas-juvvi`
gives you `manas-juvvi.github.io`. Something professional and close to your real name is worth the
thirty seconds of thought.

### 4.2 Create the repository

Click **+** (top right) → **New repository**.

| Field | What to enter |
| --- | --- |
| Repository name | `YOUR-USERNAME.github.io`, exactly your username, lowercase, then `.github.io` |
| Description | Optional |
| Visibility | **Public** (Pages on a private repo requires a paid plan) |
| Initialize with README | Leave unticked |

Click **Create repository**.

**Why this name?** A repository named `username.github.io` is treated as your personal site and
is served at `https://username.github.io/`. Any other name gets served from a subpath instead
(`https://username.github.io/repo-name/`), which is fine but produces a longer, uglier URL. You
get one personal site per account.

---

## 5. Upload the files

Two routes. The first needs no software; the second is better once you are updating regularly.

### Route A (drag and drop in the browser)

1. On your new empty repository page, click **uploading an existing file**.
2. Open your `portfolio` folder on your computer. Select **the contents**, not the folder
   itself, meaning `index.html`, the other HTML files, and the `assets` folder.
3. Drag them into the browser window. Wait for every file to finish uploading.
4. In the "Commit changes" box, type something like `Initial site`.
5. Click **Commit changes**.

Two things the browser upload will silently skip:

- **`.nojekyll`**. Files starting with a dot are hidden on macOS and Linux. Create it directly on
  GitHub instead: **Add file → Create new file**, name it `.nojekyll`, leave it empty, commit.
- **Empty folders**. Git does not track them, but every folder here has files in it, so this
  will not bite you.

### Route B (Git on the command line)

Install [Git](https://git-scm.com/downloads) if you do not have it, then:

```bash
cd path/to/portfolio

git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
git push -u origin main
```

GitHub will ask you to authenticate. On the command line it wants a
**personal access token**, not your account password: GitHub → **Settings** → **Developer
settings** → **Personal access tokens** → **Tokens (classic)** → **Generate new token**, tick the
`repo` scope, and paste the token when prompted for a password. Save it somewhere safe.
It is shown only once.

---

## 6. Turn on GitHub Pages

1. In your repository, click **Settings** (top row, right side).
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Under **Branch**, select **main** and folder **/ (root)**.
5. Click **Save**.

A banner appears with your URL. The first build usually finishes in one or two minutes, but it
can take up to ten. Watch progress under the **Actions** tab. A green tick means it published.

---

## 7. Check it works

Open `https://YOUR-USERNAME.github.io` and go through this list:

- [ ] Home page loads **with styling**. Unstyled text means the CSS did not load. See §10.
- [ ] Every nav link works: Home, Research, Publications, Experience, Contact, CV.
- [ ] The Scholar, GitHub, LinkedIn, IEEE Xplore and video links open the right pages.
- [ ] The CV link opens your actual CV, not the placeholder.
- [ ] Your photo and project figures appear.
- [ ] The email link opens a mail window with the right address.
- [ ] Project figures appear, and clicking one opens it full size.
- [ ] It looks right on a phone. Open it on your actual phone, not just a narrow browser window.
- [ ] Search the live page for the word "placeholder" (`Ctrl/Cmd + F`). There should be none left.
- [ ] The address bar shows a padlock. If not, tick **Enforce HTTPS** in Settings → Pages.
- [ ] Visit `https://YOUR-USERNAME.github.io/nonsense`. You should get the styled 404 page.

---

## 8. Updating the site later

**In the browser:** open the file in your repository, click the pencil icon, edit, and click
**Commit changes**. Fine for fixing a typo or adding a news item.

**On the command line:**

```bash
git add .
git commit -m "Add ICRA paper"
git push
```

Either way the site rebuilds automatically, usually within a minute. If you do not see your
change, it is almost always browser cache. Hard refresh with `Ctrl+F5` (Windows) or
`Cmd+Shift+R` (Mac).

---

## 9. Optional: your own domain name

`yourname.com` costs roughly €10–15 a year from a registrar such as Namecheap, Cloudflare,
Porkbun, or Gandi. GitHub Pages will serve it for free, with a free certificate.

### 9.1 Tell GitHub about the domain first

Settings → Pages → **Custom domain** → type your domain → **Save**. Do this *before* touching
DNS: configuring DNS to point at GitHub without claiming the domain in your repository first
can let someone else host a site on it.

While you are there, consider verifying the domain under your account settings
(**Settings → Pages → Verified domains**), which adds a TXT record and protects against takeover.

### 9.2 Add the DNS records at your registrar

**For an apex domain** (`yourname.com`). Four A records, all with host/name `@`:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

And, for IPv6, four AAAA records, also with host `@`:

```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

**For a subdomain** (`www.yourname.com`). A single CNAME record:

| Type | Host | Value |
| --- | --- | --- |
| CNAME | `www` | `YOUR-USERNAME.github.io` |

If your registrar created a default parking record, delete it first. Avoid wildcard records
(`*.yourname.com`). They expose you to subdomain takeover.

### 9.3 Wait, then enforce HTTPS

DNS changes usually propagate within an hour but can take up to 24. Check with:

```bash
dig yourname.com +noall +answer -t A
```

Once the four GitHub addresses come back, return to Settings → Pages and tick
**Enforce HTTPS**. The certificate is issued automatically; if the tickbox is greyed out, DNS has
not fully propagated yet. Wait and come back.

Keep the `username.github.io` address in mind: it keeps working, so old links do not break.

---

## 10. Troubleshooting

**The page loads but has no styling.**
Almost always a path or capitalisation problem. GitHub's servers are case-sensitive; Windows and
macOS are not, so a link that worked locally can 404 online. Check that the folder really is
`assets/css/style.css`, all lowercase, and that you uploaded the *contents* of the portfolio
folder rather than the folder itself. If your repository shows `portfolio/index.html` instead of
`index.html` at the top level, that is the problem. Move the files up a level.

**404 on the whole site.**
Give it ten minutes; first builds are slow. Then confirm: the repository is **public**, there is
an `index.html` in the **root**, and Settings → Pages shows branch `main` and folder `/ (root)`.

**Changes are not showing.**
Hard refresh (`Ctrl+F5` / `Cmd+Shift+R`), or open the site in a private window. Check the
**Actions** tab for a failed build.

**The CV link 404s.**
The file must be at `assets/cv/cv.pdf`, exactly that path and lowercase. Check it uploaded.
Git ignores nothing here by default, but some editors add a `.gitignore` that excludes PDFs.

**Fonts look wrong.**
The site pulls Newsreader, IBM Plex Sans, and IBM Plex Mono from Google Fonts. If you are on a
network that blocks it, you will see fallback fonts. To remove the external dependency entirely,
download the font files, put them in `assets/fonts/`, and swap the `<link>` in each HTML file for
a local `@font-face` block.

**Someone says the contact form does not work.**
There is no form. The contact page uses a `mailto:` link. GitHub Pages serves static files only
and cannot process form submissions. If you want a real form, use a third-party service such as
Formspree or Getform, which give you an endpoint to point a form at.

**What is `.nojekyll` for?**
By default GitHub runs your files through Jekyll, a site generator that ignores files and folders
whose names start with an underscore. This site does not use any, but the empty `.nojekyll` file
skips that step entirely. It makes builds faster and removes a class of confusing bugs.

---

## 11. Costs and limits

Free, for public repositories on a free GitHub account. GitHub Pages is available on public
repositories with GitHub Free, and on private repositories only with a paid plan.

The published limits are generous for a portfolio: sites should stay under 1 GB, with a soft
bandwidth limit of 100 GB per month and roughly 10 builds per hour. A site like this one is a
few hundred kilobytes. You will not get close.

GitHub Pages is intended for personal, project, and organisation sites, and not for running a
business or a web store. A portfolio is squarely within its intended use.

---

## 12. Design notes

Useful if you want to adjust things. Every colour lives in one `:root` block at the top of
`assets/css/style.css`. Change a value there and it updates everywhere.

**Palette**. Blue-led, with red and gold used sparingly as accents rather than decoration:

| Variable | Hex | Where it is used |
| --- | --- | --- |
| `--ink` | `#0E1B2A` | Body text, headings |
| `--blue` | `#0F4C91` | Links, eyebrow labels, active nav, timeline dots |
| `--navy` | `#0A2A4F` | The step-response band behind the hero |
| `--red` | `#AE3A2C` | Current-position marker, overshoot peak. Two appearances, deliberately |
| `--amber` | `#B8860F` | The reference signal, the ±2% band, "open to" callout, award badges |
| `--paper` | `#FBFBF9` | Page background |
| `--surface` | `#F3F6F9` | Alternating section bands |

The reason it holds together at formal register: the blues carry everything structural, and the
two warm colours only ever appear on something that means something, such as a live position, an award,
an availability note or a setpoint. Nothing is coloured for the sake of it.

**Type**. Three faces, one job each:

- **Newsreader** for the name and section headings. A screen-first serif with the feel of a
  journal masthead, without the fashion-magazine contrast of the usual display serifs.
- **IBM Plex Sans** for body text. Drawn for an engineering company, and it stays readable at
  small sizes where Helvetica-alikes go muddy.
- **IBM Plex Mono** for anything that is data: dates, venues, tags, axis labels, file paths.
  Monospace here is a signal, not a style. If it is set in mono, it is a measurement.

**The step-response band.** The graphic under the hero is a real second-order closed-loop step
response, ζ = 0.35, ωₙ = 1.7 rad/s, drawn from the actual expression rather than a decorative
squiggle. The labels mark genuine quantities: overshoot at the peak, the settling time, the ±2%
band around the reference. It is the one place the design raises its voice, which is why
everything else stays quiet. If you would rather it matched your own work, replace the `d`
attribute of `.plot-curve` in `index.html` with a path exported from your own data, and update
the ζ and ωₙ in the caption to match.

**How it scales.** The layout is driven by the content, not by device names. Five breakpoints:
the hero splits into two columns above 1024 px; project figures sit beside their text above
860 px; the navigation collapses to a menu button below 780 px; everything goes single-column
below 600 px; and below 420 px the type and spacing tighten a little further. The step-response
band drops its fine annotations on a phone (the overshoot marker and settling time would render
two pixels tall) but keeps the curve, the reference step, and both signal labels. Every page was
checked for sideways scroll from 320 px to 1440 px.

**One more thing worth doing.** Once the site is live, add the URL to your GitHub profile, your
LinkedIn, your email signature, and the header of your CV. A portfolio nobody links to is a
portfolio nobody reads.
