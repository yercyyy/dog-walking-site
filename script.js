// Mobile menu, photo viewer, price-card call sheet, and the contact form.
// Phone and email come from #site-phone and #site-email in index.html.
// The Formspree id is the ndw-formspree-id meta tag. Leave it empty until
// a real form exists. Empty uses the email-app fallback.

function readContact() {
  var phoneEl = document.getElementById("site-phone");
  var emailEl = document.getElementById("site-email");
  var phoneText = phoneEl ? phoneEl.querySelector(".contact-value") : null;
  var emailHref = emailEl ? (emailEl.getAttribute("href") || "") : "";
  var email = "";
  if (emailHref.indexOf("mailto:") === 0) {
    email = emailHref.slice("mailto:".length).split("?")[0];
  }
  return {
    phoneDisplay: phoneText ? phoneText.textContent.trim() : "",
    phoneHref: phoneEl ? (phoneEl.getAttribute("href") || "") : "",
    email: email
  };
}

function formspreeEndpoint() {
  var meta = document.querySelector('meta[name="ndw-formspree-id"]');
  var raw = meta ? (meta.getAttribute("content") || "").trim() : "";
  if (!raw) return "";
  var fromUrl = raw.match(/formspree\.io\/f\/([A-Za-z0-9]+)/i);
  if (fromUrl) return "https://formspree.io/f/" + fromUrl[1];
  if (/^[A-Za-z0-9]+$/.test(raw)) return "https://formspree.io/f/" + raw;
  if (window.console && console.warn) {
    console.warn("ndw-formspree-id is set but is not a Formspree form id. Using the email-app fallback.");
  }
  return "";
}

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
        if (!img) return;
        dialogImg.src = img.getAttribute("data-full") || img.currentSrc || img.getAttribute("src");
        dialogImg.alt = img.alt || "";
        dialogTitle.textContent = img.alt || "Photo";
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
  const contact = readContact();

  if (callSheet) {
    const numberEl = callSheet.querySelector(".call-sheet-number");
    const callAnchor = callSheet.querySelector(".call-sheet-call");
    if (numberEl && contact.phoneDisplay) numberEl.textContent = contact.phoneDisplay;
    if (callAnchor && contact.phoneHref) callAnchor.setAttribute("href", contact.phoneHref);
  }

  if (callSheet && typeof callSheet.showModal === "function") {
    let opener = null;
    let closing = false;

    function motionReduced() {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    function openCallSheet(source) {
      if (callSheet.open || closing) return;
      opener = source;
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

    document.querySelectorAll("#services .price-contact").forEach(function (button) {
      button.addEventListener("click", function () {
        openCallSheet(button);
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

  const endpoint = formspreeEndpoint();
  const hint = document.getElementById("form-hint");
  const submitButton = document.getElementById("contact-submit");
  if (endpoint) {
    form.action = endpoint;
    form.method = "post";
    form.removeAttribute("enctype");
    if (hint) {
      hint.textContent = "This sends your note to us. You can also call or email using the phone and email above.";
    }
    if (submitButton) submitButton.textContent = "Send this message";
  }

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

  function mailtoUrl(name, email, phone, dog, service, message) {
    const body = [
      "Name: " + name,
      "Email: " + email,
      "Phone: " + (phone || "(not given)"),
      "Dog: " + (dog || "(not given)"),
      "Service: " + service,
      "",
      message
    ].join("\n");
    return "mailto:" + contact.email + "?subject=" + encodeURIComponent("Dog walk request from " + name) + "&body=" + encodeURIComponent(body);
  }

  function reachLine() {
    const bits = [];
    if (contact.phoneDisplay) bits.push("call " + contact.phoneDisplay);
    if (contact.email) bits.push("email " + contact.email);
    if (!bits.length) return "";
    return " You can also " + bits.join(" or ") + ".";
  }

  let sending = false;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (sending) return;
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

    function openMailto() {
      if (!contact.email) return;
      window.location.href = mailtoUrl(name, email, phone, dog, service, message);
    }

    if (!endpoint) {
      status.className = "form-status is-visible";
      status.textContent = "Opening your email app with this message." + reachLine();
      openMailto();
      return;
    }

    sending = true;
    if (submitButton) submitButton.disabled = true;
    status.className = "form-status is-visible";
    status.textContent = "Sending…";

    fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        dog: dog,
        service: service,
        message: message,
        _subject: "Dog walk request from " + name
      })
    }).then(function (response) {
      if (!response.ok) throw new Error("Form request failed");
      return response.json().catch(function () { return {}; });
    }).then(function () {
      form.reset();
      status.className = "form-status is-visible";
      status.textContent = "Thanks. Your message was sent." + reachLine();
    }).catch(function () {
      openMailto();
      status.className = "form-status is-visible is-error";
      status.textContent = "The form could not send from this browser, so your email app should open." + reachLine();
    }).then(function () {
      sending = false;
      if (submitButton) submitButton.disabled = false;
    });
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
