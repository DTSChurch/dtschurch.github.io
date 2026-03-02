# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a **static GitHub Pages documentation site** for DTS development documentation. It hosts reference documentation for Rock RMS plugins and systems, including the Serve System, Mailgun Toolbox, and Mobile App Settings.

The site is pure HTML/CSS/JavaScript with no build step required. It uses:
- Custom CSS with DTS Church design system
- Vanilla JavaScript for navigation and interactions
- Python's built-in HTTP server for local preview

## Local Development

### Preview the site locally

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

### Adding a new project to the site

1. Create a new directory for the project under `projects/` (e.g., `projects/new-project/`)
2. Add project documentation HTML files in that directory
3. Add a catalog entry in `assets/catalog.js`:
   ```javascript
   {
     name: "New Project",
     href: "/projects/new-project/",
     group: "Rock Plugins",
     desc: "Short description of the project.",
     badges: ["Custom Plugin"],
     showInNav: true,        // appear in topbar Projects dropdown
     showInCatalog: true,    // appear on Browse All Projects page
     searchable: true,       // included in catalog search matching
     featured: false,        // appear as a card on the homepage
     quickLinks: [           // homepage quick links (optional)
       { page: "Overview", href: "/projects/new-project/" }
     ]
   }
   ```
   This single entry controls the nav dropdown, catalog page, search, and homepage.

## Architecture

### Site Structure

```
dtschurch.github.io/
├── index.html                    # Landing page (dynamic from catalog)
├── projects.html                 # Browse All Projects (dynamic from catalog)
├── assets/
│   ├── catalog.js                # Project catalog data (single source of truth)
│   ├── nav.js                    # Shared navigation (reads catalog.js)
│   ├── site.js                   # Scroll reveal + sidebar active state
│   ├── styles.css                # Global styles (DTS design system)
│   ├── STYLE_GUIDE.md            # Complete design system reference
│   └── DTSLogo.png
├── projects/
│   ├── serve-system/
│   │   ├── index.html            # Serve System docs portal
│   │   ├── email-system.html     # Email workflow docs
│   │   ├── connection-requests.html  # Connection request docs
│   │   └── reference/            # Mirrored source docs from ../serve-system repo
│   ├── mailgun-toolbox/
│   │   ├── index.html            # Mailgun Toolbox docs portal
│   │   ├── setup.html            # Setup instructions
│   │   └── reference/            # Mirrored source docs from mailgun toolbox repo
│   └── mobile-app-settings/
│       ├── index.html            # Mobile App Settings docs portal
│       ├── installation.html     # Installation guide
│       ├── setup.html            # Setup & Lava filter usage
│       ├── troubleshooting.html  # Troubleshooting & support
│       ├── technical-guides.html # Architecture, block actions, data model
│       └── changelog.html        # Version history
└── CNAME                         # GitHub Pages custom domain
```

### JavaScript Architecture

**catalog.js** — Project catalog data
- Single source of truth for all project metadata
- Flat array exposed as `window.DTS_CATALOG`
- Each entry has visibility flags: `showInNav`, `showInCatalog`, `searchable`, `featured`
- Optional `quickLinks` array for homepage quick-link entries
- To add a project, add one entry here — no other files need to change
- Every page includes this via `<script src="../assets/catalog.js"></script>`

**nav.js** — Shared navigation component
- Reads `window.DTS_CATALOG` and filters by `showInNav` to build the topbar
- Auto-detects active project based on current URL
- Groups nav items by the `group` field from catalog entries
- Handles dropdown menu interactions and mobile menu
- Every page includes this via `<script src="../assets/nav.js"></script>`

**site.js** — Page interactions
- Sidebar active link highlighting for docs pages
- Scroll-triggered reveal animations using IntersectionObserver
- Every page includes this via `<script src="../assets/site.js"></script>`

**Script load order** — Every page must include scripts in this order:
```html
<script src="../assets/catalog.js"></script>
<script src="../assets/nav.js"></script>
<script src="../assets/site.js"></script>
```

### CSS Architecture

The site uses the **DTS Church Design System** defined in `assets/STYLE_GUIDE.md`. Key principles:

