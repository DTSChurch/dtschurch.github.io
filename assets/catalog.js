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
