// Récupération de la phase depuis l'URL
const params = new URLSearchParams(window.location.search);
let selectedPhaseId = params.get("phase") || "opportunity";
let selectedCategoryId = "all";
let query              = "";

// Bouton retour : on revient vers la page qui a ouvert matrix.html
// (index.html par defaut, ou Life_cycle.html si elle a ete ouverte depuis la
// page de cycle de vie via le parametre ?from=lifecycle)
const cameFrom   = params.get("from");
const backTarget = cameFrom === "lifecycle" ? "Life_cycle.html" : "DS.html";
const backButton = document.getElementById("backButton");
if (backButton) {
  backButton.addEventListener("click", () => {
    window.location.href = backTarget;
  });
}

// DOM
const categoryGrid  = document.getElementById("categoryGrid");
const checklistTable= document.getElementById("checklistTable");
const boardTitle    = document.getElementById("boardTitle");
const taskCount     = document.getElementById("taskCount");
const search        = document.getElementById("search");
const drawer        = document.getElementById("drawer");
const drawerTitle   = document.getElementById("drawerTitle");
const drawerMeta    = document.getElementById("drawerMeta");
const drawerBody    = document.getElementById("drawerBody");
const selectionBody = document.getElementById("selectionBody");

// ─── Helpers ──────────────────────────────────────────────────────────────────

function phaseById(id) {
  return phases.find(phase => phase.id === id);
}

function categoryById(id) {
  return categories.find(category => category.id === id);
}

function taskKey(phase, category, task) {
  return `plc.done.${phase.id}.${category.id}.${encodeURIComponent(task)}`;
}

function isTaskDone(phase, category, task) {
  return localStorage.getItem(taskKey(phase, category, task)) === "true";
}

function setTaskDone(phase, category, task, done) {
  localStorage.setItem(taskKey(phase, category, task), done ? "true" : "false");
}

function doneCount(phase, category) {
  return (phase.data[category.id] || []).filter(task => isTaskDone(phase, category, task)).length;
}

function matchesQuery(phase, category, task) {
  if (!query) return true;
  const haystack = [phase.title, phase.kicker, category.name, category.code, task].join(" ").toLowerCase();
  return haystack.includes(query.toLowerCase());
}

// ─── Render: matrix table ─────────────────────────────────────────────────────

function renderMatrix() {
  const selectedPhase = phaseById(selectedPhaseId);
  const streamPhases  = phases.filter(phase => phase.stream === selectedPhase.stream);
  const isBid         = selectedPhase.stream === "bid";
  const topbar = document.querySelector(".topbar");
  topbar.classList.toggle("is-bid", isBid);
  topbar.classList.toggle("is-real", !isBid);
  const pageTitle     = document.getElementById("pageTitle");
  pageTitle.textContent   = isBid ? "L1 Bid Framework" : "L1 Realisation Framework";
  const matrixCurrent = document.getElementById("matrixCurrent");
  document.documentElement.style.setProperty("--orange", isBid ? "#ff6b00" : "#c90009");
  document.documentElement.style.setProperty("--orange-dark", isBid ? "#ad4100" : "#970007");
  matrixCurrent.innerHTML = isBid
  ? '<span class="matrixCtext">Realisation Framework</span> <span class="arrow-right">➜</span>'
  : '<span class="arrow-left">➜</span> <span class="matrixCtext">Bid Framework</span>';
  matrixCurrent.style.background = isBid ? "#c90009" : "#ff6b00";

  matrixCurrent.onclick = () => {
    if (isBid) {
      selectedPhaseId = "initialisation";
    } else {
      selectedPhaseId = "opportunity";
    }
    selectedCategoryId = "all";
    query = "";
    render();
  };


  const header = `
    <thead>
      <tr>
        <th class="row-category">Categories</th>
        ${streamPhases.map(phase => `
          <th class="${phase.id === selectedPhaseId ? "active-column" : ""}">
            <button class="phase-column" type="button" data-phase="${phase.id}">
              ${phase.title}<span>${phase.kicker || phase.note}</span>
            </button>
          </th>
        `).join("")}
      </tr>
    </thead>
  `;

  const body = `
    <tbody>
      ${categories.map(category => `
        <tr>
          <th class="row-category">
            <button type="button" data-category="${category.id}">
              <img class="mark" src="${category.icon}">
              <span>${category.id}</spsan>
              <br>
              <span class= "category-subtitle">${category.name}</span>
            </button>
          </th>
          ${streamPhases.map(phase => {
            const tasks     = phase.data[category.id] || [];
            const completed = doneCount(phase, category);
            const preview   = tasks.length ? tasks.slice(0, 3).join(" / ") : "Aucune activite definie";
            const active    = phase.id === selectedPhaseId && category.id === selectedCategoryId;
            return `
              <td class="matrix-cell${active ? " active" : ""}${phase.id === selectedPhaseId ? " active-column" : ""}">                
                <button type="button" data-phase="${phase.id}" data-category="${category.id}">
                  <span class="cell-count">${tasks.length} taches${tasks.length ? ` / ${completed} faites` : ""}</span>
                  <span class="cell-preview">${preview}</span>
                </button>
              </td>
            `;
          }).join("")}
        </tr>
      `).join("")}
    </tbody>
  `;

  checklistTable.innerHTML = header + body;

  checklistTable.querySelectorAll("[data-phase]").forEach(button => {
    button.addEventListener("click", () => {
      selectedPhaseId    = button.dataset.phase;
      selectedCategoryId = button.dataset.category || "all";
      render();
    });
  });

  checklistTable.querySelectorAll(".row-category [data-category]").forEach(button => {
    button.addEventListener("click", () => {
      const category = categoryById(button.dataset.category);
      if (category?.link) {
        window.open(category.link, "_blank");
      }
      //selectedCategoryId = button.dataset.category;
      //render();
    });
  });
}

