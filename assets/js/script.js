
(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // =========================================================
  // AOS INITIALIZATION
  // =========================================================

  if (window.AOS && typeof window.AOS.init === "function") {
    window.AOS.init({
      duration: 850,
      once: true,
      offset: 75,
      easing: "ease-out-cubic"
    });
  }

  // =========================================================
  // TYPING ANIMATION
  // =========================================================

  const typed = $(".typed-text");

  const roles = [
    "Python Full-Stack Developer",
    "Data Analyst",
    "Django Developer",
    "Python Developer"
  ];

  if (
    typed &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    let roleIndex = 0;
    let charIndex = roles[0].length;
    let deleting = true;

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

  // =========================================================
  // SHARED MODAL STATE
  // =========================================================

  let lastFocusedElement = null;

  // =========================================================
  // MOBILE NAVIGATION
  // =========================================================

  const toggle = $(".menu-toggle");
  const nav = $(".nav-links");

  const closeMenu = () => {
    if (!toggle || !nav) return;

    nav.classList.remove("open");

    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");

    toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';

    document.body.classList.remove("menu-open");
  };

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const opened = toggle.getAttribute("aria-expanded") === "true";

      nav.classList.toggle("open", !opened);

      toggle.setAttribute("aria-expanded", String(!opened));

      toggle.setAttribute(
        "aria-label",
        opened ? "Open navigation" : "Close navigation"
      );

      toggle.innerHTML = opened
        ? '<i class="fa-solid fa-bars"></i>'
        : '<i class="fa-solid fa-xmark"></i>';

      document.body.classList.toggle("menu-open", !opened);
    });

    $$(".nav-link, .nav-contact", nav).forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });
  }

  // =========================================================
  // PROJECT DATA
  // =========================================================

  const projects = {

    // -------------------------------------------------------
    // PROJECT 01: BOOKLYTIC
    // -------------------------------------------------------

    booklytic: {
      title: "BookLytic",

      category: "PYTHON / DJANGO / ANALYTICS",

      image: "assets/img/projects/lms.jpeg",

      description:
        "A book-tracking and analytics platform focused on reading patterns, preferences, and interactive personal insights.",

      features: [
        "Book tracking and reading activity",
        "Reading-pattern and preference insights",
        "Analytics-oriented application experience"
      ],

      tech: [
        "Python",
        "Django",
        "Analytics",
        "Data visualization"
      ],

      url: "https://github.com/shivani-s0987/Book-Vault"
    },


    // -------------------------------------------------------
    // PROJECT 02: EDUVERSE
    // -------------------------------------------------------

    eduverse: {
      title: "EduVerse",

      category: "PYTHON / DJANGO / WEB APPLICATION",

      image: "assets/img/projects/online.jpeg",

      description:
        "An online education platform concept with student and instructor dashboards, attendance, grading, and administrative workflows.",

      features: [
        "Student and instructor dashboards",
        "Attendance and grading workflows",
        "Administrative workflows"
      ],

      tech: [
        "Python",
        "Django",
        "HTML",
        "CSS",
        "JavaScript"
      ],

      url: "https://github.com/shivani-s0987/EduVerse"
    },


    // -------------------------------------------------------
    // PROJECT 03: PASSFORGE
    // -------------------------------------------------------

    passforge: {
      title: "PassForge",

      category: "PYTHON / DJANGO / APPLICATION",

      image: "assets/img/projects/pass.jpeg",

      description:
        "A password generator and strength-analysis application with scoring logic and immediate feedback.",

      features: [
        "Configurable password generation",
        "Password-strength scoring",
        "Immediate user feedback"
      ],

      tech: [
        "Python",
        "Django",
        "HTML",
        "CSS",
        "JavaScript"
      ],

      url: "https://github.com/shivani-s0987/Pass-Forge"
    },


    // -------------------------------------------------------
    // PROJECT 04: SALES & OPERATIONS MIS
    // -------------------------------------------------------

    salesmis: {
      title: "Sales & Operations MIS Reporting System",

      category: "PYTHON / SQL / EXCEL / AUTOMATION",

      image: "assets/img/projects/sales-mis.png",

      description:
        "An automated MIS reporting pipeline built to clean, validate, and analyze 19,000+ sales records across 120 products, 10 categories, and 6 regions.",

      features: [
        "Automated data cleaning and validation",
        "Daily and monthly Excel MIS reporting",
        "Sales KPI and target-achievement tracking",
        "Profitability and regional performance reporting",
        "Order fulfillment and delayed-order reporting",
        "Inventory exception reporting"
      ],

      tech: [
        "Python",
        "SQL",
        "Excel",
        "Pandas",
        "openpyxl"
      ],

      url: "https://github.com/shivani-s0987?tab=repositories"
    },


    // -------------------------------------------------------
    // PROJECT 05: PRICING OPTIMIZATION DASHBOARD
    // -------------------------------------------------------

    pricingoptimization: {
      title: "Pricing Optimization Dashboard",

      category: "PYTHON / SQL / POWER BI / PRICING ANALYTICS",

      image: "assets/img/projects/pricing-optimization.png",

      description:
        "A retail pricing analytics solution using 20,000 synthetic transaction records to evaluate revenue, discounts, and profitability.",

      features: [
        "Revenue and discount-effectiveness analysis",
        "Product and category profitability analysis",
        "SQL-based pricing analysis",
        "Excel reporting and Power BI dashboarding",
        "Scenario-based pricing analysis"
      ],

      tech: [
        "Python",
        "SQL",
        "Excel",
        "Power BI",
        "Pandas"
      ],

      url: "https://github.com/shivani-s0987?tab=repositories"
    },


    // -------------------------------------------------------
    // PROJECT 06: DYNAMIC PRICING ANALYSIS
    // -------------------------------------------------------

    dynamicpricing: {
      title: "Dynamic Pricing Analysis & Revenue Intelligence",

      category: "PYTHON / SQL / REVENUE INTELLIGENCE",

      image: "assets/img/projects/dynamic-pricing.png",

      description:
        "A pricing analytics pipeline covering 180 products and 98,000+ price observations to study pricing trends, competitor benchmarks, demand patterns, and product profitability.",

      features: [
        "Pricing trend analysis",
        "Competitor benchmark analysis",
        "Demand-pattern analysis",
        "Product-profitability analysis",
        "SQL analytical queries and automated visualizations",
        "Pricing opportunity reports and scenario simulations"
      ],

      tech: [
        "Python",
        "SQL",
        "Pandas",
        "NumPy",
        "Data visualization"
      ],

      url: "https://github.com/shivani-s0987?tab=repositories"
    },


    // -------------------------------------------------------
    // PROJECT 07: INSIGHTFLOW BI
    // -------------------------------------------------------

    insightflow: {
      title: "InsightFlow BI — Business Intelligence & Analytics Platform",

      category: "PYTHON / FULL-STACK / BUSINESS INTELLIGENCE",

      image: "assets/img/projects/insightflow-bi.png",

      description:
        "A full-stack business intelligence platform designed for CSV and Excel data ingestion, data cleaning, KPI tracking, interactive business dashboards, and downloadable reports.",

      features: [
        "CSV and Excel data ingestion",
        "Data cleaning and validation workflows",
        "KPI tracking and interactive dashboards",
        "Filtering and visual reporting",
        "Downloadable business reports"
      ],

      tech: [
        "Python",
        "Django / FastAPI",
        "React",
        "SQL",
        "Pandas",
        "Plotly"
      ],

      url: "https://github.com/shivani-s0987?tab=repositories"
    },


    // -------------------------------------------------------
    // PROJECT 08: HEALTECH
    // -------------------------------------------------------

    healtech: {
      title: "HealTech — Smart Hospital Management System",

      category: "PYTHON / DJANGO / FULL-STACK DEVELOPMENT",

      image: "assets/img/projects/healtech.png",

      description:
        "A database-driven hospital management application integrating patient, doctor, billing, pharmacy, and laboratory modules.",

      features: [
        "Patient and doctor management modules",
        "Billing, pharmacy, and laboratory workflows",
        "Role-based authentication",
        "Appointment and laboratory workflow automation",
        "Operational monitoring dashboards"
      ],

      tech: [
        "Python",
        "Django",
        "JavaScript",
        "PostgreSQL"
      ],

      url: "https://github.com/shivani-s0987?tab=repositories"
    }

  };


  // =========================================================
  // PROJECT MODAL
  // =========================================================

  const projectModal = $("#projectModal");

  function openProjectModal(key) {

    const project = projects[key];

    if (!project || !projectModal) {
      console.warn("Project not found:", key);
      return;
    }

    const modalTitle = $("#modalTitle");
    const modalCategory = $("#modalCategory");
    const modalDescription = $("#modalDescription");
    const modalImage = $("#modalImage");
    const modalGithub = $("#modalGithub");
    const featureList = $("#modalFeatures");
    const techList = $("#modalTech");
    const closeButton = $(".modal-close", projectModal);

    if (
      !modalTitle ||
      !modalCategory ||
      !modalDescription ||
      !modalImage ||
      !modalGithub ||
      !featureList ||
      !techList ||
      !closeButton
    ) {
      console.error(
        "Project modal is missing one or more required HTML elements."
      );
      return;
    }

    lastFocusedElement = document.activeElement;

    // Project title and information
    modalTitle.textContent = project.title;
    modalCategory.textContent = project.category;
    modalDescription.textContent = project.description;

    // Project image
    modalImage.src = project.image;
    modalImage.alt = `${project.title} project preview`;

    // GitHub repository link
    modalGithub.href = project.url;
    modalGithub.target = "_blank";
    modalGithub.rel = "noopener noreferrer";

    // Project features
    featureList.replaceChildren(
      ...project.features.map(feature => {
        const li = document.createElement("li");
        li.textContent = feature;
        return li;
      })
    );

    // Technology stack
    techList.replaceChildren(
      ...project.tech.map(technology => {
        const span = document.createElement("span");
        span.textContent = technology;
        return span;
      })
    );

    // Show modal
    projectModal.classList.add("is-open");
    projectModal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

    closeButton.focus();
  }


  function closeProjectModal() {

    if (
      !projectModal ||
      !projectModal.classList.contains("is-open")
    ) {
      return;
    }

    projectModal.classList.remove("is-open");
    projectModal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

    if (
      lastFocusedElement &&
      typeof lastFocusedElement.focus === "function"
    ) {
      lastFocusedElement.focus();
    }
  }


  // Attach project modal events
  $$("[data-project]").forEach(button => {

    button.addEventListener("click", () => {

      openProjectModal(button.dataset.project);

    });

  });


  if (projectModal) {

    const modalCloseButton = $(".modal-close", projectModal);

    if (modalCloseButton) {
      modalCloseButton.addEventListener(
        "click",
        closeProjectModal
      );
    }

    projectModal.addEventListener("click", event => {

      if (event.target === projectModal) {
        closeProjectModal();
      }

    });

  }

  window.closeProjectModal = closeProjectModal;


  // =========================================================
  // PORTFOLIO FILTERS
  // =========================================================

  const filterButtons = $$(".filter-btn");
  const portfolioItems = $$(".portfolio-item");


  function applyProjectFilter(filter) {

    // Update active filter button
    filterButtons.forEach(button => {

      const active =
        (button.dataset.filter || "all") === filter;

      button.classList.toggle("active", active);

      button.setAttribute(
        "aria-pressed",
        String(active)
      );

    });


    // Show and hide project cards
    portfolioItems.forEach(item => {

      const visible =
        filter === "all" ||
        item.classList.contains(filter);

      item.classList.toggle(
        "is-hidden",
        !visible
      );

      item.setAttribute(
        "aria-hidden",
        String(!visible)
      );

      item.inert = !visible;

    });


    // Refresh AOS after filtering
    if (
      window.AOS &&
      typeof window.AOS.refreshHard === "function"
    ) {
      window.AOS.refreshHard();
    }

  }


  filterButtons.forEach(button => {

    button.addEventListener("click", () => {

      const filter =
        button.dataset.filter || "all";

      applyProjectFilter(filter);

    });

  });


  // Automatically update total project count
  const allCount = $('.filter-btn[data-filter="all"] span');

  if (allCount) {
    allCount.textContent = String(portfolioItems.length);
  }


  // Apply initial filter
  if (filterButtons.length && portfolioItems.length) {

    applyProjectFilter(
      $(".filter-btn.active")?.dataset.filter || "all"
    );

  }


  // =========================================================
  // CERTIFICATE LIGHTBOX
  // =========================================================

  const certLightbox = $("#certLightbox");


  function openCertLightbox(button) {

    if (!certLightbox) return;

    const image = $("#lightboxImage");
    const title = $("#lightboxTitle");
    const closeButton = $(".lightbox-close", certLightbox);

    if (!image || !title || !closeButton) {
      console.error("Certificate lightbox is missing required elements.");
      return;
    }

    lastFocusedElement = document.activeElement;

    image.src = button.dataset.cert;
    image.alt = button.dataset.title || "Certificate";

    title.textContent =
      button.dataset.title || "Certificate";

    certLightbox.classList.add("is-open");

    certLightbox.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add("modal-open");

    closeButton.focus();
  }


  function closeCertLightbox() {

    if (
      !certLightbox ||
      !certLightbox.classList.contains("is-open")
    ) {
      return;
    }

    certLightbox.classList.remove("is-open");

    certLightbox.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove("modal-open");

    if (
      lastFocusedElement &&
      typeof lastFocusedElement.focus === "function"
    ) {
      lastFocusedElement.focus();
    }

  }


  $$(".cert-card").forEach(button => {

    button.addEventListener("click", () => {

      openCertLightbox(button);

    });

  });


  if (certLightbox) {

    const lightboxCloseButton =
      $(".lightbox-close", certLightbox);

    if (lightboxCloseButton) {
      lightboxCloseButton.addEventListener(
        "click",
        closeCertLightbox
      );
    }

    certLightbox.addEventListener("click", event => {

      if (event.target === certLightbox) {
        closeCertLightbox();
      }

    });

  }


  // =========================================================
  // GLOBAL ESCAPE KEY HANDLING
  // =========================================================

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

      closeMenu();
      closeProjectModal();
      closeCertLightbox();

    }

  });


  // =========================================================
  // STICKY HEADER AND ACTIVE NAVIGATION
  // =========================================================

  const header = $(".site-header");
  const navLinks = $$(".nav-link");
  const sections = $$("main section[id]");

  let scrollQueued = false;


  const onScroll = () => {

    if (scrollQueued) return;

    scrollQueued = true;

    requestAnimationFrame(() => {

      if (header) {
        header.classList.toggle(
          "is-scrolled",
          window.scrollY > 25
        );
      }

      let current = "home";

      sections.forEach(section => {

        if (
          window.scrollY >= section.offsetTop - 180
        ) {
          current = section.id;
        }

      });


      navLinks.forEach(link => {

        const active =
          link.getAttribute("href") === `#${current}`;

        link.classList.toggle("active", active);

        if (active) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }

      });

      scrollQueued = false;

    });

  };


  window.addEventListener(
    "scroll",
    onScroll,
    { passive: true }
  );

  onScroll();


  // =========================================================
  // MATRIX BACKGROUND ANIMATION
  // =========================================================

  const canvas = $(".matrix-bg");

  if (
    canvas &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    window.innerWidth > 640
  ) {

    const ctx = canvas.getContext("2d");

    if (ctx) {

      const glyphs = "01{}[]<>/\\$#";

      let width = 0;
      let height = 0;
      let columns = [];
      let frame = 0;

      const fontSize = 14;


      function resizeCanvas() {

        const dpr = Math.min(
          window.devicePixelRatio || 1,
          1.5
        );

        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);

        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        columns = Array.from(
          {
            length: Math.ceil(width / fontSize)
          },
          () => Math.random() * -height / fontSize
        );

      }


      function drawMatrix() {

        if (document.hidden) {
          frame = requestAnimationFrame(drawMatrix);
          return;
        }

        ctx.fillStyle = "rgba(7,11,8,0.10)";

        ctx.fillRect(
          0,
          0,
          width,
          height
        );

        ctx.font = `${fontSize}px monospace`;


        for (let i = 0; i < columns.length; i++) {

          const y = columns[i] * fontSize;

          ctx.fillStyle =
            Math.random() > 0.94
              ? "#b4ffd0"
              : "#00a94f";

          ctx.fillText(
            glyphs[Math.floor(Math.random() * glyphs.length)],
            i * fontSize,
            y
          );

          if (
            y > height &&
            Math.random() > 0.975
          ) {
            columns[i] = 0;
          }

          columns[i] += 0.45;

        }

        frame = requestAnimationFrame(drawMatrix);

      }


      resizeCanvas();
      drawMatrix();

      window.addEventListener(
        "resize",
        resizeCanvas,
        { passive: true }
      );

      window.addEventListener(
        "beforeunload",
        () => cancelAnimationFrame(frame),
        { once: true }
      );

    }

  }


  // =========================================================
  // CUSTOM CURSOR AURA
  // =========================================================

  const aura = $(".cursor-aura");

  if (
    aura &&
    window.matchMedia("(pointer:fine)").matches
  ) {

    aura.style.display = "block";

    window.addEventListener(
      "pointermove",
      event => {

        aura.style.left = `${event.clientX}px`;
        aura.style.top = `${event.clientY}px`;

      },
      { passive: true }
    );

  }


  // =========================================================
  // AUTOMATIC FOOTER YEAR
  // =========================================================

  const year = $("#currentYear");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }


  // =========================================================
  // INITIALIZATION COMPLETE
  // =========================================================

  document.documentElement.classList.add("js-ready");

})();
