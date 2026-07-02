// ─── State ────────────────────────────────────────────────────────────────────

let selectedPhaseId    = "opportunity";
let selectedCategoryId = "all";
let query              = "";

// ─── DOM references ───────────────────────────────────────────────────────────

const bidTrack      = document.getElementById("bidTrack");
const realTrack     = document.getElementById("realTrack");
const procedureList = document.getElementById("procedureList");
const drawer        = document.getElementById("drawer");
const drawerTitle   = document.getElementById("drawerTitle");
const drawerMeta    = document.getElementById("drawerMeta");
const drawerBody    = document.getElementById("drawerBody");

// ─── Helpers ──────────────────────────────────────────────────────────────────

function gatesAfter(phaseId) {
  return gates.filter(g => g.afterPhase === phaseId);
}

// ─── Render: gate button ──────────────────────────────────────────────────────
function makeGateButton(gate) {
  const isRealGate = gate.stream === "real";

  // Wrapper positionné en relative pour ancrer le badge en absolute
  const wrapper = document.createElement("div");
  if (gate.border) {
    wrapper.className = `gate-wrapper gate-wrapper--border`;
  }
  else {
    wrapper.className = `gate-wrapper ${isRealGate ? "gate-wrapper--real" : "gate-wrapper--bid"}`;
  }

  // Badge : maintenant un <button> FRÈRE du gate-node (plus imbriqué dedans)
  // Il est positionné en absolute via CSS depuis le wrapper
  const badge = document.createElement("button");
  badge.type      = "button";
  badge.className = gate.badge === "Internal" ? "gate-node-badge" : "gate-node-badge2";
  badge.textContent = gate.badge;                       // ← texte visible
  badge.title       = gate.badge;
  badge.addEventListener("click", (e) => {
    e.stopPropagation();
    window.open(gate.link, "_blank");                   // même lien que le gate (à personnaliser)
  });

  // Bouton principal du gate (symbole + zone cliquable)
  const btn = document.createElement("button");
  btn.type      = "button";
  btn.className = isRealGate ? "gate-node2" : "gate-node";
  btn.title     = gate.title;
  btn.innerHTML = `<span class="gate-node-symbol">${gate.symbol}</span>`;
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    window.open(gate.link, "_blank");
  });

  // Titre sous le gate
  const title = document.createElement("p");
  if (gate.repeat) {
    title.className = "gate-node-title4"
  }
  else if (gate.title === "Kick Off Meetings" || gate.title === "Project Reviews" || gate.title === "Closure Meetings") {
    title.className = "gate-node-title2";
  } else if (gate.title === "Steering Comitees") {
    title.className = "gate-node-title3";
  } else {
    title.className = "gate-node-title";
  }
  title.innerHTML = gate.title;

  // En mode ≤1020px le wrapper couvre toute la surface visible du gate.
  // On y ajoute un listener de clic pour que le titre, les marges et toute
  // zone autour du bouton et du badge soient cliquables.
  // Le badge possède déjà un e.stopPropagation(), donc son lien propre est
  // préservé ; le bouton gate-node propage normalement jusqu'au wrapper.
  wrapper.addEventListener("click", () => window.open(gate.link, "_blank"));

  // Ordre : badge en premier (z-index géré par CSS), puis le bouton, puis le titre
  wrapper.appendChild(badge);
  wrapper.appendChild(btn);
  wrapper.appendChild(title);

  return wrapper;
}

// ─── Render: phase tracks ─────────────────────────────────────────────────────

