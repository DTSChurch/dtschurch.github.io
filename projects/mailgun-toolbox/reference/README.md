# Mailgun Toolbox for Rock RMS

A Rock RMS plugin that provides a Mailgun domain statistics dashboard. Monitor email delivery health, manage bounces and complaints, and drill into failure details — all from within Rock.

## Features

- **Overview Dashboard** — Delivery, open, click, and bounce rate cards with totals. Line charts for daily counts, failure rate, and engagement rates (open/click). Clickable complained count to see individual complaint events.
- **Details Tab** — Severity breakdown (permanent vs. temporary failures), top error codes with frequency counts, and the 25 most recent failed events.
- **Bounces Tab** — Paginated bounce list with search-by-email and per-row delete to remove addresses from the Mailgun suppression list.
- **Historicals Tab** — Hourly, daily, and monthly resolution tables. Click any non-zero failed count to drill down into the specific failure events for that time period.

A global date range filter (Current Month, Previous Month, Last 7/30/90 Days) applies across all tabs. The default range is configurable via a block attribute.

## Requirements

- Rock RMS v16.9 or later (Obsidian)
- A Mailgun account with API access

## Project Structure

```
com.dtschurch.ManagedMail/          # C# plugin (.NET Framework 4.7.2)
  Blocks/Mail/                      #   Obsidian block type
  Integration/                      #   Mailgun API client and models
  Migrations/                       #   Rock database migrations
  Constants/                        #   GUIDs and plugin info
  PluginGuid/                       #   Block/entity/attribute GUID references

com.dtschurch.ManagedMail.Obsidian/ # Vue 3 frontend (Obsidian)
  src/mailgunDomainStats.obs        #   Single-file component

plugin.json                         # Rock plugin packaging config
```

## Building

### C# Backend

```bash
dotnet build com.dtschurch.ManagedMail/com.dtschurch.ManagedMail.csproj -c Release
```

### Obsidian Frontend

```bash
cd com.dtschurch.ManagedMail.Obsidian
npm install
npm run build
```

## Packaging

Install the Rock dev tool (one-time):

```bash
dotnet tool install --global sparkdevnetwork.rock.devtool
```

Generate the `.plugin` file:

```bash
rock-dev-tool plugin pack
```

This produces `mailgun-toolbox-1.0.0.plugin` ready for installation through Rock's admin interface.

## Setup

See [SETUP.md](SETUP.md) for installation and configuration instructions.

## License

Proprietary. For use by DTSChurch.
