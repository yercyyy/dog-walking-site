// Mobile menu, photo viewer, and the contact form.
// The form opens the visitor's email app. It does not send mail by itself.
const CONTACT_EMAIL = "njahshaun@gmail.com";

(function () {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const label = toggle ? toggle.querySelector(".nav-toggle-label") : null;

  function closeMenu() {
    if (!header || !toggle) return;
    header.classList.remove("is-open");
    document.body.classList.remove("nav-lock");
    toggle.setAttribute("aria-expanded", "false");
    if (label) label.textContent = "Open menu";
  }

  function openMenu() {
    header.classList.add("is-open");
    document.body.classList.add("nav-lock");
    toggle.setAttribute("aria-expanded", "true");
    if (label) label.textContent = "Close menu";
  }

  if (header && toggle) {
    toggle.addEventListener("click", function () {
      if (header.classList.contains("is-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    header.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("click", function (event) {
      if (!header.classList.contains("is-open")) return;
      if (header.contains(event.target)) return;
      closeMenu();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });
  }

  const dialog = document.querySelector("#photo-dialog");
  const dialogImg = document.querySelector("#photo-dialog-img");
  const dialogTitle = document.querySelector("#photo-dialog-title");
  const dialogClose = document.querySelector("#photo-dialog-close");

  if (dialog && dialogImg && dialogTitle) {
    document.querySelectorAll(".gallery-open").forEach(function (button) {
      button.addEventListener("click", function () {
        const img = button.querySelector("img");
        dialogImg.src = img.getAttribute("src");
        dialogImg.alt = img.alt;
        dialogTitle.textContent = button.getAttribute("data-caption") || img.alt;
        if (typeof dialog.showModal === "function" && !dialog.open) {
          dialog.showModal();
        }
      });
    });

    if (dialogClose) {
      dialogClose.addEventListener("click", function () {
        dialog.close();
      });
    }

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });
  }

  const callSheet = document.querySelector("#call-sheet");
  const callCancel = document.querySelector("#call-sheet-cancel");

  if (callSheet && typeof callSheet.showModal === "function") {
    let opener = null;
    let closing = false;

    function motionReduced() {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    function openCallSheet(row) {
      if (callSheet.open || closing) return;
      opener = row;
      callSheet.showModal();
      const callLink = callSheet.querySelector(".call-sheet-call");
      if (motionReduced()) {
        callSheet.classList.add("is-shown");
        if (callLink) callLink.focus();
        return;
      }
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          if (!callSheet.open) return;
          callSheet.classList.add("is-shown");
          if (callLink) callLink.focus();
        });
      });
    }

    function finishClose() {
      closing = false;
      callSheet.classList.remove("is-shown");
      if (callSheet.open) callSheet.close();
    }

    function closeCallSheet() {
      if (!callSheet.open || closing) return;
      if (motionReduced() || !callSheet.classList.contains("is-shown")) {
        finishClose();
        return;
      }
      closing = true;
      callSheet.classList.remove("is-shown");
      const stack = callSheet.querySelector(".call-sheet-stack");
      let settled = false;
      function done(event) {
        if (settled) return;
        if (event && event.target !== stack) return;
        if (event && event.propertyName !== "transform") return;
        settled = true;
        if (stack) stack.removeEventListener("transitionend", done);
        finishClose();
      }
      if (stack) stack.addEventListener("transitionend", done);
      window.setTimeout(function () {
        if (settled) return;
        settled = true;
        if (stack) stack.removeEventListener("transitionend", done);
        finishClose();
      }, 450);
    }

    document.querySelectorAll("#services .price-row").forEach(function (row) {
      row.setAttribute("role", "button");
      row.setAttribute("tabindex", "0");
      row.setAttribute("aria-haspopup", "dialog");
      row.addEventListener("click", function () { openCallSheet(row); });
      row.addEventListener("keydown", function (event) {
        if (event.target !== row) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openCallSheet(row);
        }
      });
    });

    const callLink = callSheet.querySelector(".call-sheet-call");
    if (callLink) {
      callLink.addEventListener("click", function () {
        closeCallSheet();
      });
    }

    if (callCancel) {
      callCancel.addEventListener("click", function () {
        closeCallSheet();
      });
    }

    callSheet.addEventListener("click", function (event) {
      if (event.target === callSheet) closeCallSheet();
    });

    callSheet.addEventListener("cancel", function (event) {
      event.preventDefault();
      closeCallSheet();
    });

    callSheet.addEventListener("close", function () {
      closing = false;
      callSheet.classList.remove("is-shown");
      if (opener) opener.focus();
      opener = null;
    });
  }

  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");
  if (!form || !status) return;

  const fields = [
    {
      id: "name",
      message: "Please add your name.",
      check: function (value) { return value.trim() !== ""; }
    },
    {
      id: "email",
      message: "Please add a valid email address.",
      check: function (value) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()); }
    },
    {
      id: "service",
      message: "Please choose a service.",
      check: function (value) { return value.trim() !== ""; }
    },
    {
      id: "message",
      message: "Please write a short message (at least 10 characters).",
      check: function (value) { return value.trim().length >= 10; }
    }
  ];

  function showError(input, message) {
    const error = document.getElementById(input.id + "-error");
    input.setAttribute("aria-invalid", "true");
    if (!error) return;
    error.hidden = false;
    error.textContent = message;
  }

  function clearError(input) {
    const error = document.getElementById(input.id + "-error");
    input.removeAttribute("aria-invalid");
    if (!error) return;
    error.hidden = true;
    error.textContent = "";
  }

  fields.forEach(function (field) {
    const input = document.getElementById(field.id);
    if (!input) return;
    input.addEventListener("input", function () { clearError(input); });
    input.addEventListener("change", function () { clearError(input); });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let firstInvalid = null;

    fields.forEach(function (field) {
      const input = document.getElementById(field.id);
      const ok = field.check(input.value);
      if (!ok) {
        showError(input, field.message);
        if (!firstInvalid) firstInvalid = input;
      } else {
        clearError(input);
      }
    });

    if (firstInvalid) {
      status.className = "form-status is-visible is-error";
      status.textContent = "Please fix the highlighted fields. Nothing was sent.";
      firstInvalid.focus();
      return;
    }

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("visitor-phone").value.trim();
    const dog = document.getElementById("dog").value.trim();
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value.trim();
    const body = [
      "Name: " + name,
      "Email: " + email,
      "Phone: " + (phone || "(not given)"),
      "Dog: " + (dog || "(not given)"),
      "Service: " + service,
      "",
      message
    ].join("\n");

    status.className = "form-status is-visible";
    status.textContent = "Opening your email app with this message to " + CONTACT_EMAIL + ".";
    window.location.href = "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent("Dog walk request from " + name) + "&body=" + encodeURIComponent(body);
  });
})();