function renderPhaseTracks() {
  bidTrack.innerHTML  = "";
  realTrack.innerHTML = "";

  const bidPhases = phases.filter(p => p.stream === "bid");
  bidPhases.forEach(phase => {
    const wrapper = document.createElement("div");
    wrapper.className = "phase-wrapper";

    const node = document.createElement("button");
    node.type      = "button";
    node.className = `phase-node ${phase.color}${phase.id === "handover" ? " phase-node--handover" : ""}`;
    node.innerHTML = `
      <span class="phase-title">${phase.title}</span>
      <span class="phase-kicker">${phase.kicker || "&nbsp;"}</span>
      <span class="phase-subtitle">${phase.note || "&nbsp;"}</span>
    `;
    node.addEventListener("click", () => {
      window.open(`matrix.html?phase=${phase.id}&from=lifecycle`, "_blank");
    });

    const note = document.createElement("p");
    note.className = "phase-note";
    note.textContent = phase.note;

    wrapper.appendChild(node);
    wrapper.appendChild(note);
    bidTrack.appendChild(wrapper);

    // Bid track — dans la boucle bidPhases.forEach
    const bidGates = gatesAfter(phase.id).filter(g => !g.stream || g.stream === "transition");
    bidGates.forEach((gate, i) => {
      const gateEl = makeGateButton(gate);
      if (i === bidGates.length - 1) gateEl.classList.add("gate-wrapper--last");
      bidTrack.appendChild(gateEl);
    });
  });

  const realPhases = phases.filter(p => p.stream === "real");
  realPhases.forEach(phase => {
    const wrapper = document.createElement("div");
    wrapper.className = "phase-wrapper";

    const node = document.createElement("button");
    node.type      = "button";
    node.className = `phase-node ${phase.color}${phase.id === "handover" ? " phase-node--handover" : ""}`;
    node.innerHTML = `
      <span class="phase-title">${phase.title}</span>
      <span class="phase-kicker">${phase.kicker || "&nbsp;"}</span>
    `;
    node.addEventListener("click", () => {
      window.open(`matrix.html?phase=${phase.id}&from=lifecycle`, "_blank");
    });

    const note = document.createElement("p");
    note.className = "phase-note";
    note.textContent = phase.note;

    wrapper.appendChild(node);
    wrapper.appendChild(note);
    realTrack.appendChild(wrapper);

    // Real track — dans la boucle realPhases.forEach
    const realGates = gatesAfter(phase.id).filter(g => g.stream === "real");
    realGates.forEach((gate, i) => {
      const gateEl = makeGateButton(gate);
      if (i === realGates.length - 1) gateEl.classList.add("gate-wrapper--last");
      realTrack.appendChild(gateEl);
    });
  });
}

// ─── Render: grande courbe orange + bande sable avec virage vers Initialisation ──

// ─── Utility: position of an element relative to an ancestor ─────────────────
// Uses offsetLeft/offsetTop so results are independent of scroll position
// and viewport width (no getBoundingClientRect drift).
function offsetRelativeTo(el, ancestor) {
  let top = 0, left = 0;
  let cur = el;
  while (cur && cur !== ancestor) {
    top  += cur.offsetTop;
    left += cur.offsetLeft;
    cur   = cur.offsetParent;
  }
  return {
    top,
    left,
    right:  left + el.offsetWidth,
    bottom: top  + el.offsetHeight,
    width:  el.offsetWidth,
    height: el.offsetHeight,
  };
}