- **Colors**: Primary brand color is `--pixis-blue` (#2C4A6E)
- **Typography**: PP Agrandir (display/headings), Work Sans (body), Inter (UI/data)
- **Layout**: Max-width 1400px container, generous padding/spacing
- **Components**: Cards with subtle shadows, buttons with hover lifts, glass effects
- **Animations**: Fade-in-up on scroll, smooth hover transitions

**When modifying styles**, always reference `assets/STYLE_GUIDE.md` for colors, spacing, typography scales, shadows, and component patterns.

## Syncing Documentation from Source Repos

When Serve System or other project documentation is updated, sync the reference files:

```bash
# Example for Serve System
cp ../serve-system/README.md serve-system/reference/README.md
cp ../serve-system/docs/TPCC_ServeSystem_Email_Documentation.md serve-system/reference/
cp ../serve-system/docs/TPCC_ServeSystem_ConnectionRequest_Documentation.md serve-system/reference/
```

After syncing, update the corresponding HTML summary pages in the project directory if behavior changed.

## HTML Page Template

All documentation pages follow a consistent structure:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page Title | DTS Dev Docs</title>
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Work+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="../assets/styles.css" />
  </head>
  <body>
    <div class="site-bg" aria-hidden="true">
      <div class="glow glow-a"></div>
      <div class="glow glow-b"></div>
      <div class="grid-overlay"></div>
    </div>

    <header id="site-header"></header>

    <main class="page docs-shell">
      <aside class="docs-nav reveal">
        <h2>Section Name</h2>
        <a href="./">Overview</a>
        <!-- Additional nav links -->
      </aside>

      <div class="docs-main">
        <section class="panel reveal">
          <!-- Content here -->
        </section>
      </div>
    </main>

    <script src="../assets/catalog.js"></script>
    <script src="../assets/nav.js"></script>
    <script src="../assets/site.js"></script>
  </body>
</html>
```

### Key Classes

- `.page` — Main content wrapper
- `.docs-shell` — Two-column layout (sidebar + main content)
- `.docs-nav` — Sidebar navigation
- `.docs-main` — Main content area
- `.panel` — Content card/section
- `.reveal` — Elements that animate in on scroll
- `.eyebrow` — Small uppercase label
- `.btn-primary`, `.btn-ghost` — Button variants
- `.card`, `.feature-card` — Card layouts

## Design System Components

### Buttons

```html
<a class="btn btn-primary" href="#">Primary Action</a>
<a class="btn btn-ghost" href="#">Secondary Action</a>
```

### Cards

```html
<article class="card feature-card">
  <p class="card-kicker">Category</p>
  <h2>Card Title</h2>
  <p>Description text</p>
  <a class="text-link" href="#">Learn more</a>
</article>
```

### Code Blocks

```html
<pre><code>command goes here</code></pre>
```

### Tables

```html
<div class="table-wrap">
  <table>
    <thead>
      <tr><th>Column</th></tr>
    </thead>
    <tbody>
      <tr><td>Data</td></tr>
    </tbody>
  </table>
</div>
```

## Important Notes

- **No build process**: All HTML/CSS/JS is served directly
- **No JavaScript frameworks**: Pure vanilla JavaScript only
- **Mobile responsive**: All pages use responsive breakpoints (768px, 1024px)
- **GitHub Pages**: Deployed automatically on push to main branch
- **Custom domain**: Configured via CNAME file
- **Reference docs**: Markdown files in `reference/` directories are linked directly (GitHub renders them)

## Standard Documentation Sidebar

Every project documentation site should use this standard sidebar menu structure. This ensures a consistent experience across all DTS plugins and projects.

```
Project Name
  Intro                → index.html        (About, features, requirements)
  Installation         → installation.html  (Rock Shop install, manual install)
  Setup Guide          → setup.html         (Credentials, configuration, using the dashboard)
  Troubleshooting      → troubleshooting.html (Gotchas, issues, workarounds, support)
  Technical Guides     → technical-guides.html (Lava, SQL, internals, block actions)
  Changelog            → changelog.html     (Version history)
```

### Sidebar HTML (pages in project root)

```html
<aside class="docs-nav reveal">
  <h2>Project Name</h2>
  <a href="./">Intro</a>
  <a href="installation.html">Installation</a>
  <a href="setup.html">Setup Guide</a>
  <a href="troubleshooting.html">Troubleshooting</a>
  <a href="technical-guides.html">Technical Guides</a>
  <a href="changelog.html">Changelog</a>
</aside>
```

### Sidebar HTML (pages in subdirectories like `reference/`)

Use `../` prefix for links back to the parent project directory.

### Page content guidelines

| Page | Content |
|------|---------|
| **Intro** | What the plugin does, feature overview, requirements, getting started links |
| **Installation** | Rock Shop steps, manual install (collapsed), what the plugin creates on first run |
| **Setup Guide** | Transport/credential configuration, verify it works, dashboard tab walkthrough with screenshots |
| **Troubleshooting** | Common issues table, bounce rate guidance, how to get DTS support (GitHub Issues) |
| **Technical Guides** | Project structure, block actions, API endpoints, Lava examples, SQL queries, build instructions |
| **Changelog** | Version history with dates and change descriptions |

## Common Tasks

### Add a new project to the catalog
Edit `assets/catalog.js` and add an entry to the `DTS_CATALOG` array. Set the visibility flags to control where it appears (nav, catalog page, search, homepage).

### Update site navigation
The nav is driven by `assets/catalog.js`. Set `showInNav: true` on a catalog entry to include it in the Projects dropdown. The `group` field determines the dropdown section.

### Add a new documentation page
1. Copy an existing HTML file as a template
2. Update the sidebar navigation in `<aside class="docs-nav">`
3. Add content in `<div class="docs-main">` using `.panel` sections
4. Ensure `catalog.js`, `nav.js`, and `site.js` are included at the bottom (in that order)

### Modify styling
1. Reference `assets/STYLE_GUIDE.md` for design tokens
2. Edit `assets/styles.css`
3. Test locally with `python3 -m http.server 8080`

### Update project documentation
1. Copy updated markdown files from source repos to `reference/` directories
2. Update corresponding HTML summary pages if needed
3. Preview changes locally before committing
