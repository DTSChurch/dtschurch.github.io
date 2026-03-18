# dtschurch.github.io

DTS development documentation site (GitHub Pages).

## Current projects

- `projects/serve-system/` - Serve System documentation portal
- `projects/mailgun-toolbox/` - Mailgun Toolbox documentation portal
- `projects/mobile-app-settings/` - Mobile App Settings documentation portal

## Project catalog

All project metadata lives in a single file: `assets/catalog.js`. This drives the site navigation, the Browse All Projects page, search, and the homepage featured cards.

Each catalog entry has visibility flags:

| Flag | Controls |
|------|----------|
| `showInNav` | Topbar Projects dropdown |
| `showInCatalog` | Browse All Projects page |
| `searchable` | Included in catalog search |
| `featured` | Homepage feature card |
| `quickLinks` | Homepage quick links |

To add a new project, add one entry to `assets/catalog.js`.

## Local preview

From this repository root:

```bash
python3 -m http.server 8080
```

Open: `http://localhost:8080`

## Keeping docs in sync

When source project documentation is updated, update the published HTML pages directly.

For Serve System, the source material typically comes from `../serve-system/README.md` and
`../serve-system/docs/*.md`, but the site now publishes curated HTML pages instead of a
mirrored `reference/` library. Fold changes into the appropriate page in
`projects/serve-system/` and preview locally before committing.