function renderHandoverConnector() {
  ["handoverConnector", "realBackingSvg"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.remove();
  });

  // En dessous de 1020px le layout est réorganisé en colonne :
  // les SVG n'ont plus de sens et sont cachés par le CSS.
  if (window.innerWidth <= 1020) return;

  const lifecycle    = document.querySelector(".lifecycle");
  const realBacking  = document.querySelector(".real-backing");
  const handoverGate = bidTrack.lastElementChild;
  const initPhase    = realTrack.firstElementChild;

  if (!handoverGate || !realBacking || !lifecycle || !initPhase) return;

  // lifecycle must be the offset ancestor for our calculations
  lifecycle.style.position = lifecycle.style.position || "relative";
  lifecycle.style.overflow = "visible";

  const NS = "http://www.w3.org/2000/svg";

  // ── Mesures en coordonnées relatives à .lifecycle ──────────────────────────
  const hgPos   = offsetRelativeTo(handoverGate, lifecycle);
  const rbPos   = offsetRelativeTo(realBacking,  lifecycle);
  const initPos = offsetRelativeTo(initPhase,    lifecycle);

  const initNode     = initPhase.querySelector(".phase-node") || initPhase.firstElementChild;
  const initNodePos  = initNode ? offsetRelativeTo(initNode, lifecycle) : initPos;

  // ════════════════════════════════════════════════
  // SVG 1 — Grande courbe orange Handover → real-backing
  // ════════════════════════════════════════════════
  const strokeW = 60;
  const r       = strokeW / 2;

  const Ax = hgPos.right;
  const Ay = hgPos.top + hgPos.height / 3 - 18;

  const Dx = rbPos.left + 500;
  const Dy = rbPos.top  + rbPos.height / 2;

  const Bx = Math.max(Ax, Dx) + 90;
  const By = Ay;
  const Cx = Bx;
  const Cy = Dy;

  const curvePath =
    `M ${Ax} ${Ay}` +
    ` L ${Bx - r} ${By}` +
    ` Q ${Bx} ${By} ${Bx} ${By + r}` +
    ` L ${Cx} ${Cy - r}` +
    ` Q ${Cx} ${Cy} ${Cx - r} ${Cy}` +
    ` L ${Dx} ${Dy}`;

  const svg1 = document.createElementNS(NS, "svg");
  svg1.id = "handoverConnector";
  Object.assign(svg1.style, {
    position: "absolute", left: "0", top: "0",
    width: "100%", height: "100%",
    overflow: "visible", pointerEvents: "none", zIndex: "2",
  });

  const pathEl = document.createElementNS(NS, "path");
  pathEl.setAttribute("d",               curvePath);
  pathEl.setAttribute("fill",            "none");
  pathEl.setAttribute("stroke",          "var(--orange)");
  pathEl.setAttribute("stroke-width",    strokeW);
  pathEl.setAttribute("stroke-linecap",  "butt");
  pathEl.setAttribute("stroke-linejoin", "round");
  svg1.appendChild(pathEl);

  const arrowHalf = strokeW * 0.7;
  const arrowTip1 = document.createElementNS(NS, "polygon");
  arrowTip1.setAttribute("points", [
    `${Dx - 28},${Dy}`,
    `${Dx + 4},${Dy - arrowHalf}`,
    `${Dx + 4},${Dy + arrowHalf}`,
  ].join(" "));
  arrowTip1.setAttribute("fill", "var(--orange)");
  svg1.appendChild(arrowTip1);

  lifecycle.appendChild(svg1);

  // ════════════════════════════════════════════════
  // SVG 2 — Bande sable + virage + flèche vers Initialisation
  // ════════════════════════════════════════════════
  const bandH = strokeW * 0.85;
  const bandR = bandH * 0.7;

  const Px  = Dx + 10;
  const Py  = Dy;
  const Q1x = initNodePos.left + bandR + 10;
  const Q1y = Py;
  const Q2x = initNodePos.left + 10;
  const Q2y = Py;
  const Q3x = Q2x;
  const Q3y = initNodePos.top + initNodePos.height / 2 - 70;
  const dropY = Q3y;

  const bandPath =
    `M ${Px} ${Py}` +
    ` L ${Q1x} ${Q1y}` +
    ` Q ${Q2x} ${Q2y} ${Q2x} ${Q2y + bandR}` +
    ` L ${Q3x} ${dropY}`;

  const svg2 = document.createElementNS(NS, "svg");
  svg2.id = "realBackingSvg";
  Object.assign(svg2.style, {
    position: "absolute", left: "0", top: "0",
    width: "100%", height: "100%",
    overflow: "visible", pointerEvents: "none", zIndex: "1",
  });

  const bandEl = document.createElementNS(NS, "path");
  bandEl.setAttribute("d",               bandPath);
  bandEl.setAttribute("fill",            "none");
  bandEl.setAttribute("stroke",          "var(--sand)");
  bandEl.setAttribute("stroke-width",    bandH);
  bandEl.setAttribute("stroke-linecap",  "butt");
  bandEl.setAttribute("stroke-linejoin", "round");
  svg2.appendChild(bandEl);

  const fHalf = bandH / 2;
  const fLen  = 40;
  const fArrow = document.createElementNS(NS, "polygon");
  fArrow.setAttribute("points", [
    `${Q3x},${dropY + fLen}`,
    `${Q3x - fHalf},${dropY}`,
    `${Q3x + fHalf},${dropY}`,
  ].join(" "));
  fArrow.setAttribute("fill", "var(--sand)");
  svg2.appendChild(fArrow);

  lifecycle.appendChild(svg2);
}

// ─── Render: procedure list ───────────────────────────────────────────────────

document.addEventListener("click", function (e) {
  if (!e.target.closest(".proc-wrapper")) {
    document.querySelectorAll(".proc-sub-group").forEach(g => g.classList.remove("open"));
    document.querySelectorAll(".btn-procedure.is-expanded").forEach(b => b.classList.remove("is-expanded"));
  }
});