// ─── Render: GovernanceStrip ───────────────────────────────────────────────────────

function renderGovernanceEvent(gate, className = "") {
  const badges = (gate.badges || [gate.badge || "Internal"]).map(badge => {
    const badgeType = badge.toLowerCase().includes("client") ? "client" : "internal";
    return `
    <span class="gov-event-badge gov-event-badge-${badgeType}">${badge}</span>
  `;
  }).join("");

  const icons = (gate.icons || (gate.icon ? [gate.icon] : [])).map(icon => `
    <span class="gov-event-icon">${icon}</span>
  `).join("");

  return `
    <button class="gov-event ${className}" type="button" onclick="window.open('${gate.link}', '_blank')">
      <span class="gov-event-badges">${badges}</span>
      <span class="gov-event-pillar">${icons}</span>
      <span class="gov-event-title">${gate.label}</span>
    </button>
  `;
}

function renderProjectReviews(gates) {
  return `
    <div class="gov-review-cluster" aria-label="Project Reviews">
      <span class="gov-review-loop"></span>
      ${gates.map((gate, index) => renderGovernanceEvent(gate, `gov-event-review gov-review-${index + 1}`)).join("")}
    </div>
  `;
}

function renderGovernanceStrip() {
  const selectedPhase = phaseById(selectedPhaseId);
  const streamPhases  = phases.filter(p => p.stream === selectedPhase.stream);
  const isBid         = selectedPhase.stream === "bid";

  const oldGates = isBid ? [
    { label: "GATE 1<br>GO NO GO",         icon: "🚦", afterPhaseIndex: 0, link: "Assets/Promo2029ConventionStage_MahéJEANNEAU (2).pdf" },
    { label: "GATE 2<br>BID NO BID",        icon: "📋", afterPhaseIndex: 1, link: "Assets/Promo2029ConventionStage_MahéJEANNEAU (2).pdf" },
    { label: "GATE 3<br>CONTRACT REVIEW",   icon: "🤝", afterPhaseIndex: 2, link: "Assets/Promo2029ConventionStage_MahéJEANNEAU (2).pdf" },
    { label: "HANDOVER<br>MEETING",         icon: "ℹ️",  afterPhaseIndex: 3, link: "Assets/Promo2029ConventionStage_MahéJEANNEAU (2).pdf" },
  ] : [
    { label: "KICK OFF<br>MEETINGS",  icon: "🚀", afterPhaseIndex: 0, link: "Assets/Promo2029ConventionStage_MahéJEANNEAU (2).pdf" },
    { label: "PROJECT<br>REVIEWS",    icon: "📊", afterPhaseIndex: 1, link: "Assets/Promo2029ConventionStage_MahéJEANNEAU (2).pdf" },
    { label: "CLOSURE<br>MEETINGS",   icon: "✅", afterPhaseIndex: 2, link: "Assets/Promo2029ConventionStage_MahéJEANNEAU (2).pdf" },  ];

  const gateLink = typeof GATE_LINK !== "undefined" ? GATE_LINK : "Assets/Promo2029ConventionStage_MahÃ©JEANNEAU (2).pdf";
  const gates = isBid ? [
    { label: "Gate 1<br>Go No Go",       icon: "🚦", afterPhaseIndex: 0, link: gateLink },
    { label: "Gate 2<br>Bid No Bid",     icon: "📋", afterPhaseIndex: 1, link: gateLink },
    { label: "Gate 3<br>Contract<br>Review", icon: "🤝", afterPhaseIndex: 2, link: gateLink },
    { label: "Handover<br>Meeting",      icon: "ℹ️",  afterPhaseIndex: 3, link: gateLink },
  ] : [
    { label: "Kick Off<br>Meetings", icons: ["🚀", "🚀"], badges: ["Internal", "With<br>Client"], afterPhaseIndex: 0, link: gateLink },
    { label: "Project<br>Reviews",   icon: "📊", badge: "Internal",    reviewIndex: 0, link: gateLink },
    { label: "Project<br>Reviews",   icon: "📊", badge: "With<br>Client", reviewIndex: 1, link: gateLink },
    { label: "Project<br>Reviews",   icon: "📊", badge: "Internal",    reviewIndex: 2, link: gateLink },
    { label: "Steering<br>Com.",     icon: "🧭", badge: "With<br>Client", reviewIndex: 3, link: gateLink },
    { label: "Closure<br>Meetings",  icons: ["✅", "🎯"], badges: ["Internal", "With<br>Client"], afterPhaseIndex: 2, link: gateLink },
  ];
  const reviewGates = gates.filter(gate => gate.reviewIndex !== undefined);
  const hasBoundaryGateAfter = index =>
    gates.some(gate => gate.afterPhaseIndex === index && !(isBid && index === streamPhases.length - 1));
  const hasBoundaryGateBefore = index =>
    gates.some(gate => gate.afterPhaseIndex === index - 1 && !(isBid && index - 1 === streamPhases.length - 1));
  const governanceBarClass = index => [
    hasBoundaryGateAfter(index) ? "gov-cell-before-event" : "",
    hasBoundaryGateBefore(index) ? "gov-cell-after-event" : "",
    isBid && index === streamPhases.length - 1 ? "gov-cell-end-event" : "",
  ].filter(Boolean).map(className => ` ${className}`).join("");

  // Supprime l'ancien tfoot s'il existe
  const oldFoot = checklistTable.querySelector("tfoot");
  if (oldFoot) oldFoot.remove();

  const tfoot = document.createElement("tfoot");
  tfoot.className = isBid ? "gov-strip gov-strip-bid" : "gov-strip gov-strip-real";
  tfoot.innerHTML = `
    <tr class="gov-row-label">
      <td class="gov-bar-label-cell gov-title-bg">
        <span class="gov-strip-label">GOVERNANCE TOUCHPOINTS</span>
      </td>
      ${streamPhases.map(() => `<td class="gov-title-bg"></td>`).join("")}
    </tr>
    <tr class="gov-row-internal">
      <td class="gov-bar-label-cell internal">Internal</td>
      ${streamPhases.map((_, i) => {
        const gate = gates.find(g => g.afterPhaseIndex === i);
        const isLastGate = isBid && i === streamPhases.length - 1;
        const boundaryClass = isLastGate ? "gov-event-boundary gov-event-end" : "gov-event-boundary";
        const reviewCluster = !isBid && i === 1 ? renderProjectReviews(reviewGates) : "";
        const eventCellClass = gate || reviewCluster ? " gov-cell-with-event" : "";
        return `<td class="gov-cell-bar internal${governanceBarClass(i)}${eventCellClass}">
          ${gate ? renderGovernanceEvent(gate, boundaryClass) : ""}
          ${reviewCluster}
        </td>`;
      }).join("")}
    </tr>
    <tr class="gov-row-client">
      <td class="gov-bar-label-cell client">With Client</td>
      ${streamPhases.map((_, i) => `<td class="gov-cell-bar client${governanceBarClass(i)}"></td>`).join("")}
    </tr>
  `;

  checklistTable.appendChild(tfoot);

  const footerWrap = document.getElementById("matrixFooterWrap");
  if (footerWrap) footerWrap.style.display = "none";
}

