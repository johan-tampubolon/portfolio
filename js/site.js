(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setOpen(acc, open) {
    var btn = acc.querySelector(".acc-btn");
    var icon = acc.querySelector(".acc-icon");
    if (!btn) return;
    acc.classList.toggle("is-collapsed", !open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    if (icon) icon.textContent = open ? "\u2212" : "+";
  }

  function accordionFromHash() {
    var id = decodeURIComponent((location.hash || "").replace(/^#/, ""));
    if (!id) return null;
    var el = document.getElementById(id);
    if (!el || !el.classList.contains("acc")) return null;
    return el;
  }

  function openHash() {
    var row = accordionFromHash();
    if (!row) return false;
    document.querySelectorAll(".acc").forEach(function (acc) {
      setOpen(acc, acc === row);
    });
    row.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    var btn = row.querySelector(".acc-btn");
    if (btn) btn.focus({ preventScroll: true });
    return true;
  }

  function cameFromProject() {
    try {
      var url = new URL(document.referrer);
      return /\/grab\/.+/.test(url.pathname);
    } catch (err) {
      return false;
    }
  }

  document.querySelectorAll(".acc").forEach(function (acc) {
    var btn = acc.querySelector(".acc-btn");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      setOpen(acc, !open);
    });
  });

  if (document.body.dataset.page === "grab") {
    document.querySelectorAll("[data-save-place]").forEach(function (link) {
      link.addEventListener("click", function () {
        var open = [];
        document.querySelectorAll(".acc").forEach(function (acc) {
          var b = acc.querySelector(".acc-btn");
          if (b && b.getAttribute("aria-expanded") === "true") open.push(acc.id);
        });
        try {
          sessionStorage.setItem(
            "jt-grab-state",
            JSON.stringify({ y: window.scrollY, open: open })
          );
          sessionStorage.setItem("jt-grab-restore", "1");
        } catch (err) {}
      });
    });
  }

  function restoreGrab() {
    if (document.body.dataset.page !== "grab") return false;
    var flag = null;
    try {
      flag = sessionStorage.getItem("jt-grab-restore");
    } catch (err) {
      return false;
    }
    if (flag !== "1" || location.hash) return false;
    var navs = performance.getEntriesByType && performance.getEntriesByType("navigation");
    var back = navs && navs[0] && navs[0].type === "back_forward";
    if (!back && !cameFromProject()) {
      try { sessionStorage.removeItem("jt-grab-restore"); } catch (err) {}
      return false;
    }
    var raw = null;
    try {
      raw = sessionStorage.getItem("jt-grab-state");
      sessionStorage.removeItem("jt-grab-restore");
    } catch (err) {}
    if (!raw) return false;
    var data;
    try { data = JSON.parse(raw); } catch (err) { return false; }
    var ids = data.open || [];
    document.querySelectorAll(".acc").forEach(function (acc) {
      setOpen(acc, ids.indexOf(acc.id) !== -1);
    });
    if (typeof data.y === "number") {
      window.scrollTo(0, data.y);
    }
    return true;
  }

  function onArrive() {
    if (location.hash && accordionFromHash()) {
      try { sessionStorage.removeItem("jt-grab-restore"); } catch (err) {}
      openHash();
      return;
    }
    restoreGrab();
  }

  var nav = document.querySelector(".nav");
  var menuBtn = document.querySelector(".menu-btn");
  if (nav && menuBtn) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.textContent = open ? "Close" : "Menu";
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.textContent = "Menu";
        menuBtn.focus();
      }
    });
    nav.querySelectorAll(".nav-links a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.textContent = "Menu";
      });
    });
  }

  window.addEventListener("hashchange", function () {
    openHash();
  });

  onArrive();
})();
