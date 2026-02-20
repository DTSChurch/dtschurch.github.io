# dtschurch.github.io

DTS development documentation site (GitHub Pages).

## Current sections

- `index.html` - DTS docs landing page
- `serve-system/` - Serve System documentation portal
- `serve-system/reference/` - mirrored source docs from `../serve-system`

## Local preview

From this repository root:

```bash
cd dtschurch.github.io
python3 -m http.server 8080
```

Open: `http://localhost:8080`

## Keeping Serve docs in sync

When `serve-system` docs are updated, sync reference files:

```bash
cp ../serve-system/README.md serve-system/reference/README.md
cp ../serve-system/docs/TPCC_ServeSystem_Email_Documentation.md serve-system/reference/
cp ../serve-system/docs/TPCC_ServeSystem_ConnectionRequest_Documentation.md serve-system/reference/
```

Then update HTML summary pages in `serve-system/*.html` if behavior changed.
