/**
 * DTS Dev Docs — Shared Navigation
 *
 * Single source of truth for the site topbar.
 * To add a project, add an entry to the PROJECTS array below.
 * Every page that includes this script gets the nav automatically.
 */
(function () {
  // ── Configuration ─────────────────────────────────────────────
  var BRAND_LOGO = "/assets/DTSLogo.png";
  var BRAND_TEXT = "Dev Docs";

  var PROJECTS = [
    {
      group: "Rock Plugins",
      items: [
        { name: "Serve System", href: "/serve-system/" },
        { name: "Mailgun Toolbox", href: "/mailgun-toolbox/" }
      ]
    }
    // {
    //   group: "Workflows",
    //   items: [
    //     { name: "Example", href: "/example/" }
    //   ]
    // }
  ];

  // ── Helpers ───────────────────────────────────────────────────

  /**
   * Calculate the relative path to the repository root.
   * Returns empty string if at root, "../" if one level deep, etc.
   */
  function getRepoRoot() {
    // For production (http/https), use absolute paths
    if (window.location.protocol !== "file:") {
      return "";
    }

    // For local file:// protocol, calculate relative path to repo root
    var path = window.location.pathname;

    // Count how many directories deep we are from the repo root
    // Remove the filename first
    var dir = path.substring(0, path.lastIndexOf('/'));

    // Find dtschurch.github.io in the path
    var repoIndex = dir.indexOf('/dtschurch.github.io');
    if (repoIndex === -1) {
      repoIndex = dir.indexOf('\\dtschurch.github.io');
    }

    if (repoIndex !== -1) {
      // Get the path after the repo name
      var pathAfterRepo = dir.substring(repoIndex + '/dtschurch.github.io'.length);
      // Count the directory levels
      var levels = pathAfterRepo.split('/').filter(function(p) { return p.length > 0; }).length;

      // Build relative path
      var prefix = "";
      for (var i = 0; i < levels; i++) {
        prefix += "../";
      }
      return prefix;
    }

    return "";
  }

  /**
   * Resolve a path for navigation links.
   * For file:// protocol, makes paths relative.
   * For http/https, keeps them absolute.
   */
  function resolvePath(path) {
    if (window.location.protocol === "file:") {
      var root = getRepoRoot();
      var resolved = root + path.replace(/^\//, "");
      // For home link, ensure we get index.html
      if (path === "/" || path === "") {
        return resolved + "index.html";
      }
      return resolved;
    }
    return path;
  }

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
            '<a href="' + resolvePath(item.href) + '" class="dropdown-link' +
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
      '<a class="brand" href="' + resolvePath("/") + '"><img src="' + resolvePath("/assets/DTSLogo.png") + '" alt="DTS Churchs" class="brand-logo" /> ' + BRAND_TEXT + "</a>" +
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
