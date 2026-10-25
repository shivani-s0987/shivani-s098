(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Animate On Scroll remains compatible with the original portfolio's AOS setup.
  if (window.AOS && typeof window.AOS.init === "function") {
    window.AOS.init({ duration: 850, once: true, offset: 75, easing: "ease-out-cubic" });
  }

  // Animated role copy with graceful fallback.
  const typed = $(".typed-text");
  const roles = ["Python Full-Stack Developer", "Data Analyst", "Django Developer", "Python Developer"];
  if (typed && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let roleIndex = 0, charIndex = roles[0].length, deleting = true;
    const tick = () => {
      const word = roles[roleIndex];
      if (deleting) {
        charIndex = Math.max(0, charIndex - 1);
        typed.textContent = word.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(tick, 350);
          return;
        }
        setTimeout(tick, 38);
      } else {
        const next = roles[roleIndex];
        charIndex = Math.min(next.length, charIndex + 1);
        typed.textContent = next.slice(0, charIndex);
        if (charIndex === next.length) {
          deleting = true;
          setTimeout(tick, 1700);
          return;
        }
        setTimeout(tick, 72);
      }
    };
    setTimeout(tick, 1800);
  }

  // Mobile menu
  const toggle = $(".menu-toggle");
  const nav = $(".nav-links");
  const closeMenu = () => {
    if (!toggle || !nav) return;
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
    document.body.classList.remove("menu-open");
  };
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const opened = toggle.getAttribute("aria-expanded") === "true";
      nav.classList.toggle("open", !opened);
      toggle.setAttribute("aria-expanded", String(!opened));
      toggle.setAttribute("aria-label", opened ? "Open navigation" : "Close navigation");
      toggle.innerHTML = opened ? '<i class="fa-solid fa-bars"></i>' : '<i class="fa-solid fa-xmark"></i>';
      document.body.classList.toggle("menu-open", !opened);
    });
    $$(".nav-link, .nav-contact", nav).forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", e => { if (e.key === "Escape") { closeMenu(); closeProjectModal(); closeCertLightbox(); } });
    window.addEventListener("resize", () => { if (window.innerWidth > 760) closeMenu(); });
  }

  // Sticky header and active section navigation
  const header = $(".site-header");
  const navLinks = $$(".nav-link");
  const sections = $$("main section[id]");
  let scrollQueued = false;
  const onScroll = () => {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(() => {
      if (header) header.classList.toggle("is-scrolled", window.scrollY > 25);
      let current = "home";
      sections.forEach(section => { if (window.scrollY >= section.offsetTop - 180) current = section.id; });
      navLinks.forEach(link => {
        const active = link.getAttribute("href") === `#${current}`;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      });
      scrollQueued = false;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Project data powers the filtered grid and accessible detail modal.
  const projects = {
    booklytic: {
      title: "BookLytic",
      category: "PYTHON / DJANGO / ANALYTICS",
      image: "assets/img/projects/lms.jpeg",
      description: "A book-tracking and analytics platform focused on reading patterns and preferences. It combines application development with data summaries and visualisations to make personal reading activity easier to understand.",
      features: ["Track books and reading activity", "Explore personal reading patterns and preferences", "Present analytics through a dashboard", "Use visual summaries to make trends easier to spot"],
      tech: ["Python", "Django", "Data visualisation", "Authentication"],
      url: "https://github.com/shivani-s0987/Book-Vault"
    },
    eduverse: {
      title: "EduVerse",
      category: "PYTHON / DJANGO / WEB APPLICATION",
      image: "assets/img/projects/online.jpeg",
      description: "An online education platform project with different experiences for students and instructors, plus workflows for attendance, grading, and platform administration.",
      features: ["Student and instructor dashboards", "Attendance tracking and grading workflows", "Admin portal for overall platform management", "Performance tracking and recommendation concepts"],
      tech: ["Python", "Django", "HTML/CSS", "JavaScript"],
      url: "https://github.com/shivani-s0987/EduVerse"
    },
    passforge: {
      title: "PassForge",
      category: "PYTHON / DJANGO / APPLICATION LOGIC",
      image: "assets/img/projects/pass.jpeg",
      description: "A password generator and strength-analysis tool designed to turn security logic into a straightforward web experience with real-time feedback.",
      features: ["Generate passwords with configurable properties", "Estimate password strength using scoring logic", "Provide immediate user feedback", "Present functionality through a Django interface"],
      tech: ["Python", "Django", "HTML/CSS", "Security fundamentals"],
      url: "https://github.com/shivani-s0987/Pass-Forge"
    }
  };

  const projectModal = $("#projectModal");
  let lastFocusedElement = null;

  function openProjectModal(key) {
    const project = projects[key];
    if (!projectModal || !project) return;
    lastFocusedElement = document.activeElement;
    $("#modalTitle").textContent = project.title;
    $("#modalCategory").textContent = project.category;
    $("#modalDescription").textContent = project.description;
    $("#modalImage").src = project.image;
    $("#modalImage").alt = `${project.title} project preview`;
    $("#modalGithub").href = project.url;
    const featureList = $("#modalFeatures");
    featureList.replaceChildren(...project.features.map(feature => {
      const li = document.createElement("li");
      li.textContent = feature;
      return li;
    }));
    const techList = $("#modalTech");
    techList.replaceChildren(...project.tech.map(tech => {
      const span = document.createElement("span");
      span.textContent = tech;
      return span;
    }));
    projectModal.classList.add("is-open");
    projectModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    $(".modal-close", projectModal).focus();
  }
  function closeProjectModal() {
    if (!projectModal || !projectModal.classList.contains("is-open")) return;
    projectModal.classList.remove("is-open");
    projectModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") lastFocusedElement.focus();
  }
  $$("[data-project]").forEach(button => button.addEventListener("click", () => openProjectModal(button.dataset.project)));
  if (projectModal) {
    $(".modal-close", projectModal).addEventListener("click", closeProjectModal);
    projectModal.addEventListener("click", event => { if (event.target === projectModal) closeProjectModal(); });
  }
  window.closeProjectModal = closeProjectModal;

  // Accessible category filters
  const filterButtons = $$(".filter-btn");
  const portfolioItems = $$(".portfolio-item");
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter || "all";
      filterButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      portfolioItems.forEach(item => {
        const visible = filter === "all" || item.classList.contains(filter);
        item.classList.toggle("is-hidden", !visible);
        item.setAttribute("aria-hidden", String(!visible));
      });
    });
  });

  // Certificate image lightbox
  const certLightbox = $("#certLightbox");
  function openCertLightbox(button) {
    if (!certLightbox) return;
    lastFocusedElement = document.activeElement;
    $("#lightboxImage").src = button.dataset.cert;
    $("#lightboxImage").alt = button.dataset.title || "Certificate";
    $("#lightboxTitle").textContent = button.dataset.title || "Certificate";
    certLightbox.classList.add("is-open");
    certLightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    $(".lightbox-close", certLightbox).focus();
  }
  function closeCertLightbox() {
    if (!certLightbox || !certLightbox.classList.contains("is-open")) return;
    certLightbox.classList.remove("is-open");
    certLightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") lastFocusedElement.focus();
  }
  $$(".cert-card").forEach(button => button.addEventListener("click", () => openCertLightbox(button)));
  if (certLightbox) {
    $(".lightbox-close", certLightbox).addEventListener("click", closeCertLightbox);
    certLightbox.addEventListener("click", event => { if (event.target === certLightbox) closeCertLightbox(); });
  }

  // Decorative, light-weight Matrix rain. Disabled for reduced motion and low-power/mobile screens.
  const canvas = $(".matrix-bg");
  if (canvas && !window.matchMedia("(prefers-reduced-motion: reduce)").matches && window.innerWidth > 640) {
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const glyphs = "01{}[]<>/\\$#";
      let width = 0, height = 0, columns = [], frame = 0;
      const fontSize = 14;
      function resizeCanvas() {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        columns = Array.from({ length: Math.ceil(width / fontSize) }, () => Math.random() * -height / fontSize);
      }
      function drawMatrix() {
        if (document.hidden) { requestAnimationFrame(drawMatrix); return; }
        ctx.fillStyle = "rgba(7,11,8,0.10)";
        ctx.fillRect(0, 0, width, height);
        ctx.font = `${fontSize}px monospace`;
        for (let i = 0; i < columns.length; i++) {
          const y = columns[i] * fontSize;
          ctx.fillStyle = Math.random() > 0.94 ? "#b4ffd0" : "#00a94f";
          ctx.fillText(glyphs[Math.floor(Math.random() * glyphs.length)], i * fontSize, y);
          if (y > height && Math.random() > 0.975) columns[i] = 0;
          columns[i] += 0.45;
        }
        frame = requestAnimationFrame(drawMatrix);
      }
      resizeCanvas();
      drawMatrix();
      window.addEventListener("resize", resizeCanvas, { passive: true });
      window.addEventListener("beforeunload", () => cancelAnimationFrame(frame), { once: true });
    }
  }

  // Subtle pointer aura on fine pointers only.
  const aura = $(".cursor-aura");
  if (aura && window.matchMedia("(pointer:fine)").matches) {
    aura.style.display = "block";
    window.addEventListener("pointermove", event => {
      aura.style.left = `${event.clientX}px`;
      aura.style.top = `${event.clientY}px`;
    }, { passive: true });
  }

  const year = $("#currentYear");
  if (year) year.textContent = String(new Date().getFullYear());

  // Load AOS animations after initial layout; the content stays visible if JS/CDN is unavailable.
  document.documentElement.classList.add("js-ready");
})();