// ─── Render: task board ───────────────────────────────────────────────────────

function renderBoard() {
  const phase            = phaseById(selectedPhaseId);
  const visibleCategories= categories.filter(category => selectedCategoryId === "all" || selectedCategoryId === category.id);
  let visibleTaskCount   = 0;
  let visibleDoneCount   = 0;

  const categoryLabel = selectedCategoryId === "all"
    ? "Toutes les categories"
    : categoryById(selectedCategoryId).name;

  boardTitle.textContent  = selectedCategoryId === "all"
    ? `${phase.title} ${phase.kicker}`.trim()
    : categoryLabel;
  categoryGrid.innerHTML  = "";

  visibleCategories.forEach(category => {
    const rawTasks = phase.data[category.id] || [];
    const tasks    = rawTasks.filter(task => matchesQuery(phase, category, task));
    visibleTaskCount += tasks.length;
    visibleDoneCount += tasks.filter(task => isTaskDone(phase, category, task)).length;

    if (query && rawTasks.length && !tasks.length) return;

    const card = document.createElement("article");
    card.className = `category-card${rawTasks.length ? "" : " empty"}`;
    card.innerHTML = `
      <header class="category-head">
        <img class="mark" src="${category.icon}">
        <h3 class="category-name">${category.name}</h3>
      </header>
      <div class="tasks"></div>
    `;

    const taskBox = card.querySelector(".tasks");
    if (!rawTasks.length) {
      taskBox.innerHTML = `<div class="empty-note">Aucune activite definie dans cette checklist.</div>`;
    } else if (!tasks.length) {
      taskBox.innerHTML = `<div class="empty-note">Aucun resultat pour cette recherche.</div>`;
    } else {
      tasks.forEach(task => {
        const button = document.createElement("button");
        button.type      = "button";
        button.className = `task${isTaskDone(phase, category, task) ? " done" : ""}`;
        button.innerHTML = `<span>${task}</span><span class="task-status">${isTaskDone(phase, category, task) ? "Fait" : "A faire"}</span>`;
        button.addEventListener("click", () => openDetail(phase, category, task));
        taskBox.appendChild(button);
      });
    }

    categoryGrid.appendChild(card);
  });

  taskCount.textContent  = `${visibleTaskCount} taches / ${visibleDoneCount} faites`;
  if (typeof selectionBody !== "undefined" && selectionBody) {
    selectionBody.innerHTML = `
    <strong>${phase.title} ${phase.kicker}</strong><br>
    ${phase.note}<br><br>
    <strong>${categoryLabel}</strong><br>
    ${visibleTaskCount} taches affichees, ${visibleDoneCount} cochees.
  `;
}
}

