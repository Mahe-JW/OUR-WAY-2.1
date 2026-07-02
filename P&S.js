document.addEventListener("click", function (e) {
  if (!e.target.closest(".proc-wrapper")) {
    document.querySelectorAll(".proc-sub-group").forEach(g => g.classList.remove("open"));
    document.querySelectorAll(".btn-procedure.is-expanded").forEach(b => b.classList.remove("is-expanded"));
  }
});

// Render procedures
const procContainer = document.getElementById("procedureButtons");
PS_procedures.forEach(p => {
  const wrapper = document.createElement("div");
  wrapper.className = "proc-wrapper";

  const btn = document.createElement("button");
  btn.className = "btn-procedure3";
  btn.textContent = p.name;

  if (p.keyDoc) {
    // Sub-group with two child buttons
    const subGroup = document.createElement("div");
    subGroup.className = "proc-sub-group";

    const btnProc = document.createElement("button");
    if (p.name == "Procedure Quality & Continuous Improvement Mgt") {
      btnProc.className = "btn-procedure3 btn-procedure--child2";
    }
    else {
      btnProc.className = "btn-procedure3 btn-procedure--child";
    }
    btnProc.textContent = p.name;
    btnProc.addEventListener("click", (e) => {
      e.stopPropagation();
      window.open(p.link, "_blank");
    });

    const btnDoc = document.createElement("button");
    btnDoc.className = "btn-procedure3 btn-procedure--child btn-procedure--doc";
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

// Render meetings by level
const meetContainer = document.getElementById("meetingLevels");
levels.forEach(lvl => {
  const col = document.createElement("div");
  col.className = "meetings-col";
  col.innerHTML = `<div class="plc-row-arrows">
          <span class="row-arrow2">↓</span>
          <span class="row-arrow2">↓</span>
        </div>`;

  const pairs = [
    { internal: meetings[0], client: meetings[1] },
    { internal: meetings[2], client: meetings[3] },
    { internal: meetings[4], client: meetings[5] },
  ];

  pairs.forEach((pair, pairIndex) => {
    [pair.internal, pair.client].forEach(m => {
      const btn = document.createElement("button");
      btn.className = "btn-meeting";
      btn.textContent = `${m.label} ${lvl}`;
      btn.onclick = () => window.open(m.link, "_blank");
      col.appendChild(btn);
    });

    if (pairIndex < pairs.length - 1) {
      const spacer = document.createElement("div");
      spacer.style.marginBottom = "8px";
      col.appendChild(spacer);
    }
  });

  meetContainer.appendChild(col);
});