function renderProcedures() {
  procedureList.innerHTML = "";

  // ── Grid 1 : Home_procedures ──────────────────────────────────────────────
  Home_procedures.forEach(p => {
    const wrapper = document.createElement("div");
    wrapper.className = "proc-wrapper";

    const btn = document.createElement("button");
    btn.type = "button";
    if (p.name === "Procedure Communication & Stakeholders Mgt" ||
        p.name === "Procedure Quality & Continuous Improvement Mgt") {
      btn.className = "large-btn-procedure";
    } else {
      btn.className = "btn-procedure";
    }
    btn.textContent = p.name;

    if (p.keyDoc) {
      const subGroup = document.createElement("div");
      subGroup.className = "proc-sub-group";

      const btnProc = document.createElement("button");
      btnProc.type = "button";
      if (p.name === "Procedure Quality & Continuous Improvement Mgt") {
        btnProc.className = "btn-procedure btn-procedure--child2";
      } else {
        btnProc.className = "btn-procedure btn-procedure--child";
      }
      btnProc.textContent = p.name;
      btnProc.addEventListener("click", (e) => {
        e.stopPropagation();
        window.open(p.link, "_blank");
      });

      const btnDoc = document.createElement("button");
      btnDoc.type = "button";
      btnDoc.className = "btn-procedure btn-procedure--child btn-procedure--doc";
      btnDoc.textContent = p.keyDoc.label;
      btnDoc.addEventListener("click", (e) => {
        e.stopPropagation();
        window.open(p.keyDoc.link, "_blank");
      });

      subGroup.appendChild(btnProc);
      subGroup.appendChild(btnDoc);

      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        document.querySelectorAll(".proc-sub-group").forEach(g => {
          if (g !== subGroup) g.classList.remove("open");
        });
        document.querySelectorAll(".btn-procedure.is-expanded").forEach(b => {
          if (b !== btn) b.classList.remove("is-expanded");
        });
        subGroup.classList.toggle("open");
        btn.classList.toggle("is-expanded");
      });

      wrapper.appendChild(btn);
      wrapper.appendChild(subGroup);
    } else {
      btn.addEventListener("click", () => window.open(p.link, "_blank"));
      wrapper.appendChild(btn);
    }

    procedureList.appendChild(wrapper);
  });

  // ── Grid 2 : Home_procedures2 ─────────────────────────────────────────────
  // On crée un second conteneur dans l'aside si ce n'est pas déjà fait
  let procedureList2 = document.getElementById("procedureList2");
  if (!procedureList2) {
    procedureList2 = document.createElement("div");
    procedureList2.className = "procedure-list";
    procedureList2.id = "procedureList2";
    procedureList.parentNode.appendChild(procedureList2);
  }
  procedureList2.innerHTML = "";

  Home_procedures2.forEach(p => {
    const wrapper = document.createElement("div");
    wrapper.className = "proc-wrapper";

    const btn = document.createElement("button");
    btn.type = "button";
    if (p.keyDoc && (p.keyDoc.label === "PMQP" || p.keyDoc.label === "IS Plan")) {
      btn.className = "large-btn-procedure2";
    } else {
      btn.className = "btn-procedure2";
    }
    btn.textContent = p.name;

    if (p.keyDoc) {
      const subGroup = document.createElement("div");
      subGroup.className = "proc-sub-group";

      const btnProc = document.createElement("button");
      btnProc.type = "button";
      btnProc.className = "btn-procedure btn-procedure--child";
      btnProc.textContent = p.name;
      btnProc.addEventListener("click", (e) => {
        e.stopPropagation();
        window.open(p.link, "_blank");
      });

      const btnDoc = document.createElement("button");
      btnDoc.type = "button";
      btnDoc.className = "btn-procedure btn-procedure--child btn-procedure--doc";
      btnDoc.textContent = p.keyDoc.label;
      btnDoc.addEventListener("click", (e) => {
        e.stopPropagation();
        window.open(p.keyDoc.link, "_blank");
      });

      subGroup.appendChild(btnProc);
      subGroup.appendChild(btnDoc);

      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        document.querySelectorAll(".proc-sub-group").forEach(g => {
          if (g !== subGroup) g.classList.remove("open");
        });
        document.querySelectorAll(".btn-procedure.is-expanded").forEach(b => {
          if (b !== btn) b.classList.remove("is-expanded");
        });
        subGroup.classList.toggle("open");
        btn.classList.toggle("is-expanded");
      });

      wrapper.appendChild(btn);
      wrapper.appendChild(subGroup);
    } else {
      btn.addEventListener("click", () => window.open(p.link, "_blank"));
      wrapper.appendChild(btn);
    }

    procedureList2.appendChild(wrapper);
  });
}

// ─── Main render ──────────────────────────────────────────────────────────────

function render() {
  renderPhaseTracks();
  renderProcedures();
  scheduleHandoverConnectorRender();
}

// Un seul rAF suffit : offsetLeft/Top ne dépendent pas de la viewport,
// donc la scrollbar ou le zoom ne décalent plus les coordonnées.
function scheduleHandoverConnectorRender() {
  requestAnimationFrame(() => {
    renderHandoverConnector();
  });
}

// ─── Event listeners ─────────────────────────────────────────────────────────

document.getElementById("closeDrawer").addEventListener("click", closeDrawer);
document.getElementById("drawerBackdrop").addEventListener("click", closeDrawer);
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeDrawer();
});
window.addEventListener("resize", scheduleHandoverConnectorRender);

// Sécurité supplémentaire : si la taille de .lifecycle change après le
// premier rendu pour une raison quelconque (barre de défilement qui
// apparaît, zoom, police...), on recalcule la flèche automatiquement.
if (window.ResizeObserver) {
  const lifecycleEl = document.querySelector(".lifecycle");
  if (lifecycleEl) {
    new ResizeObserver(() => scheduleHandoverConnectorRender()).observe(lifecycleEl);
  }
}

// ─── Init ─────────────────────────────────────────────────────────────────────

render();