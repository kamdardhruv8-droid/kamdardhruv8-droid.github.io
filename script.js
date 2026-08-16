/* =====================================================================
   PROJECTS - add / edit your projects here.
   To add a project: copy one { } block, edit the fields, and it appears
   automatically. Set "link" and/or "repo" to "" to hide those buttons.
   ===================================================================== */
const projects = [
  {
    tag: "Data Analytics",
    title: "Quantium Customer Analytics",
    description:
      "End-to-end analysis of 264,000+ transaction records, spanning data preparation, cleaning and quality checks, customer segmentation and an experimentation (A/B) study, with findings written up for a non-technical stakeholder.",
    metrics: [
      { value: "264K+", label: "records analysed" },
      { value: "R + Python", label: "tooling" }
    ],
    stack: ["R", "Python", "Segmentation", "A/B Testing", "Data Cleaning"],
    link: "https://www.theforage.com/simulations/quantium/data-analytics-rqkb",
    repo: "https://github.com/kamdardhruv8-droid/quantium-virtual-internship",
    pdf: "assets/projects/Quantium_Project_Dhruv_Kamdar.pdf"
  },
  {
    tag: "Investment Banking · Operations",
    title: "Goldman Sachs Operations",
    description:
      "Operations Analyst job simulation focused on trade settlements, asset transfers and operational processes inside an investment bank. Analysed financial data to spot settlement issues and collaborated with Trading, Compliance and Technology teams to resolve them.",
    metrics: [
      { value: "Trade settlements", label: "focus area" },
      { value: "Ops risk", label: "principles applied" }
    ],
    stack: ["Trade Settlements", "Operational Risk", "Compliance", "IB Operations"],
    link: "",
    repo: ""
  },
  {
    tag: "Data Governance",
    title: "Golden Source Master Data",
    description:
      "Restructured 12 database tables at DG Software to establish a clean golden source of master data, cutting duplication by 30% and improving retrieval efficiency by 25% across 10,000+ records.",
    metrics: [
      { value: "−30%", label: "duplication" },
      { value: "+25%", label: "retrieval efficiency" }
    ],
    stack: ["SQL", "ER Modelling", "Reconciliation", "Data Validation"],
    link: "",
    repo: ""
  },
  {
    tag: "Finance · Consulting",
    title: "Practera Finance Research",
    description:
      "As Research Lead, served as the central point of contact for data requests, gathering, validating and reconciling across sources. Analysed $77B+ of financial data and presented findings to the client's Managing Director.",
    metrics: [
      { value: "$77B+", label: "data reviewed" },
      { value: "MD-level", label: "stakeholder" }
    ],
    stack: ["Excel", "Reconciliation", "Reporting", "Stakeholder Mgmt"],
    link: "",
    repo: ""
  },
  {
    tag: "Portfolio · Finance",
    title: "King's Investment Fund",
    description:
      "Team Leader maintaining consistent data quality across portfolio reporting, reconciling performance data from multiple sources and currencies, and quality-checking every deliverable for accuracy and completeness.",
    metrics: [
      { value: "Multi-ccy", label: "reconciliation" },
      { value: "Team Lead", label: "role" }
    ],
    stack: ["Portfolio Reporting", "Data Quality", "Excel", "Leadership"],
    link: "",
    repo: ""
  },
  {
    tag: "AI · Automation",
    title: "Agentic AI Workflow Automation",
    description:
      "Built automated data pipelines for retrieval, validation and structured reporting, applicable to future data-governance and analytics initiatives. Backed by the DeepLearning.AI Agentic AI Certificate (multi-agent systems, automated tool use).",
    metrics: [
      { value: "Multi-agent", label: "pipelines" },
      { value: "Certified", label: "DeepLearning.AI" }
    ],
    stack: ["Python", "Agentic AI", "Automation", "Data Pipelines"],
    link: "",
    repo: ""
  },
  {
    tag: "Research · Econometrics",
    title: "Pairs Trading Dissertation",
    description:
      "MSc research applying statistical arbitrage and cointegration techniques to identify and back-test pairs-trading strategies, combining econometric modelling with disciplined data preparation.",
    metrics: [
      { value: "Cointegration", label: "method" },
      { value: "Back-tested", label: "strategy" }
    ],
    stack: ["Python", "Econometrics", "Statistical Modelling", "Back-testing"],
    link: "",
    repo: ""
  }
];

/* ---- Render project cards ---- */
function renderProjects() {
  const grid = document.getElementById("projectGrid");
  if (!grid) return;
  grid.innerHTML = projects
    .map((p, i) => {
      const num = String(i + 1).padStart(2, "0");
      const metrics = (p.metrics || [])
        .map((m) => `<div class="pc-metric"><b>${m.value}</b><span>${m.label}</span></div>`)
        .join("");
      const stack = (p.stack || []).map((s) => `<span>${s}</span>`).join("");
      const links = [
        p.pdf ? `<a href="${p.pdf}" class="pc-casestudy" data-pdf="${p.pdf}" data-pdf-title="${p.title}">📊 View full case study →</a>` : "",
        p.link ? `<a href="${p.link}" target="_blank" rel="noopener">View project ↗</a>` : "",
        p.repo ? `<a href="${p.repo}" target="_blank" rel="noopener">Source ↗</a>` : ""
      ].join("");
      const clickable = p.pdf ? ` has-pdf" data-pdf="${p.pdf}" data-pdf-title="${p.title}` : "";
      const badge = p.pdf ? `<span class="pc-badge">Case study</span>` : "";
      return `
      <article class="project-card reveal${clickable}" ${p.pdf ? 'role="button" tabindex="0"' : ""}>
        ${badge}
        <span class="pc-num">${num}</span>
        <span class="pc-tag">${p.tag}</span>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="pc-metrics">${metrics}</div>
        <div class="pc-stack">${stack}</div>
        <div class="pc-links">${links}</div>
      </article>`;
    })
    .join("");
}

