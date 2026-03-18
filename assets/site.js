(function () {
  // ── Docs sidebar active-link highlighting ───────────────────
  var links = document.querySelectorAll(".docs-nav a");
  var path = window.location.pathname;

  links.forEach(function (link) {
    var href = link.getAttribute("href");
    if (!href || href.charAt(0) === "#") return;

    var normalizedHref = href.replace(/index\.html$/, "");
    var normalizedPath = path.replace(/index\.html$/, "");

    if (
      normalizedPath.endsWith(normalizedHref) ||
      (normalizedHref === "./" && /\/$/.test(normalizedPath))
    ) {
      link.classList.add("is-active", "active");
    }
  });

  // ── In-page docs navigation ─────────────────────────────────
  function slugify(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "section";
  }

  var tocRoot = document.querySelector("[data-page-toc]");
  var docsMain = document.querySelector(".docs-main");

  if (tocRoot && docsMain) {
    var panels = Array.prototype.slice
      .call(docsMain.children)
      .filter(function (node) {
        return node.classList && node.classList.contains("panel");
      });

    var usedIds = {};
    var tocEntries = panels
      .map(function (panel, index) {
        var heading = panel.querySelector("h1, h2");
        if (!heading) return null;

        var label = heading.tagName === "H1" ? "Overview" : heading.textContent.trim();
        var baseId = panel.id || slugify(heading.textContent.trim());
        var id = baseId;
        var suffix = 2;

        while (usedIds[id]) {
          id = baseId + "-" + suffix;
          suffix += 1;
        }

        usedIds[id] = true;
        panel.id = id;

        var link = document.createElement("a");
        link.href = "#" + id;
        link.textContent = label;

        tocRoot.appendChild(link);

        return {
          id: id,
          panel: panel,
          link: link,
          order: index
        };
      })
      .filter(Boolean);

    function setCurrentToc(id) {
      tocEntries.forEach(function (entry) {
        var isCurrent = entry.id === id;
        entry.link.classList.toggle("is-current", isCurrent);
        if (isCurrent) {
          entry.link.setAttribute("aria-current", "true");
        } else {
          entry.link.removeAttribute("aria-current");
        }
      });
    }

    function syncCurrentToc() {
      if (!tocEntries.length) return;

      var currentId = tocEntries[0].id;
      var offset = 150;

      tocEntries.forEach(function (entry) {
        if (entry.panel.getBoundingClientRect().top - offset <= 0) {
          currentId = entry.id;
        }
      });

      setCurrentToc(currentId);
    }

    syncCurrentToc();
    window.addEventListener("scroll", syncCurrentToc, { passive: true });
    window.addEventListener("hashchange", function () {
      var hashId = window.location.hash.replace(/^#/, "");
      if (hashId) {
        setCurrentToc(hashId);
      } else {
        syncCurrentToc();
      }
    });
  }

  // ── Scroll reveal ───────────────────────────────────────────
  var revealNodes = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    revealNodes.forEach(function (node) {
      observer.observe(node);
    });
  } else {
    revealNodes.forEach(function (node) {
      node.classList.add("reveal-show");
    });
  }
})();
