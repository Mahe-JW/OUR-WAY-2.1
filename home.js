// Close any open sub-buttons when clicking outside
document.addEventListener("click", function (e) {
  if (!e.target.closest(".proc-wrapper")) {
    document.querySelectorAll(".proc-sub-group").forEach(g => g.classList.remove("open"));
    document.querySelectorAll(".btn-procedure.is-expanded").forEach(b => b.classList.remove("is-expanded"));
  }
});

// Render procedures
const procContainer = document.getElementById("procedureButtons");
Home_procedures.forEach(p => {
  const wrapper = document.createElement("div");
  wrapper.className = "proc-wrapper";

  const btn = document.createElement("button");
  if (p.name == "Procedure Communication & Stakeholders Mgt" || p.name == "Procedure Quality & Continuous Improvement Mgt") {
    btn.className = "large-btn-procedure";
  } 
  else {
    btn.className = "btn-procedure";
  }
  btn.textContent = p.name;

  if (p.keyDoc) {
    // Sub-group with two child buttons
    const subGroup = document.createElement("div");
    subGroup.className = "proc-sub-group";

    const btnProc = document.createElement("button");
    if (p.name == "Procedure Quality & Continuous Improvement Mgt") {
      btnProc.className = "btn-procedure btn-procedure--child2";
    }
    else {
      btnProc.className = "btn-procedure btn-procedure--child";
    }
    btnProc.textContent = p.name;
    btnProc.addEventListener("click", (e) => {
      e.stopPropagation();
      window.open(p.link, "_blank");
    });

    const btnDoc = document.createElement("button");
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
      // Close others
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

  procContainer.appendChild(wrapper);
});

const procContainer2 = document.getElementById("procedureButtons2");
Home_procedures2.forEach(p => {
  const wrapper = document.createElement("div");
  wrapper.className = "proc-wrapper";

  const btn = document.createElement("button");
  if (p.keyDoc && (p.keyDoc.label == "PMQP" || p.keyDoc.label == "IS Plan")) {
    btn.className = "large-btn-procedure2";
  } 
  else {
    btn.className = "btn-procedure2";
  }
  btn.textContent = p.name;

  if (p.keyDoc) {
    // Sub-group with two child buttons
    const subGroup = document.createElement("div");
    subGroup.className = "proc-sub-group";

    const btnProc = document.createElement("button");
    btnProc.className = "btn-procedure btn-procedure--child";
    btnProc.textContent = p.name;
    btnProc.addEventListener("click", (e) => {
      e.stopPropagation();
      window.open(p.link, "_blank");
    });

    const btnDoc = document.createElement("button");
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
      // Close others
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

  procContainer2.appendChild(wrapper);
});

// Render meetings by level (accordion: one toggle button per level,
// expands to reveal the Internal/Client meeting buttons for that level)
const meetContainer = document.getElementById("meetingLevels");
const pairs = [
  { internal: meetings[0], client: meetings[1] },
  { internal: meetings[2], client: meetings[3] },
  { internal: meetings[4], client: meetings[5] },
];

levels.forEach(lvl => {
  const wrapper = document.createElement("div");
  wrapper.className = "level-wrapper";

  const toggleBtn = document.createElement("button");
  toggleBtn.className = "btn-level";
  toggleBtn.innerHTML = `<span class="card-icon">🗓️</span><span class="card-title">Governance ${lvl}</span>`;

  const subGroup = document.createElement("div");
  subGroup.className = "level-sub-group";

  pairs.forEach(pair => {
    const row = document.createElement("div");
    row.className = "meeting-pair";

    [
      { ...pair.internal, kind: "internal" },
      { ...pair.client, kind: "client" },
    ].forEach(m => {
      const btn = document.createElement("button");
      btn.className = `btn-meeting btn-meeting--${m.kind}`;
      btn.textContent = `${m.label} ${lvl}`;
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        window.open(m.link, "_blank");
      });
      row.appendChild(btn);
    });

    subGroup.appendChild(row);
  });

  toggleBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    // Each level opens/closes independently
    subGroup.classList.toggle("open");
    toggleBtn.classList.toggle("is-expanded");
  });

  wrapper.appendChild(toggleBtn);
  wrapper.appendChild(subGroup);
  meetContainer.appendChild(wrapper);
});