(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var nodes = document.querySelectorAll(
    ".section-head, .about-copy, .about-card, .price-list, .area-panel, .gallery-card, .contact-card, .form-card, .contact-layout > div:first-child"
  );

  if (!reduce) {
    var view = window.innerHeight * 0.92;
    nodes.forEach(function (el, index) {
      var top = el.getBoundingClientRect().top;
      if (top < view) {
        el.classList.add("reveal", "is-in");
        return;
      }
      el.style.setProperty("--reveal-delay", (index % 3) * 70 + "ms");
      el.classList.add("reveal");
      el.addEventListener("focusin", function () {
        el.classList.add("is-in");
      });
    });

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px 8% 0px" });

      nodes.forEach(function (el) {
        if (!el.classList.contains("is-in")) observer.observe(el);
      });
    } else {
      nodes.forEach(function (el) { el.classList.add("is-in"); });
    }
  }

  var frame = document.querySelector(".hero-frame");
  var allowParallax = frame && window.matchMedia("(min-width: 900px)").matches && !reduce;
  if (!allowParallax) return;

  var ticking = false;
  function paintParallax() {
    ticking = false;
    var shift = Math.min(window.scrollY, 640) * 0.05;
    frame.style.transform = "translate3d(0," + shift.toFixed(1) + "px,0)";
  }

  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(paintParallax);
  }, { passive: true });
})();
