/*
 * Shivani portfolio interactions
 * Path: assets/js/script.js
 *
 * Accessibility and reliability notes:
 * - Respects prefers-reduced-motion.
 * - Pauses decorative animation while the tab is hidden.
 * - Traps keyboard focus inside open dialogs and supports Escape.
 * - Restores focus to the control that opened a dialog.
 * - Keeps filtered-out projects out of keyboard navigation.
 * - Does not lock document scrolling when a project dialog/lightbox opens.
 * - Adds no fictional live-demo links or unverified project claims.
 */
(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointerQuery = window.matchMedia("(pointer: fine)");
  let reducedMotion = reducedMotionQuery.matches;
  const finePointer = finePointerQuery.matches;

  // AOS is optional; the site should still work if its CDN is unavailable.
  function initAOS() {
    if (!window.AOS || typeof window.AOS.init !== "function") return;
    window.AOS.init({
      duration: reducedMotion ? 0 : 650,
      once: true,
      offset: 65,
      easing: "ease-out-cubic",
      disable: reducedMotion
    });
  }
  initAOS();

  // Keep animated role text readable and pause it when the page is hidden.
  const typed = $(".typed-text");
  const roles = ["Python Full-Stack Developer", "Data Analyst", "Django Developer", "Python Developer"];
  let typedTimer = null;
  let typedRoleIndex = 0;
  let typedCharIndex = roles[0].length;
  let typedDeleting = true;
  let typedRunning = false;

  function stopTyped() {
    typedRunning = false;
    if (typedTimer !== null) window.clearTimeout(typedTimer);
    typedTimer = null;
  }

  function tickTyped() {
    if (!typed || reducedMotion || document.hidden || !typedRunning) return;
    const current = roles[typedRoleIndex];
    if (typedDeleting) {
      typedCharIndex = Math.max(0, typedCharIndex - 1);
      typed.textContent = current.slice(0, typedCharIndex);
      if (typedCharIndex === 0) {
        typedDeleting = false;
        typedRoleIndex = (typedRoleIndex + 1) % roles.length;
        typedTimer = window.setTimeout(tickTyped, 320);
        return;
      }
      typedTimer = window.setTimeout(tickTyped, 38);
      return;
    }

    const next = roles[typedRoleIndex];
    typedCharIndex = Math.min(next.length, typedCharIndex + 1);
    typed.textContent = next.slice(0, typedCharIndex);
    if (typedCharIndex === next.length) {
      typedDeleting = true;
      typedTimer = window.setTimeout(tickTyped, 1750);
      return;
    }
    typedTimer = window.setTimeout(tickTyped, 58);
  }

  function startTyped() {
    if (!typed || reducedMotion || document.hidden || typedRunning) return;
    typedRunning = true;
    if (typedTimer === null) typedTimer = window.setTimeout(tickTyped, 2200);
  }

  if (typed) {
    if (reducedMotion) {
      typed.textContent = roles[0];
    } else {
      startTyped();
    }
  }

  // Mobile navigation.
  const menuToggle = $(".menu-toggle");
  const nav = $(".nav-links");

  function closeMenu() {
    if (!menuToggle || !nav) return;
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
    document.body.classList.remove("menu-open");
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const opening = menuToggle.getAttribute("aria-expanded") !== "true";
      nav.classList.toggle("open", opening);
      menuToggle.setAttribute("aria-expanded", String(opening));
      menuToggle.setAttribute("aria-label", opening ? "Close navigation" : "Open navigation");
      menuToggle.innerHTML = opening
        ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
        : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
      document.body.classList.toggle("menu-open", opening);
      if (opening && window.innerWidth <= 760) {
        const firstLink = $(".nav-link", nav);
        if (firstLink) firstLink.focus();
      }
    });

    $$(".nav-link, .nav-contact", nav).forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) closeMenu();
    }, { passive: true });
  }

  // Header state and active navigation section.
  const header = $(".site-header");
  const navLinks = $$(".nav-link");
  const sections = $$("main section[id]");
  let scrollQueued = false;

  function onScroll() {
    if (scrollQueued) return;
    scrollQueued = true;
    window.requestAnimationFrame(() => {
      if (header) header.classList.toggle("is-scrolled", window.scrollY > 25);
      let current = "home";
      sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 180) current = section.id;
      });
      navLinks.forEach(link => {
        const isCurrent = link.getAttribute("href") === `#${current}`;
        link.classList.toggle("active", isCurrent);
        if (isCurrent) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
      scrollQueued = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  onScroll();

  // Project detail content. Keep repository destinations as source links; no
  // live demo is added unless a working deployment URL has been verified.
  const projects = {
    booklytic: {
      title: "BookLytic",
      category: "PYTHON / DJANGO / LIBRARY MANAGEMENT",
      image: "assets/img/projects/lms.jpeg",
      description: "A Django library-management project for organising book records, users, and borrowing activity. The linked repository is the source of truth for implemented workflows and setup instructions.",
      features: [
        "Library book-record management is the core project focus.",
        "Review the repository to confirm the implemented user and borrowing workflows.",
        "Check the README and source code for search, access-control, and admin details before describing them as completed features.",
        "No live deployment link is included because a verified demo URL is not available here."
      ],
      tech: ["Python", "Django", "SQLite", "Bootstrap"],
      url: "https://github.com/shivani-s0987/Book-Vault"
    },
    eduverse: {
      title: "EduVerse",
      category: "PYTHON / DJANGO / E-LEARNING",
      image: "assets/img/projects/online.jpeg",
      description: "A Django e-learning project focused on course management and online learning workflows. Consult the linked source repository to establish exactly which features and roles are implemented.",
      features: [
        "E-learning and course-management are the stated project focus.",
        "Use the repository code and README to verify instructor, learner, grading, attendance, or collaboration workflows before claiming them as functional.",
        "Add application screenshots or a demo only after checking them against a running build.",
        "No live deployment link is included because a verified demo URL is not available here."
      ],
      tech: ["Python", "Django", "Web application"],
      url: "https://github.com/shivani-s0987/EduVerse"
    },
    passforge: {
      title: "PassForge",
      category: "PYTHON / DJANGO / PASSWORD TOOL",
      image: "assets/img/projects/pass.jpeg",
      description: "A Django password-tool project described as supporting password generation and strength checking. The repository should be used to verify the exact generation options and strength-scoring implementation.",
      features: [
        "Password generation is the main project focus.",
        "Password-strength checking is described by the project repository.",
        "Inspect the implementation to confirm how strength is scored and what limitations apply.",
        "No live deployment link is included because a verified demo URL is not available here."
      ],
      tech: ["Python", "Django", "HTML/CSS", "Password-strength analysis"],
      url: "https://github.com/shivani-s0987/Pass-Forge"
    }
  };

  const projectModal = $("#projectModal");
  const certLightbox = $("#certLightbox");
  const projectDialog = projectModal ? $("[role='dialog']", projectModal) : null;
  let activeLayer = null;
  let projectTrigger = null;
  let certificateTrigger = null;

  function isVisible(element) {
    if (!element || !element.isConnected) return false;
    const style = window.getComputedStyle(element);
    return element.getClientRects().length > 0 && style.visibility !== "hidden" && style.display !== "none";
  }

  function getFocusableElements(root) {
    if (!root) return [];
    return $$(
      'a[href], area[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), iframe, object, embed, [contenteditable="true"], [tabindex]:not([tabindex="-1"])',
      root
    ).filter(element => isVisible(element) && !element.closest("[inert]") && element.getAttribute("aria-hidden") !== "true");
  }

  function setDialogOpen(layer, open) {
    if (!layer) return;
    layer.classList.toggle("is-open", open);
    layer.setAttribute("aria-hidden", String(!open));
    if (open) {
      layer.removeAttribute("inert");
    } else {
      layer.setAttribute("inert", "");
    }
  }

  function fillList(list, values) {
    if (!list) return;
    list.replaceChildren(...values.map(value => {
      const item = document.createElement("li");
      item.textContent = value;
      return item;
    }));
  }

  function fillTags(container, values) {
    if (!container) return;
    container.replaceChildren(...values.map(value => {
      const tag = document.createElement("span");
      tag.textContent = value;
      return tag;
    }));
  }

  function openProjectModal(key, trigger) {
    const project = projects[key];
    if (!projectModal || !projectDialog || !project) return;

    // If another layer is open, close it before opening the new one.
    if (activeLayer === certLightbox) closeCertLightbox();
    if (activeLayer === projectModal) closeProjectModal();

    projectTrigger = trigger || document.activeElement;
    const title = $("#modalTitle");
    const category = $("#modalCategory");
    const description = $("#modalDescription");
    const image = $("#modalImage");
    const repositoryLink = $("#modalGithub");

    if (title) title.textContent = project.title;
    if (category) category.textContent = project.category;
    if (description) description.textContent = project.description;
    if (image) {
      image.src = project.image;
      image.alt = `${project.title} project preview`;
      image.onerror = () => {
        image.alt = `${project.title} preview image is unavailable. Open the repository to inspect the project.`;
      };
    }
    if (repositoryLink) {
      repositoryLink.href = project.url;
      repositoryLink.setAttribute("aria-label", `View ${project.title} source repository on GitHub`);
      repositoryLink.target = "_blank";
      repositoryLink.rel = "noopener noreferrer";
    }

    fillList($("#modalFeatures"), project.features);
    fillTags($("#modalTech"), project.tech);

    setDialogOpen(projectModal, true);
    activeLayer = projectModal;
    const closeButton = $(".modal-close", projectModal);
    (closeButton || projectDialog).focus();
  }

  function closeProjectModal() {
    if (!projectModal || !projectModal.classList.contains("is-open")) return;
    setDialogOpen(projectModal, false);
    if (activeLayer === projectModal) activeLayer = null;
    const trigger = projectTrigger;
    projectTrigger = null;
    if (trigger && typeof trigger.focus === "function" && trigger.isConnected && !trigger.closest("[inert]")) {
      trigger.focus();
    }
  }

  $$('[data-project]').forEach(button => {
    button.addEventListener("click", () => openProjectModal(button.dataset.project, button));
  });

  if (projectModal) {
    const closeButton = $(".modal-close", projectModal);
    if (closeButton) closeButton.addEventListener("click", closeProjectModal);
    projectModal.addEventListener("click", event => {
      if (event.target === projectModal) closeProjectModal();
    });
  }

  // Filters: update visibility, inert state, pressed state, and live counts.
  const filterButtons = $$(".filter-btn");
  const portfolioItems = $$(".portfolio-item");

  function updateFilterCounts() {
    filterButtons.forEach(button => {
      const countElement = $(".filter-count", button);
      if (!countElement) return;
      const filter = button.dataset.filter || "all";
      const count = portfolioItems.filter(item => filter === "all" || item.classList.contains(filter)).length;
      countElement.textContent = String(count).padStart(2, "0");
    });
  }

  function applyFilter(filter, selectedButton) {
    filterButtons.forEach(button => {
      const active = button === selectedButton;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    portfolioItems.forEach(item => {
      const visible = filter === "all" || item.classList.contains(filter);
      item.classList.toggle("is-hidden", !visible);
      item.setAttribute("aria-hidden", String(!visible));
      if (visible) item.removeAttribute("inert");
      else item.setAttribute("inert", "");
    });
    const visibleCount = portfolioItems.filter(item => !item.classList.contains("is-hidden")).length;
    let status = $("#projectFilterStatus");
    if (!status) {
      status = document.createElement("p");
      status.id = "projectFilterStatus";
      status.className = "visually-hidden";
      status.style.cssText = "position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important;";
      status.setAttribute("role", "status");
      status.setAttribute("aria-live", "polite");
      const filterContainer = filterButtons[0] && filterButtons[0].parentElement;
      if (filterContainer) filterContainer.appendChild(status);
    }
    if (status) status.textContent = `${visibleCount} project${visibleCount === 1 ? "" : "s"} shown.`;
  }

  updateFilterCounts();
  filterButtons.forEach(button => {
    button.addEventListener("click", () => applyFilter(button.dataset.filter || "all", button));
  });
  // Ensure initial visibility and aria state are in sync with the All button.
  const initialFilter = filterButtons.find(button => (button.dataset.filter || "all") === "all") || filterButtons[0];
  if (initialFilter) applyFilter(initialFilter.dataset.filter || "all", initialFilter);

  // Certificate image lightbox.
  function openCertLightbox(button) {
    if (!certLightbox) return;
    if (activeLayer === projectModal) closeProjectModal();
    if (activeLayer === certLightbox) closeCertLightbox();

    certificateTrigger = button || document.activeElement;
    const image = $("#lightboxImage");
    const title = $("#lightboxTitle");
    if (image) {
      image.src = button.dataset.cert || "";
      image.alt = button.dataset.title || "Certificate image";
      image.onerror = () => {
        image.alt = `${button.dataset.title || "Certificate"} image is unavailable.`;
      };
    }
    if (title) title.textContent = button.dataset.title || "Certificate";

    setDialogOpen(certLightbox, true);
    activeLayer = certLightbox;
    const closeButton = $(".lightbox-close", certLightbox);
    (closeButton || certLightbox).focus();
  }

  function closeCertLightbox() {
    if (!certLightbox || !certLightbox.classList.contains("is-open")) return;
    setDialogOpen(certLightbox, false);
    if (activeLayer === certLightbox) activeLayer = null;
    const trigger = certificateTrigger;
    certificateTrigger = null;
    if (trigger && typeof trigger.focus === "function" && trigger.isConnected && !trigger.closest("[inert]")) {
      trigger.focus();
    }
  }

  $$(".cert-card").forEach(button => {
    button.addEventListener("click", () => openCertLightbox(button));
  });

  if (certLightbox) {
    const closeButton = $(".lightbox-close", certLightbox);
    if (closeButton) closeButton.addEventListener("click", closeCertLightbox);
    certLightbox.addEventListener("click", event => {
      if (event.target === certLightbox) closeCertLightbox();
    });
  }

  // One consistent Escape handler and a focus trap for whichever dialog is open.
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      if (activeLayer === certLightbox) {
        event.preventDefault();
        closeCertLightbox();
      } else if (activeLayer === projectModal) {
        event.preventDefault();
        closeProjectModal();
      } else {
        closeMenu();
      }
      return;
    }

    if (event.key !== "Tab" || !activeLayer) return;
    const dialog = activeLayer === projectModal ? projectDialog : activeLayer;
    const focusables = getFocusableElements(dialog);
    if (!focusables.length) {
      event.preventDefault();
      if (dialog && typeof dialog.focus === "function") dialog.focus();
      return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
      event.preventDefault();
      first.focus();
    }
  });

  // Defensive guard: if script starts with a hidden dialog, keep it inert.
  if (projectModal && !projectModal.classList.contains("is-open")) projectModal.setAttribute("inert", "");
  if (certLightbox && !certLightbox.classList.contains("is-open")) certLightbox.setAttribute("inert", "");

  // Matrix canvas: low-density animation, paused when hidden or off-screen-sized.
  const canvas = $(".matrix-bg");
  if (canvas && !reducedMotion && window.innerWidth > 760) {
    const ctx = typeof canvas.getContext === "function" ? canvas.getContext("2d") : null;
    if (ctx) {
      const glyphs = "01{}[]<>/$#";
      let width = 0;
      let height = 0;
      let columns = [];
      let frameId = null;
      let running = false;
      const fontSize = 16;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        columns = Array.from({ length: Math.ceil(width / fontSize) }, (_, index) => (index % 7) * -3);
        ctx.clearRect(0, 0, width, height);
      }

      function drawMatrix() {
        if (!running || document.hidden || reducedMotion || window.innerWidth <= 760) {
          frameId = null;
          return;
        }
        ctx.fillStyle = "rgba(7,11,8,0.20)";
        ctx.fillRect(0, 0, width, height);
        ctx.font = `${fontSize}px monospace`;
        for (let i = 0; i < columns.length; i++) {
          const y = columns[i] * fontSize;
          ctx.fillStyle = i % 8 === 0 ? "rgba(100,255,157,0.36)" : "rgba(0,169,79,0.22)";
          ctx.fillText(glyphs[Math.abs(i + Math.floor(columns[i])) % glyphs.length], i * fontSize, y);
          if (y > height && (i % 11 === 0 || Math.random() > 0.985)) columns[i] = 0;
          columns[i] += 0.28;
        }
        frameId = window.requestAnimationFrame(drawMatrix);
      }

      function startMatrix() {
        if (running || document.hidden || reducedMotion || window.innerWidth <= 760) return;
        running = true;
        if (frameId === null) frameId = window.requestAnimationFrame(drawMatrix);
      }

      function stopMatrix() {
        running = false;
        if (frameId !== null) window.cancelAnimationFrame(frameId);
        frameId = null;
      }

      resizeCanvas();
      startMatrix();
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) stopMatrix();
        else startMatrix();
      });
      window.addEventListener("resize", () => {
        resizeCanvas();
        if (window.innerWidth <= 760) stopMatrix();
        else startMatrix();
      }, { passive: true });
      reducedMotionQuery.addEventListener?.("change", event => {
        reducedMotion = event.matches;
        if (reducedMotion) {
          stopMatrix();
          ctx.clearRect(0, 0, width, height);
        } else {
          startMatrix();
        }
      });
      window.addEventListener("pagehide", stopMatrix, { once: true });
    }
  }

  // Cursor aura: only for fine-pointer users; never intercepts pointer events.
  const aura = $(".cursor-aura");
  if (aura && finePointer && !reducedMotion) {
    aura.style.display = "block";
    let pointerFrame = null;
    let latestPointer = null;
    window.addEventListener("pointermove", event => {
      latestPointer = { x: event.clientX, y: event.clientY };
      if (pointerFrame !== null) return;
      pointerFrame = window.requestAnimationFrame(() => {
        if (latestPointer && !document.hidden) {
          aura.style.left = `${latestPointer.x}px`;
          aura.style.top = `${latestPointer.y}px`;
        }
        pointerFrame = null;
      });
    }, { passive: true });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && pointerFrame !== null) {
        window.cancelAnimationFrame(pointerFrame);
        pointerFrame = null;
      }
    });
    window.addEventListener("pagehide", () => {
      if (pointerFrame !== null) window.cancelAnimationFrame(pointerFrame);
    }, { once: true });
    reducedMotionQuery.addEventListener?.("change", event => {
      reducedMotion = event.matches;
      if (reducedMotion) aura.style.display = "none";
      else if (finePointer) aura.style.display = "block";
    });
  }

  // Keep role and canvas animations in sync if the OS preference changes.
  reducedMotionQuery.addEventListener?.("change", event => {
    reducedMotion = event.matches;
    if (reducedMotion) {
      stopTyped();
      if (typed) typed.textContent = roles[0];
      if (window.AOS && typeof window.AOS.refreshHard === "function") window.AOS.refreshHard();
    } else {
      if (window.AOS && typeof window.AOS.init === "function") initAOS();
      startTyped();
    }
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopTyped();
    else startTyped();
  });
  window.addEventListener("pagehide", stopTyped, { once: true });

  const year = $("#currentYear");
  if (year) year.textContent = String(new Date().getFullYear());
  document.documentElement.classList.add("js-ready");
})();
