# Mailgun Toolbox — Setup Guide

## Installation

### Option A: Plugin File (Recommended)

1. In Rock, navigate to **Admin Tools > System Settings > Installed Plugins**.
2. Click **Upload Plugin** and select the `mailgun-toolbox-x.x.x.plugin` file.
3. Rock will install the DLL and Obsidian files automatically.
4. Restart Rock (or recycle the application pool) to load the new assembly.

### Option B: Manual Install

Copy the following files into your RockWeb directory:

| Source | Destination |
|--------|-------------|
| `com.dtschurch.ManagedMail/bin/Release/net472/com.dtschurch.ManagedMail.dll` | `RockWeb/Bin/` |
| `com.dtschurch.ManagedMail.Obsidian/dist/mailgunDomainStats.obs.js` | `RockWeb/Plugins/com_dtschurch/ManagedMail/` |

Restart Rock after copying the files. The plugin migrations will run automatically on startup.

## What the Plugin Creates

On first startup, the plugin migrations will automatically:

1. Register the **Mailgun Domain Stats** block type under **DTSChurch > Mail**.
2. Create two **Global Attributes**: `MailgunApiKey` and `MailgunDomain`.
3. Create a **Mailgun Toolbox** page under **Rock Shop / Installed Plugins** with the block already added.

After restarting Rock, you can navigate to the page at **Admin Tools > Installed Plugins > Mailgun Toolbox**.

## Configuration

### 1. Set the Mailgun API Key

1. Go to **Admin Tools > General Settings > Global Attributes**.
2. Find the attribute **Mailgun API Key** (added by the plugin migration).
3. Enter your Mailgun private API key (starts with `key-...` or is a hex string).
4. Click **Save**.

> Your API key can be found in the Mailgun dashboard under **Settings > API Keys**.

### 2. Set the Mailgun Domain

1. In the same **Global Attributes** page, find **Mailgun Domain**.
2. Enter the sending domain configured in Mailgun (e.g. `mg.yourchurch.com`).
3. Click **Save**.

### 3. Configure the Block (Optional)

Navigate to the **Mailgun Toolbox** page and click the block's settings icon to configure:

| Setting | Description | Default |
|---------|-------------|---------|
| **Default Date Range** | The date range filter applied when the page loads. Options: Current Month, Previous Month, Last 7 Days, Last 30 Days, Last 90 Days. | Current Month |

## Adding the Block to Other Pages

The block can also be added to any other page:

1. Navigate to the desired page and click the **Edit** icon (gear).
2. Add a new block and search for **Mailgun Domain Stats** (listed under **DTSChurch > Mail**).
3. Add it to the desired zone.

## Tabs Overview

### Overview

Summary rate cards (delivery %, open %, click %, bounce %) and totals for the selected date range. Includes line charts for daily email counts, failure rate, and engagement rates. Click the complained count to see individual complaint events.

### Details

Breakdown of permanent vs. temporary failures, a table of top error codes grouped by frequency, and the 25 most recent failed delivery events with recipient, subject, error details, and timestamps.

### Bounces

Paginated list of bounced email addresses from the Mailgun suppression list. Use the search box to look up a specific address. Delete individual bounces to allow re-delivery to that address.

### Historicals

Time-series table at hourly, daily, or monthly resolution. Click any non-zero failed count (hourly/daily) to drill down into the specific failure events for that time period.

## Mailgun API Requirements

The plugin uses the following Mailgun API v3 endpoints:

- `GET /v3/{domain}/stats/total` — Aggregate and time-series statistics
- `GET /v3/{domain}/bounces` — Bounce suppression list
- `GET /v3/{domain}/bounces/{address}` — Single bounce lookup
- `DELETE /v3/{domain}/bounces/{address}` — Remove a bounce
- `GET /v3/{domain}/events` — Event log (failures, complaints)
- `GET /v3/{domain}/complaints` — Complaint suppression list
- `DELETE /v3/{domain}/complaints/{address}` — Remove a complaint

Your API key needs read/write access to stats, bounces, events, and complaints.

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Block shows "Mailgun API key is not configured" | Set the **Mailgun API Key** global attribute (see step 1 above). |
| Block shows "Mailgun domain is not configured" | Set the **Mailgun Domain** global attribute (see step 2 above). |
| Stats return zeros | Verify the domain in the global attribute matches your Mailgun sending domain exactly. |
| Hourly resolution returns an error | Mailgun limits hourly data to short ranges. The plugin automatically clamps to 48 hours. If you still see errors, try a shorter date range. |
| Complained count doesn't match the clickable list | The stats count individual complaint events. If an address complained multiple times, each event is counted separately. |
| Failed count seems high | Mailgun tracks both permanent and temporary failures. The plugin reports only permanent failures (messages that could not be delivered). Temporary failures (retries) are excluded. |