// ─── Drawer ───────────────────────────────────────────────────────────────────

function openDetail(phase, category, task) {
  const detail = detailByCategory[category.id];
  const done   = isTaskDone(phase, category, task);

  drawerTitle.textContent = task;
  drawerMeta.textContent  = `${phase.title} ${phase.kicker} / ${category.name}`.trim();
  drawerBody.innerHTML = `
    <section class="detail-section">
      <label class="done-control">
        <input id="doneCheckbox" type="checkbox" ${done ? "checked" : ""}>
        <span>Tache effectuee</span>
      </label>
    </section>
    <section class="detail-section">
      <h3>Objectif</h3>
      <p>${detail.objective}</p>
    </section>
    <section class="detail-section">
      <h3>Complements</h3>
      <p>Cette tache doit etre traitee pendant la phase <strong>${phase.title}</strong> pour securiser la categorie <strong>${category.name}</strong>. Elle sert de point d'entree vers les documents, decisions, owners et preuves associes dans la bibliotheque de donnees.</p>
    </section>
    <section class="detail-section">
      <h3>Elements a rattacher</h3>
      <ul>${detail.evidence.map(item => `<li>${item}</li>`).join("")}</ul>
    </section>
    <section class="detail-section">
      <h3>Questions de controle</h3>
      <ul>${detail.questions.map(item => `<li>${item}</li>`).join("")}</ul>
    </section>
  `;

  document.getElementById("doneCheckbox").addEventListener("change", event => {
    setTaskDone(phase, category, task, event.target.checked);
    render();
  });

  drawer.classList.add("open");
}

function closeDrawer() {
  drawer.classList.remove("open");
}

function render() {
  renderMatrix();
  renderBoard();
  renderGovernanceStrip();
}


document.getElementById("closeDrawer").addEventListener("click", closeDrawer);
document.getElementById("drawerBackdrop").addEventListener("click", closeDrawer);
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeDrawer();
});

render();