/* ABC BODY — Prototipo v0.1 (sin servidor; datos guardados en este navegador) */
(function () {
  "use strict";

  const STORE_KEY = "abcbody.v01";
  const LEVEL_IDS = LEVELS.map(l => l.id);
  const $ = sel => document.querySelector(sel);

  /* ---------- Utilidades ---------- */
  function rng(seed) { // mulberry32, para datos demo reproducibles
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const unitsOf = lvl => UNITS.filter(u => u.level === lvl);
  const levelIndex = lvl => LEVEL_IDS.indexOf(lvl);
  const gradeOfGroup = g => g.replace(/[A-Z]$/, "");

  /* ---------- Estado ---------- */
  function seedState() {
    const r = rng(42);
    const students = {};
    Object.entries(DEMO_GROUPS).forEach(([group, names]) => {
      const lvl = GRADE_LEVEL[gradeOfGroup(group)];
      const li = levelIndex(lvl);
      names.forEach((name, i) => {
        const s = { group, quiz: {}, practice: {}, comp: {}, athlete: false, tests: [] };
        UNITS.forEach(u => {
          const ui = levelIndex(u.level);
          if (ui < li) { // niveles anteriores: mayormente logrados
            s.quiz[u.id] = r() < 0.9 ? 3 : 2;
            s.practice[u.id] = 1 + Math.floor(r() * 3);
            s.comp[u.id] = r() < 0.15 ? 2 : (r() < 0.55 ? 3 : 4);
          } else if (ui === li && !u.optional) { // nivel actual: en progreso
            if (r() < 0.65) s.quiz[u.id] = 1 + Math.floor(r() * 3);
            if (r() < 0.5) s.practice[u.id] = 1 + Math.floor(r() * 2);
            const x = r();
            s.comp[u.id] = x < 0.25 ? 0 : x < 0.45 ? 1 : x < 0.7 ? 2 : x < 0.92 ? 3 : 4;
          }
        });
        if (group === "11°A" && i % 3 === 0) {
          s.athlete = true;
          s.sport = ["Fútbol", "Atletismo", "Natación"][i % 3 === 0 ? (i / 3) % 3 : 0];
          s.tests = [
            { name: "Salto horizontal", value: (190 + Math.round(r() * 60)) + " cm", date: "2026-08-12" },
            { name: "Sprint 30 m", value: (4.2 + r() * 0.6).toFixed(2) + " s", date: "2026-08-12" },
            { name: "Carrera 2,4 km", value: "9:" + String(Math.round(r() * 59)).padStart(2, "0") + " min", date: "2026-08-19" }
          ];
        }
        students[name] = s;
      });
    });
    // Sofía: estudiante protagonista del demo, con progreso claro en PL4
    const so = students["Sofía Rojas"];
    so.quiz = Object.assign(so.quiz, { u10: 3, u11: 3 });
    so.practice = Object.assign(so.practice, { u10: 2, u11: 1 });
    so.comp = Object.assign(so.comp, { u10: 3, u11: 2, u12: 0, u13: 0 });
    delete so.quiz.u12; delete so.quiz.u13; delete so.practice.u12; delete so.practice.u13;
    return { role: "student", student: "Sofía Rojas", group: "7°A", teacherLevel: null, family: "Sofía Rojas", students };
  }

  let state;
  function load() {
    try { const raw = localStorage.getItem(STORE_KEY); state = raw ? JSON.parse(raw) : seedState(); }
    catch (e) { state = seedState(); }
  }
  function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* sin almacenamiento */ } }

  /* ---------- Métricas ---------- */
  function unitProgress(s, u) {
    const theory = Math.round(((s.quiz[u.id] || 0) / u.quiz.length) * 100);
    const practice = Math.round(Math.min(s.practice[u.id] || 0, 3) / 3 * 100);
    const comp = s.comp[u.id] || 0;
    const done = theory >= 67 && (s.practice[u.id] || 0) >= 1 && comp >= 3;
    return { theory, practice, comp, done };
  }
  function levelDone(s, lvl) { return unitsOf(lvl).filter(u => !u.optional).every(u => unitProgress(s, u).done); }
  function studentLevel(s) { return GRADE_LEVEL[gradeOfGroup(s.group)]; }
  function xp(s) {
    let total = 0;
    UNITS.forEach(u => {
      total += (s.quiz[u.id] || 0) * 10 + Math.min(s.practice[u.id] || 0, 3) * 5;
      if ((s.comp[u.id] || 0) >= 3) total += 20;
    });
    return total;
  }
  function seal(pct) { return SEAL_RULES.find(r => pct >= r.min) || null; }

  /* ---------- Render principal ---------- */
  function render() {
    document.querySelectorAll(".role-tab").forEach(b => b.classList.toggle("active", b.dataset.role === state.role));
    const views = { student: viewStudent, teacher: viewTeacher, school: viewSchool, family: viewFamily };
    $("#main").innerHTML = views[state.role]();
    bind();
  }

  /* ---------- Vista Estudiante ---------- */
  function viewStudent() {
    const s = state.students[state.student];
    const lvl = studentLevel(s), li = levelIndex(lvl);
    const options = Object.keys(state.students).map(n =>
      `<option ${n === state.student ? "selected" : ""}>${esc(n)}</option>`).join("");
    const path = LEVELS.map((L, i) => {
      const locked = i > li;
      const done = levelDone(s, L.id);
      const nodes = unitsOf(L.id).map((u, k) => {
        const p = unitProgress(s, u);
        const d = DOMAINS[u.domain];
        const cls = locked ? "locked" : p.done ? "done" : (p.theory || p.practice || p.comp) ? "progress" : "";
        return `<button class="node ${cls} ${k % 2 ? "right" : "left"}" data-unit="${u.id}" ${locked ? "disabled" : ""}
          style="--c:${d.color}" title="${esc(u.title)}">
          <span class="node-icon">${locked ? "🔒" : p.done ? "⭐" : d.icon}</span>
          <span class="node-label">${esc(u.title)}${u.optional ? " <em>(opcional)</em>" : ""}</span></button>`;
      }).join("");
      return `<section class="level ${locked ? "is-locked" : ""}">
        <div class="level-head"><span class="pl">${L.id}</span><div><h3>${L.name} ${done ? "🏅" : ""}</h3>
        <p>${L.grades} · ${L.ages} años · ${L.goal}</p></div></div>
        <div class="nodes">${nodes}</div></section>`;
    }).join("");
    return `
      <div class="card hero">
        <div><label class="muted small">Estudiante (demo)</label>
          <select id="pick-student">${options}</select></div>
        <div class="stats">
          <div><b>${lvl}</b><span>Nivel actual</span></div>
          <div><b>${xp(s)}</b><span>XP</span></div>
          <div><b>${LEVELS.filter(L => levelDone(s, L.id)).length}/7</b><span>Insignias</span></div>
        </div>
      </div>
      <p class="muted small">Cada unidad se completa con 3 evidencias: <b>Teoría</b> (quiz), <b>Práctica</b> (registro) y <b>Competencia</b> (validada por tu docente).</p>
      <div class="path">${path}</div>`;
  }

  function openUnit(id) {
    const u = UNITS.find(x => x.id === id);
    const s = state.students[state.student];
    const p = unitProgress(s, u), d = DOMAINS[u.domain], st = STATES[p.comp];
    const bar = (label, v, c) => `<div class="bar"><span>${label}</span><div><i style="width:${v}%;background:${c}"></i></div><b>${v}%</b></div>`;
    const quiz = u.quiz.map((q, qi) => `<fieldset class="q"><legend>${qi + 1}. ${esc(q.q)}</legend>
      ${q.options.map((o, oi) => `<label><input type="radio" name="q${qi}" value="${oi}"> ${esc(o)}</label>`).join("")}</fieldset>`).join("");
    $("#modal-body").innerHTML = `
      <div class="modal-head" style="--c:${d.color}"><span>${d.icon} ${d.name} · ${u.level}</span><h2>${esc(u.title)}</h2></div>
      ${bar("Teoría", p.theory, "#2F80ED")}${bar("Práctica", p.practice, "#F2994A")}
      ${bar("Competencia", p.comp * 25, "#27AE60")}
      <div class="tabs">
        <button class="tab active" data-tab="t-learn">1 · Aprende</button>
        <button class="tab" data-tab="t-quiz">2 · Quiz</button>
        <button class="tab" data-tab="t-practice">3 · Practica</button>
        <button class="tab" data-tab="t-comp">4 · Demuestra</button>
      </div>
      <div class="tabpane" id="t-learn">${u.lesson.map(t => `<p>${esc(t)}</p>`).join("")}</div>
      <div class="tabpane hidden" id="t-quiz"><form id="quiz-form">${quiz}
        <button class="btn" type="submit">Revisar respuestas</button><p id="quiz-result" class="small"></p></form></div>
      <div class="tabpane hidden" id="t-practice"><p><b>Reto:</b> ${esc(u.practice)}</p>
        <p class="small muted">Registros: ${s.practice[u.id] || 0}. El registro cuenta como práctica, no como competencia.</p>
        <button class="btn" id="log-practice">✔ Registrar práctica de hoy</button></div>
      <div class="tabpane hidden" id="t-comp"><p><b>Competencia observable:</b> ${esc(u.competency)}</p>
        <p>Estado: <span class="chip" style="background:${st.color}">${st.name}</span></p>
        <p class="small muted">Solo tu docente puede validar esta competencia, en clase.</p></div>`;
    $("#modal").classList.remove("hidden");
    $("#modal").dataset.unit = id;
    document.querySelectorAll(".tab").forEach(t => t.onclick = () => {
      document.querySelectorAll(".tab").forEach(x => x.classList.toggle("active", x === t));
      document.querySelectorAll(".tabpane").forEach(x => x.classList.toggle("hidden", x.id !== t.dataset.tab));
    });
    $("#quiz-form").onsubmit = e => {
      e.preventDefault();
      let ok = 0, answered = 0;
      u.quiz.forEach((q, qi) => {
        const sel = document.querySelector(`input[name="q${qi}"]:checked`);
        const fs = document.querySelectorAll(".q")[qi];
        fs.classList.remove("right", "wrong");
        if (sel) { answered++; const good = +sel.value === q.a; if (good) ok++; fs.classList.add(good ? "right" : "wrong"); }
      });
      if (answered < u.quiz.length) { $("#quiz-result").textContent = "Responde todas las preguntas."; return; }
      s.quiz[u.id] = Math.max(s.quiz[u.id] || 0, ok); save();
      $("#quiz-result").textContent = `${ok}/${u.quiz.length} correctas. ${ok >= 2 ? "¡Teoría aprobada!" : "Repasa la lección e inténtalo de nuevo."}`;
    };
    $("#log-practice").onclick = () => { s.practice[u.id] = (s.practice[u.id] || 0) + 1; save(); openUnit(id); };
  }

  /* ---------- Vista Docente ---------- */
  function viewTeacher() {
    const group = state.group;
    const lvl = state.teacherLevel || GRADE_LEVEL[gradeOfGroup(group)];
    const units = unitsOf(lvl);
    const names = DEMO_GROUPS[group];
    let pending = 0;
    const rows = names.map(n => {
      const s = state.students[n];
      const cells = units.map(u => {
        const v = s.comp[u.id] || 0; if (v === 0) pending++;
        const st = STATES[v];
        return `<td><button class="cell" data-student="${esc(n)}" data-unit="${u.id}" style="background:${st.color}"
          title="${esc(n)} · ${esc(u.title)}: ${st.name}">${st.short}</button></td>`;
      }).join("");
      return `<tr><th>${esc(n)}</th>${cells}</tr>`;
    }).join("");
    const groupOpts = Object.keys(DEMO_GROUPS).map(g => `<option ${g === group ? "selected" : ""}>${g}</option>`).join("");
    const lvlOpts = LEVELS.map(L => `<option value="${L.id}" ${L.id === lvl ? "selected" : ""}>${L.id} · ${L.name}</option>`).join("");
    const head = units.map(u => `<th class="rot" title="${esc(u.competency)}">${DOMAINS[u.domain].icon} ${esc(u.title)}</th>`).join("");
    return `
      <div class="card row">
        <label>Grupo <select id="pick-group">${groupOpts}</select></label>
        <label>Nivel <select id="pick-level">${lvlOpts}</select></label>
        <div class="kpi"><b>${pending}</b><span>competencias sin evaluar</span></div>
      </div>
      <div class="card"><h3>Evaluación por competencias · ${group} · ${lvl}</h3>
        <p class="small muted">Toca una celda para cambiar el estado: — → Inicial → En desarrollo → Competente → Consolidada. Pasa el cursor por el título para ver la competencia observable.</p>
        <div class="table-wrap"><table class="matrix"><thead><tr><th>Estudiante</th>${head}</tr></thead><tbody>${rows}</tbody></table></div>
        <div class="legend">${STATES.slice(1).map(s => `<span><i style="background:${s.color}"></i>${s.name}</span>`).join("")}</div>
      </div>
      <div class="card"><h3>Rúbricas del nivel</h3>
        ${units.map(u => `<details><summary>${DOMAINS[u.domain].icon} ${esc(u.title)}</summary><p>${esc(u.competency)}</p>
        <p class="small muted">Alineación MEP: ${esc(u.mep)}</p></details>`).join("")}
      </div>`;
  }

  /* ---------- Vista Colegio ---------- */
  function groupPct(group) {
    const lvl = GRADE_LEVEL[gradeOfGroup(group)];
    let ok = 0, total = 0;
    DEMO_GROUPS[group].forEach(n => {
      const s = state.students[n];
      UNITS.filter(u => levelIndex(u.level) <= levelIndex(lvl) && !u.optional).forEach(u => {
        total++; if ((s.comp[u.id] || 0) >= 3) ok++;
      });
    });
    return Math.round(ok / total * 100);
  }
  function viewSchool() {
    const r = rng(7);
    const gradeRows = SCHOOL.grades.map(g => {
      const real = Object.keys(DEMO_GROUPS).find(k => gradeOfGroup(k) === g);
      const pct = real ? groupPct(real) : Math.round(55 + r() * 35);
      return { g, pct, real: !!real };
    });
    const avg = Math.round(gradeRows.reduce((a, x) => a + x.pct, 0) / gradeRows.length);
    const sl = seal(avg);
    const domainStats = Object.entries(DOMAINS).map(([k, d]) => {
      let ok = 0, total = 0;
      Object.keys(DEMO_GROUPS).forEach(gr => DEMO_GROUPS[gr].forEach(n => {
        const s = state.students[n], lvl = GRADE_LEVEL[gradeOfGroup(gr)];
        UNITS.filter(u => u.domain === k && !u.optional && levelIndex(u.level) <= levelIndex(lvl)).forEach(u => {
          total++; if ((s.comp[u.id] || 0) >= 3) ok++;
        });
      }));
      return { d, pct: total ? Math.round(ok / total * 100) : 0 };
    });
    const athletes = Object.values(state.students).filter(s => s.athlete).length;
    return `
      <div class="card hero seal-card">
        <div class="seal" style="--s:${sl ? sl.color : "#ccc"}"><span>ABC BODY</span><b>${sl ? sl.name : "En proceso"}</b><small>${new Date().getFullYear()}</small></div>
        <div><h2>${SCHOOL.name}</h2>
          <p><b>${avg}%</b> de competencias logradas (≥ Competente) en el nivel esperado por grado.</p>
          <p class="small muted">Criterio interno provisional: Bronce ≥50% · Plata ≥70% · Oro ≥85%, más docentes certificados. Aún no validado ni avalado externamente.</p></div>
      </div>
      <div class="grid2">
        <div class="card"><h3>Por grado</h3>
          ${gradeRows.map(x => `<div class="bar"><span>${x.g} · ${GRADE_LEVEL[x.g]}</span><div><i style="width:${x.pct}%;background:#2F80ED"></i></div><b>${x.pct}%</b></div>`).join("")}
          <p class="small muted">7° y 11° con datos de grupos demo; el resto son valores simulados.</p></div>
        <div class="card"><h3>Por dominio</h3>
          ${domainStats.map(x => `<div class="bar"><span>${x.d.icon} ${x.d.name}</span><div><i style="width:${x.pct}%;background:${x.d.color}"></i></div><b>${x.pct}%</b></div>`).join("")}
          <div class="kpis"><div class="kpi"><b>3/4</b><span>docentes certificados (demo)</span></div>
          <div class="kpi"><b>${athletes}</b><span>perfiles de alto rendimiento</span></div></div></div>
      </div>
      <div class="card"><h3>Perfil del graduado ABC BODY</h3>
        <ul class="checks"><li>Domina habilidades motrices fundamentales y las aplica en varios deportes.</li>
        <li>Entiende cómo funciona su cuerpo y cómo responde al entrenamiento.</li>
        <li>Toma decisiones informadas sobre alimentación, hidratación y sueño (sin prescripción clínica).</li>
        <li>Diseña, ejecuta y evalúa su propio plan de entrenamiento (proyecto Self-Coach).</li>
        <li>Opcional: perfil deportivo documentado para procesos de reclutamiento universitario.</li></ul></div>`;
  }

  /* ---------- Vista Familia / Pasaporte ---------- */
  function viewFamily() {
    const name = state.family, s = state.students[name];
    const opts = Object.keys(state.students).map(n => `<option ${n === name ? "selected" : ""}>${esc(n)}</option>`).join("");
    const lvl = studentLevel(s), li = levelIndex(lvl);
    const badges = LEVELS.map(L => `<div class="badge ${levelDone(s, L.id) ? "on" : ""}"><b>${L.id}</b><span>${L.name}</span></div>`).join("");
    const comps = UNITS.filter(u => levelIndex(u.level) <= li).map(u => {
      const st = STATES[s.comp[u.id] || 0];
      return `<tr><td>${u.level}</td><td>${DOMAINS[u.domain].icon} ${esc(u.title)}</td><td><span class="chip" style="background:${st.color}">${st.name}</span></td></tr>`;
    }).join("");
    const practices = Object.values(s.practice).reduce((a, b) => a + b, 0);
    const athlete = s.athlete ? `
      <div class="card"><h3>🏆 Perfil deportivo · ${esc(s.sport || "")}</h3>
        <table class="simple"><thead><tr><th>Prueba</th><th>Resultado</th><th>Fecha</th></tr></thead>
        <tbody>${s.tests.map(t => `<tr><td>${esc(t.name)}</td><td>${esc(t.value)}</td><td>${esc(t.date)}</td></tr>`).join("")}</tbody></table>
        <form id="test-form" class="row"><input name="name" placeholder="Prueba" required><input name="value" placeholder="Resultado" required>
          <input name="date" type="date" required><button class="btn">Agregar</button></form>
        <p class="small muted">Resultados medidos por el docente con protocolo estandarizado. Pensado para compartir con universidades y reclutadores.</p></div>`
      : `<div class="card"><p class="muted">Ruta de alto rendimiento: no activada. <button class="btn ghost" id="enable-athlete">Activar perfil deportivo</button></p></div>`;
    return `
      <div class="card hero"><div><label class="muted small">Pasaporte de</label><select id="pick-family">${opts}</select>
        <p class="small muted">${esc(s.group)} · Nivel ${lvl}</p></div>
        <div class="stats"><div><b>${xp(s)}</b><span>XP</span></div><div><b>${practices}</b><span>prácticas registradas</span></div>
        <button class="btn ghost" onclick="window.print()">🖨 Imprimir pasaporte</button></div></div>
      <div class="card"><h3>Insignias de nivel</h3><div class="badges">${badges}</div></div>
      <div class="card"><h3>Competencias</h3><div class="table-wrap"><table class="simple"><thead><tr><th>Nivel</th><th>Unidad</th><th>Estado</th></tr></thead><tbody>${comps}</tbody></table></div></div>
      ${athlete}`;
  }

  /* ---------- Eventos ---------- */
  function bind() {
    const on = (sel, ev, fn) => { const el = $(sel); if (el) el[ev] = fn; };
    on("#pick-student", "onchange", e => { state.student = e.target.value; save(); render(); });
    on("#pick-group", "onchange", e => { state.group = e.target.value; state.teacherLevel = null; save(); render(); });
    on("#pick-level", "onchange", e => { state.teacherLevel = e.target.value; save(); render(); });
    on("#pick-family", "onchange", e => { state.family = e.target.value; save(); render(); });
    on("#enable-athlete", "onclick", () => { state.students[state.family].athlete = true; save(); render(); });
    on("#test-form", "onsubmit", e => {
      e.preventDefault(); const f = new FormData(e.target);
      state.students[state.family].tests.push({ name: f.get("name"), value: f.get("value"), date: f.get("date") });
      save(); render();
    });
    document.querySelectorAll(".node:not([disabled])").forEach(b => b.onclick = () => openUnit(b.dataset.unit));
    document.querySelectorAll(".cell").forEach(b => b.onclick = () => {
      const s = state.students[b.dataset.student];
      s.comp[b.dataset.unit] = ((s.comp[b.dataset.unit] || 0) + 1) % STATES.length;
      save(); render();
    });
  }

  function init() {
    load();
    document.querySelectorAll(".role-tab").forEach(b => b.onclick = () => { state.role = b.dataset.role; save(); render(); });
    $("#modal-close").onclick = () => { $("#modal").classList.add("hidden"); render(); };
    $("#modal").onclick = e => { if (e.target.id === "modal") { $("#modal").classList.add("hidden"); render(); } };
    $("#reset").onclick = () => { if (window.confirm("¿Restablecer los datos de demostración?")) { state = seedState(); save(); render(); } };
    render();
  }
  document.addEventListener("DOMContentLoaded", init);
})();
