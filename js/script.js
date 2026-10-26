document.documentElement.classList.add("js");
/* ============================================================
   AMBER & OAK COFFEE HOUSE — SCRIPT
   ============================================================
   This one file is shared across all three pages. Each feature
   checks whether its target element actually exists before doing
   anything, so nothing breaks on pages that don't have that piece
   (e.g. the menu filter only runs on the homepage).
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- 1. MOBILE NAV TOGGLE ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.focus();
      }
    });
    navToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the mobile menu automatically after a link is clicked
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- 2. HIGHLIGHT THE ACTIVE NAV LINK ---------- */
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });

  /* ---------- 3. STICKY HEADER SHADOW ON SCROLL ---------- */
  const header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", function () {
      header.classList.toggle("scrolled", window.scrollY > 10);
    });
  }

  /* ---------- 4. BACK TO TOP BUTTON ---------- */
  const backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", function () {
      backToTop.classList.toggle("show", window.scrollY > 500);
    });
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    });
  }

  /* ---------- 5. MENU FILTER (homepage only) ---------- */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const menuItems = document.querySelectorAll(".menu-item");

  if (filterButtons.length && menuItems.length) {
    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        // Update which button looks active
        filterButtons.forEach(function (b) { b.classList.remove("active"); b.setAttribute("aria-pressed", "false"); });
        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        const category = button.dataset.filter;

        menuItems.forEach(function (item) {
          const matches = category === "all" || item.dataset.category === category;
          item.classList.toggle("hidden", !matches);
        });
      });
    });
  }

  /* ---------- 6. CONTACT FORM VALIDATION (contact page only) ---------- */
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.querySelector('button[type="submit"]').disabled = false;
    contactForm.querySelectorAll(".form-row").forEach(function (row) {
      const input = row.querySelector("input, select, textarea");
      const error = row.querySelector(".error-message");
      if (input && error) {
        error.id = input.id + "-error";
        input.setAttribute("aria-describedby", error.id);
      }
    });
    const successBanner = document.querySelector(".form-success");

    contactForm.addEventListener("submit", function (event) {
      event.preventDefault(); // This is a front-end demo: no server to send data to

      if (successBanner) successBanner.classList.remove("show");
      let isValid = true;

      // Every field we need to check, with its own validation rule
      const fields = [
        {
          input: contactForm.querySelector("#name"),
          check: function (value) { return value.trim().length > 0; },
          message: "Please enter your name."
        },
        {
          input: contactForm.querySelector("#email"),
          check: function (value) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()); },
          message: "Please enter a valid email address."
        },
        {
          input: contactForm.querySelector("#subject"),
          check: function (value) { return value.trim().length > 0; },
          message: "Please choose a subject."
        },
        {
          input: contactForm.querySelector("#message"),
          check: function (value) { return value.trim().length >= 10; },
          message: "Please enter a message of at least 10 characters."
        }
      ];

      fields.forEach(function (field) {
        if (!field.input) return;
        const formRow = field.input.closest(".form-row");
        const valid = field.check(field.input.value);

        formRow.classList.toggle("has-error", !valid);
        field.input.setAttribute("aria-invalid", String(!valid));
        if (!valid) {
          isValid = false;
        }
      });

      if (!isValid) contactForm.querySelector("[aria-invalid=true]").focus();
      if (isValid) {
        if (successBanner) {
          successBanner.classList.add("show");
          successBanner.textContent = "Your message passes validation. This demo has not sent or stored it.";
          successBanner.setAttribute("tabindex", "-1");
          successBanner.focus();
        }
      }
    });

    // Clear the error state on a field as soon as the visitor starts fixing it
    contactForm.querySelectorAll("input, textarea, select").forEach(function (el) {
      el.addEventListener("input", function () {
        const formRow = el.closest(".form-row");
        if (formRow) {
          formRow.classList.remove("has-error");
          el.removeAttribute("aria-invalid");
          if (successBanner) successBanner.classList.remove("show");
        }
      });
    });
  }

  /* ---------- 7. SCROLL-REVEAL FOR SECTIONS ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (revealEls.length && "IntersectionObserver" in window && !reducedMotion.matches) {
    try {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            entry.target.classList.remove("reveal-pending");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });

      revealEls.forEach(function (el) {
        el.classList.add("reveal-pending");
        observer.observe(el);
      });
    } catch (error) {
      revealEls.forEach(function (el) { el.classList.remove("reveal-pending"); });
    }
  }

  /* ---------- 8. AUTO-UPDATE COPYRIGHT YEAR ---------- */
  const yearEl = document.querySelector("#current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