/* ---- Theme toggle ---- */
function initTheme() {
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.setAttribute("data-theme", saved || (prefersDark ? "dark" : "light"));
  document.getElementById("themeToggle").addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}

/* ---- Scroll reveal + progress + nav ---- */
function initScroll() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          if (e.target.classList.contains("stat")) animateCounter(e.target);
          if (e.target.classList.contains("bars")) e.target.classList.add("in-view");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal, .bars").forEach((el) => io.observe(el));

  const nav = document.getElementById("nav");
  const progress = document.getElementById("scrollProgress");
  const sections = [...document.querySelectorAll("section[id]")];
  const links = [...document.querySelectorAll(".nav-links a")];

  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle("scrolled", y > 20);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (y / h) * 100 + "%";
    let current = "";
    sections.forEach((s) => {
      if (y >= s.offsetTop - 120) current = s.id;
    });
    links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + current));
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---- Animated counters ---- */
function animateCounter(stat) {
  const el = stat.querySelector(".stat-num");
  if (!el || el.dataset.done) return;
  el.dataset.done = "1";
  const target = +el.dataset.target;
  const prefix = el.dataset.prefix || "";
  const suffix = el.dataset.suffix || "";
  const dur = 1600;
  const start = performance.now();
  const fmt = (n) => (target >= 1000 ? Math.round(n).toLocaleString() : Math.round(n));
  function tick(now) {
    const t = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = prefix + fmt(target * eased) + suffix;
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ---- Mobile menu ---- */
function initMenu() {
  const btn = document.getElementById("menuBtn");
  const links = document.getElementById("navLinks");
  btn.addEventListener("click", () => {
    btn.classList.toggle("open");
    links.classList.toggle("open");
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      btn.classList.remove("open");
      links.classList.remove("open");
    })
  );
}

/* ---- Contact popup (Send email / Call number) ---- */
function initModal() {
  const modal = document.getElementById("contactModal");
  if (!modal) return;
  const toast = document.getElementById("modalToast");
  const phone = "+44 7423 238207";

  // Call: dials on mobile; on desktop (no dialer) copies the number + confirms.
  const callBtn = document.getElementById("callBtn");
  if (callBtn) {
    callBtn.addEventListener("click", () => {
      // tel: still fires for devices that can call; give everyone the number too.
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(phone)
          .then(() => showToast(`Number copied to clipboard: ${phone}`))
          .catch(() => showToast(`Call me at ${phone}`));
      } else {
        showToast(`Call me at ${phone}`);
      }
    });
  }
  let toastTimer;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (toast.hidden = true), 4000);
  }

  const open = () => {
    if (toast) toast.hidden = true;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };
  document.querySelectorAll('[data-modal="open"]').forEach((el) =>
    el.addEventListener("click", open)
  );
  modal.querySelectorAll('[data-modal="close"]').forEach((el) =>
    el.addEventListener("click", close)
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

/* ---- Project case-study popup (embedded PDF) ---- */
function initProjectModal() {
  const modal = document.getElementById("pdfModal");
  if (!modal) return;
  const frame = document.getElementById("pdfFrame");
  const title = document.getElementById("pdfTitle");
  const openTab = document.getElementById("pdfOpen");
  const download = document.getElementById("pdfDownload");

  const openPdf = (src, name) => {
    title.textContent = name ? name + " — case study" : "Case study";
    openTab.href = src;
    download.href = src;
    frame.src = src + "#view=FitH";
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  const closePdf = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    frame.src = "about:blank"; // stop rendering / free memory
    document.body.style.overflow = "";
  };

  // Delegate clicks on any project card / link that carries a data-pdf.
  document.getElementById("projectGrid").addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-pdf]");
    if (!trigger) return;
    // Let genuine external links (Forage, GitHub) behave normally.
    const extLink = e.target.closest('a[target="_blank"]');
    if (extLink) return;
    e.preventDefault();
    openPdf(trigger.getAttribute("data-pdf"), trigger.getAttribute("data-pdf-title"));
  });
  // Keyboard: Enter/Space on a focused card opens it.
  document.getElementById("projectGrid").addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const card = e.target.closest(".has-pdf");
    if (!card) return;
    e.preventDefault();
    openPdf(card.getAttribute("data-pdf"), card.getAttribute("data-pdf-title"));
  });

  modal.querySelectorAll("[data-pdf-close]").forEach((el) =>
    el.addEventListener("click", closePdf)
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closePdf();
  });
}

/* ---- Init ---- */
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  initTheme();
  initScroll();
  initMenu();
  initModal();
  initProjectModal();
  document.getElementById("year").textContent = new Date().getFullYear();
});
