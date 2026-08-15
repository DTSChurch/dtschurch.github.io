/**
 * DTS Dev Docs — Project Catalog (Data Only)
 *
 * Single source of truth for ALL project data across the site.
 * To add a project, add an entry to the CATALOG array below.
 *
 * Every page loads this file before nav.js and site.js.
 * Consumers (nav, catalog page, homepage) read window.DTS_CATALOG
 * and filter by the visibility flags.
 *
 * Visibility flags per entry:
 *   showInNav     — appears in the topbar Projects dropdown
 *   showInCatalog — appears on the Browse All Projects page
 *   searchable    — included in catalog search matching
 *   featured      — appears as a card on the homepage
 *   quickLinks    — homepage quick-link entries (optional array)
 */
window.DTS_CATALOG = [
  {
    name: "Serve System",
    href: "/projects/serve-system/",
    group: "Rock Plugins",
    desc: "Volunteer opportunity management, role scheduling, self-service sign-up, notification workflows, and release runbooks for Rock RMS.",
    badges: ["Custom Plugin", "Obsidian", "Special Occasions"],
    showInNav: true,
    showInCatalog: true,
    searchable: true,
    featured: true,
    quickLinks: [
      { page: "Overview & Architecture", href: "/projects/serve-system/" },
      { page: "Lava Filters", href: "/projects/serve-system/lava-filters.html" },
      { page: "Email Workflows", href: "/projects/serve-system/email-system.html" },
      { page: "Connection Requests", href: "/projects/serve-system/connection-requests.html" },
      { page: "Shift Times & Expirations", href: "/projects/serve-system/shift-times.html" }
    ]
  },
  {
    name: "Appointment System",
    href: "/projects/appointment-system/",
    group: "Rock Plugins",
    desc: "Appointment booking, scheduling, and management plugin for Rock RMS. Supports customizable Lava templates, multi-campus filtering, and Obsidian blocks.",
    badges: ["Custom Plugin", "Obsidian", "Lava Templates"],
    showInNav: true,
    showInCatalog: true,
    searchable: true,
    featured: true,
    quickLinks: [
      { page: "Overview & Architecture", href: "/projects/appointment-system/" },
      { page: "Book Appointment Block", href: "/projects/appointment-system/book-appointment.html" },
      { page: "Lava Templates", href: "/projects/appointment-system/lava-templates.html" },
      { page: "Lava Filters", href: "/projects/appointment-system/lava-filters.html" },
      { page: "Block Settings", href: "/projects/appointment-system/block-settings.html" }
    ]
  },
  {
    name: "Rock Records",
    href: "/projects/rock-records/",
    group: "Rock Plugins",
    desc: "Typed records, custom attributes, entity associations, Lava templates, PDF reporting, and workflow automation for Rock RMS.",
    badges: ["Custom Plugin", "Obsidian", "Workflow Actions"],
    showInNav: true,
    showInCatalog: true,
    searchable: true,
    featured: true,
    quickLinks: [
      { page: "Overview & Architecture", href: "/projects/rock-records/" },
      { page: "Configuration", href: "/projects/rock-records/configuration.html" },
      { page: "Administration", href: "/projects/rock-records/administration.html" },
      { page: "Templates & Reporting", href: "/projects/rock-records/templates-reporting.html" },
      { page: "Automation & Integrations", href: "/projects/rock-records/automation-integrations.html" }
    ]
  },
  {
    name: "Planning Center Sync",
    href: "/projects/pco-sync/",
    group: "Rock Plugins",
    desc: "One-way sync from Planning Center Online into Rock RMS — People, Groups, Service Teams, and Campuses. Scheduled job, mapping editor, and per-run history.",
    badges: ["Custom Plugin", "Obsidian", "Scheduled Job"],
    showInNav: true,
    showInCatalog: true,
    searchable: true,
    featured: true,
    quickLinks: [
      { page: "Overview & Architecture", href: "/projects/pco-sync/" },
      { page: "Blocks", href: "/projects/pco-sync/blocks.html" },
      { page: "Sync Job", href: "/projects/pco-sync/sync-job.html" },
      { page: "Data Model", href: "/projects/pco-sync/data-model.html" }
    ]
  },
  {
    name: "Overflow Gateway",
    href: "/projects/overflow-gateway/",
    group: "Rock Plugins",
    desc: "Integrates the Overflow giving platform (crypto, stock, and DAF donations) with Rock RMS. A financial gateway plus a scheduled job that syncs donors, recurring gifts, and contributions into Rock.",
    badges: ["Custom Plugin", "Financial Gateway", "Scheduled Job"],
    showInNav: true,
    showInCatalog: true,
    searchable: true,
    featured: true,
    quickLinks: [
      { page: "Overview & Architecture", href: "/projects/overflow-gateway/" },
      { page: "Installation", href: "/projects/overflow-gateway/installation.html" },
      { page: "Setup Guide", href: "/projects/overflow-gateway/setup.html" },
      { page: "How the Sync Works", href: "/projects/overflow-gateway/sync-job.html" },
      { page: "Troubleshooting", href: "/projects/overflow-gateway/troubleshooting.html" }
    ]
  },
  {
    name: "Mailgun Toolbox",
    href: "/projects/mailgun-toolbox/",
    group: "Rock Plugins",
    desc: "Mailgun email monitoring dashboard. Track delivery health, manage bounces and complaints, and drill into failure details.",
    badges: ["RockShop"],
    showInNav: false,
    showInCatalog: false,
    searchable: false,
    featured: false,
    quickLinks: [
      { page: "Overview & Dashboard", href: "/projects/mailgun-toolbox/" },
      { page: "Setup Guide", href: "/projects/mailgun-toolbox/setup.html" },
      { page: "Troubleshooting", href: "/projects/mailgun-toolbox/troubleshooting.html" }
    ]
  },
  {
    name: "Mobile App Settings",
    href: "/projects/mobile-app-settings/",
    group: "Rock Plugins",
    desc: "Dynamic, hierarchical settings management for mobile applications. Manage titles, feature flags, and configuration values through a Rock admin dashboard.",
    badges: ["Custom Plugin", "Obsidian", "Lava Filter"],
    showInNav: false,
    showInCatalog: false,
    searchable: false,
    featured: false,
    quickLinks: [
      { page: "Overview & Setup", href: "/projects/mobile-app-settings/" },
      { page: "Lava Filter Usage", href: "/projects/mobile-app-settings/setup.html#lava" }
    ]
  }
];
