/**
 * DTS Dev Docs — Shared Navigation & Project Catalog
 *
 * Single source of truth for the site topbar AND the project catalog.
 * To add a project, add an entry to the PROJECTS array below.
 * Every page that includes this script gets the nav automatically.
 * The catalog page reads window.DTS_CATALOG for search/filter.
 */
(function () {
  // ── Configuration ─────────────────────────────────────────────
  var BRAND_LOGO = "/assets/DTSLogo.png";
  var BRAND_TEXT = "Dev Docs";

  var PROJECTS = [
    {
      group: "Rock Plugins",
      items: [
        {
          name: "Serve System",
          href: "/projects/serve-system/",
          desc: "Volunteer opportunity management, role scheduling, self-service sign-up, notification workflows, and release runbooks for Rock RMS.",
          badges: ["Custom Plugin", "Obsidian", "Special Occasions"]
        },
        {
          name: "Mailgun Toolbox",
          href: "/projects/mailgun-toolbox/",
          desc: "Mailgun email monitoring dashboard. Track delivery health, manage bounces and complaints, and drill into failure details.",
          badges: ["RockShop"]
        },
        {
          name: "Mobile App Settings",
          href: "/projects/mobile-app-settings/",
          desc: "Dynamic, hierarchical settings management for mobile applications. Manage titles, feature flags, and configuration values through a Rock admin dashboard.",
          badges: ["Custom Plugin", "Obsidian", "Lava Filter"]
        }
      ]
    }
    // {
    //   group: "Workflows",
    //   items: [
    //     { name: "Example", href: "/example/", desc: "", badges: [] }
    //   ]
    // }
  ];

  // ── Expose flat catalog for the catalog page ──────────────────
  var catalog = [];
  PROJECTS.forEach(function (g) {
    g.items.forEach(function (item) {
      catalog.push({
        name: item.name,
        href: item.href,
        group: g.group,
        desc: item.desc || "",
        badges: item.badges || []
      });
    });
  });
  window.DTS_CATALOG = catalog;

  // ── Helpers ───────────────────────────────────────────────────
  function normalizePath(p) {
    return (p || "/").replace(/index\.html$/, "");
  }

  function isProjectActive(href) {
    var current = normalizePath(window.location.pathname);
    var target = normalizePath(href);
    return current === target || current.indexOf(target) === 0;
  }

  // ── Build the nav ─────────────────────────────────────────────
  function buildNav() {
    var target = document.getElementById("site-header");
    if (!target) return;

    var currentPath = normalizePath(window.location.pathname);
    var isHome = currentPath === "/" || currentPath === "";

    // Are we inside any project?
    var insideProject = PROJECTS.some(function (g) {
      return g.items.some(function (item) {
        return isProjectActive(item.href);
      });
    });

    // Dropdown groups markup
    var dropdownHTML = PROJECTS.map(function (group) {
      var items = group.items
        .map(function (item) {
          var active = isProjectActive(item.href);
          return (
            '<a href="' + item.href + '" class="dropdown-link' +
            (active ? " is-active" : "") +
            '">' + item.name + "</a>"
          );
        })
        .join("");

      return (
        '<div class="dropdown-group">' +
        '<span class="dropdown-label">' + group.group + "</span>" +
        items +
        "</div>"
      );
    }).join("");

    // Render
    target.className = "topbar";
    target.innerHTML =
      '<a class="brand" href="/"><img src="' + BRAND_LOGO + '" alt="DTS Church" class="brand-logo" /> ' + BRAND_TEXT + "</a>" +
      '<button class="menu-toggle" type="button" data-menu-toggle ' +
        'aria-expanded="false" aria-controls="site-nav">Menu</button>' +
      '<nav id="site-nav" class="site-nav" data-menu>' +
        '<div class="nav-dropdown">' +
          '<button type="button" class="nav-dropdown-toggle' +
            (insideProject ? " is-active" : "") +
          '" aria-expanded="false">' +
            "Projects " +
            '<span class="dropdown-arrow">\u25BE</span>' +
          "</button>" +
          '<div class="nav-dropdown-panel">' + dropdownHTML + "</div>" +
        "</div>" +
      "</nav>";

    // ── Dropdown interaction ──────────────────────────────────
    var toggle = target.querySelector(".nav-dropdown-toggle");
    var panel = target.querySelector(".nav-dropdown-panel");

    if (toggle && panel) {
      toggle.addEventListener("click", function (e) {
        e.stopPropagation();
        var open = panel.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });

      document.addEventListener("click", function (e) {
        if (!panel.contains(e.target) && e.target !== toggle) {
          panel.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });

      // Close on Escape
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          panel.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }

    // ── Mobile menu toggle ────────────────────────────────────
    var menuBtn = target.querySelector("[data-menu-toggle]");
    var menu = target.querySelector("[data-menu]");

    if (menuBtn && menu) {
      menuBtn.addEventListener("click", function () {
        var open = menu.classList.toggle("is-open");
        menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }
  }

  // ── Init ──────────────────────────────────────────────────────
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildNav);
  } else {
    buildNav();
  }
})();
