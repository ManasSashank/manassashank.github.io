/* Mobile menu, scroll reveal, and figure lightbox. */
(function () {
  "use strict";
  var root = document.documentElement;

  // Mobile navigation
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close" : "Menu";
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "Menu";
        toggle.focus();
      }
    });
  }

  // Scroll reveal (hero elements animate via CSS on their own)
  var items = [].slice.call(document.querySelectorAll(".rise")).filter(function (el) {
    return !el.closest(".hero");
  });
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!("IntersectionObserver" in window) || reduce) {
    items.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });
    items.forEach(function (el) { io.observe(el); });
  }

  // Lightbox for project and publication figures
  var figures = document.querySelectorAll(".shot img, .pub__thumb img");
  if (!figures.length) return;
  var box = document.createElement("div");
  box.className = "lightbox";
  box.hidden = true;
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.innerHTML = '<button class="lightbox__close" type="button">Close</button>' +
                  '<img class="lightbox__img" alt=""><p class="lightbox__cap"></p>';
  document.body.appendChild(box);
  var bImg = box.querySelector(".lightbox__img");
  var bCap = box.querySelector(".lightbox__cap");
  var bClose = box.querySelector(".lightbox__close");
  var last = null;

  function openBox(img) {
    last = img;
    bImg.src = img.currentSrc || img.src;
    bImg.alt = img.alt;
    var fig = img.closest("figure");
    var fc = fig && fig.querySelector("figcaption");
    bCap.textContent = fc ? fc.textContent : img.alt;
    box.hidden = false;
    root.style.overflow = "hidden";
    bClose.focus();
  }
  function closeBox() {
    box.hidden = true;
    root.style.overflow = "";
    bImg.src = "";
    if (last) last.focus();
  }
  [].forEach.call(figures, function (img) {
    var shot = img.closest(".shot");
    if (shot) shot.classList.add("shot--zoom");
    img.tabIndex = 0;
    img.addEventListener("click", function () { openBox(img); });
    img.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openBox(img); }
    });
  });
  bClose.addEventListener("click", closeBox);
  box.addEventListener("click", function (e) { if (e.target === box) closeBox(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !box.hidden) closeBox();
  });
})();
