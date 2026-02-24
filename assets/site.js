(function () {
  // ── Docs sidebar active-link highlighting ───────────────────
  var links = document.querySelectorAll(".docs-nav a");
  var path = window.location.pathname;

  links.forEach(function (link) {
    var href = link.getAttribute("href");
    if (!href) return;

    var normalizedHref = href.replace(/index\.html$/, "");
    var normalizedPath = path.replace(/index\.html$/, "");

    if (
      normalizedPath.endsWith(normalizedHref) ||
      (normalizedHref === "./" && /\/$/.test(normalizedPath))
    ) {
      link.classList.add("is-active", "active");
    }
  });

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
