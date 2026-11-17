/* ABC BODY V18.7 — Mi Trayectoria visual. Solo lectura del modelo existente. */
(() => {
  'use strict';
  const root = document.querySelector('#trayectoria > .card');
  if (!root || typeof renderTrajectory !== 'function') return;
  const clean = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const cap = (n, total) => Math.max(0, Math.min(total, n));
  const levelNames = {inicial:'Inicial', desarrollo:'En desarrollo', demostrado:'Autoevaluada', competente:'Competente', consolidada:'Consolidada'};
  const dateValue = value => /^\d{4}-\d{2}-\d{2}$/.test(value || '') ? value : '';
  const safeDate = value => dateValue(value) ? value.split('-').reverse().join('/') : 'Sin fecha';
  const circle = (ratio, label) => {
    const n = Math.round(100 * cap(ratio, 1));
    return `<div class="tr-ring" style="--tr-percent:${n}"><div><b>${clean(label)}</b><small>de 13 semanas</small></div></div>`;
  };
  const toWeek = (w, screen = 'academia') => {
    s.week = Number(w);
    persist();
    show(screen);
  };
  function draw() {
    const weeks = currentWeeks().slice().sort((a,b) => a.week - b.week);
    if (!weeks.length) return;
    const ids = new Set(weeks.map(w => w.id));
    const domainList = [...new Map(weeks.map(w => [w.domain_id, w.domain])).entries()];
    const submissions = (s.submissions || []).filter(r => ids.has(r.id));
    const practiceWeeks = new Set(submissions.map(r => r.id));
    const reviewed = weeks.filter(w => !!s.academy?.[w.id]?.reviewed);
    const reflections = weeks.filter(w => !!s.academy?.[w.id]?.answer);
    const quizzes = weeks.filter(w => s.academy?.[w.id]?.quiz?.submitted && s.academy?.[w.id]?.quiz?.v === 2);
    const activeWeeks = new Set([...practiceWeeks, ...reviewed.map(w => w.id)]);
    const validations = domainList.filter(([id]) => validationFor(id)?.nivel === 'competente' || validationFor(id)?.nivel === 'consolidada');
    const self = domainList.filter(([id]) => !!s.states?.[id] && s.states[id] !== 'inicial');
    const stats = [
      {i:'calendar-check',n:`${activeWeeks.size}/52`,t:'Semanas con actividad'},
      {i:'book-open',n:`${reviewed.length}/52`,t:'Teoría revisada'},
      {i:'video',n:`${practiceWeeks.size}/52`,t:'Prácticas registradas'},
      {i:'shield-check',n:`${validations.length}/${domainList.length}`,t:'Competencias validadas'}
    ];
    const cycles = [1,2,3,4].map(c => {
      const section = weeks.filter(w => w.week > (c-1)*13 && w.week <= c*13);
      const complete = section.filter(w => activeWeeks.has(w.id)).length;
      return `<button class="tr-cycle" type="button" data-tr-cycle="${c}" aria-label="Abrir ciclo ${c} en Ruta Anual">${circle(complete/13,`${complete}/13`)}<strong>Ciclo ${c}</strong><span>Semanas ${(c-1)*13+1}–${c*13}</span><small>${complete} con actividad</small></button>`;
    }).join('');
    const levels = domainList.map(([id, name]) => {
      const v = validationFor(id);
      const validated = v && ['competente','consolidada'].includes(v.nivel);
      const level = s.states?.[id] || 'inicial';
      const status = validated ? `Docente: ${levelNames[v.nivel]}` : level !== 'inicial' ? levelNames[level] || 'Autoevaluada' : 'Sin avance registrado';
      const type = validated ? 'verified' : level !== 'inicial' ? 'self' : 'empty';
      const detail = validated ? `Validada por ${clean(v.docente||'docente')} · ${safeDate(v.fecha)}` : level !== 'inicial' ? 'Autoevaluación, no validación docente' : 'Aún no hay evaluación de esta competencia';
      return `<div class="tr-skill"><div class="tr-skill-top"><strong>${clean(name)}</strong><span class="tr-status ${type}">${clean(status)}</span></div><div class="tr-skill-track"><span class="${type}"></span></div><small>${detail}</small></div>`;
    }).join('');
    const eventList = [];
    const addEvent = (w, kind, title, date, extra, tab) => eventList.push({week:w.week,id:w.id,date:dateValue(date),kind,title,extra,tab});
    for (const w of weeks) {
      const a=s.academy?.[w.id] || {};
      if (a.reviewed) addEvent(w,'theory','Teoría revisada',a.date,'Lección de Academia','academia');
      if (a.quiz?.submitted && a.quiz?.v === 2) addEvent(w,'quiz','Cuestionario contestado',a.date,`${a.quiz.score}/${(a.quiz.answers||[]).length} respuestas correctas`,'academia');
      if (a.answer) addEvent(w,'reflection','Reflexión guardada',a.date,String(a.answer).slice(0,160),'academia');
    }
    for (const r of submissions) {
      const w=weeks.find(x=>x.id===r.id);
      if (w) addEvent(w,'practice','Práctica registrada',r.date,r.mode === 'video' ? 'Evidencia en video local' : 'Observación presencial registrada','evidencia');
    }
    for (const [id] of domainList) {
      const v=validationFor(id); if (!v) continue;
      const w=weeks.find(x=>x.id===v.ficha) || weeks.find(x=>x.domain_id===id);
      if(w) addEvent(w,'validation','Evaluación docente registrada',v.fecha,`${levelNames[v.nivel]||v.nivel} · ${v.docente||'Docente'}`,'evidencia');
    }
    eventList.sort((a,b) => (b.date||'').localeCompare(a.date||'') || b.week - a.week);
    const history=eventList.slice(0,12).map(e => `<div class="tr-event"><span class="tr-event-icon ${e.kind}" aria-hidden="true">${{theory:'▤',quiz:'✓',reflection:'✎',practice:'▶',validation:'★'}[e.kind]}</span><div><strong>${clean(e.title)}</strong><p>Semana ${e.week} · ${clean(e.extra)} · ${safeDate(e.date)}</p></div><button type="button" class="tr-text-button" data-tr-week="${e.week}" data-tr-screen="${e.tab}">Ver</button></div>`).join('') || '<p class="tr-empty">Tu historial aparecerá aquí cuando revises una lección, respondas un cuestionario o registres una práctica.</p>';
    const current=weeks.find(w => w.week===Number(s.week)) || weeks[0];
    const a=s.academy?.[current.id]||{};
    let next;
    if(!a.reviewed) next={title:'Revisar la teoría',subtitle:`Semana ${current.week} · ${current.title}`,tab:'academia'};
    else if(!a.quiz?.submitted || a.quiz?.v !== 2) next={title:'Comprobar lo aprendido',subtitle:`Semana ${current.week} · Cuestionario`,tab:'academia'};
    else if(!practiceWeeks.has(current.id)) next={title:'Registrar la práctica',subtitle:`Semana ${current.week} · Evidencia u observación`,tab:'evidencia'};
    else next={title:'Continuar la ruta de aprendizaje',subtitle:'Explora tu próxima semana o consulta la evaluación docente',tab:'ruta'};
    root.innerHTML=`<section class="tr" aria-label="Mi trayectoria"><div class="tr-hero"><div><div class="tr-eyebrow">ABC BODY / MI TRAYECTORIA</div><h2>Tu evolución, paso a paso.</h2><p>Cada habilidad que aprendes forma parte de tu historia.</p><div class="tr-context">${clean(current.program)} · ${clean(current.cohort_label||s.age)} años · Ciclo ${Math.ceil(current.week/13)} de 4</div></div><span class="tr-hero-mark" aria-hidden="true">↗</span></div>
      <div class="tr-stats">${stats.map(x=>`<div class="tr-stat"><span aria-hidden="true">${({ 'calendar-check':'◫','book-open':'▤','video':'▶','shield-check':'✓'})[x.i]}</span><b>${clean(x.n)}</b><small>${x.t}</small></div>`).join('')}</div>
      <div class="tr-main-grid"><section class="tr-panel"><div class="tr-heading"><div><div class="tr-label">AVANCE ANUAL</div><h3>Tu recorrido de 52 semanas</h3></div><span class="tr-hint">Semanas con actividad, no competencias certificadas</span></div><div class="tr-cycles">${cycles}</div></section>
      <section class="tr-panel tr-next"><div class="tr-label">SIGUIENTE PASO</div><h3>${clean(next.title)}</h3><p>${clean(next.subtitle)}</p><button class="tr-main-button" type="button" id="trNext">Continuar →</button></section></div>
      <div class="tr-main-grid tr-bottom-grid"><section class="tr-panel"><div class="tr-heading"><div><div class="tr-label">COMPETENCIAS</div><h3>Lo que estás desarrollando</h3></div><span class="tr-hint">${validations.length} validadas · ${self.length} autoevaluadas</span></div><div class="tr-skills">${levels}</div><p class="tr-note">La autoevaluación y la participación no sustituyen una validación docente. Las barras representan estados, no porcentajes de dominio.</p></section>
      <section class="tr-panel"><div class="tr-heading"><div><div class="tr-label">HISTORIAL PERSONAL</div><h3>Actividad reciente</h3></div><span class="tr-hint">Últimos 12 eventos</span></div><div class="tr-events">${history}</div></section></div>
      <p class="tr-note tr-bottom-note">Progreso guardado localmente en tu navegador. Descarga respaldos periódicamente desde Perfil.</p></section>`;
    root.querySelectorAll('[data-tr-week]').forEach(b=>b.addEventListener('click',()=>toWeek(b.dataset.trWeek,b.dataset.trScreen)));
    root.querySelectorAll('[data-tr-cycle]').forEach(b=>b.addEventListener('click',()=>toWeek((Number(b.dataset.trCycle)-1)*13+1,'ruta')));
    root.querySelector('#trNext').addEventListener('click',()=>toWeek(current.week,next.tab));
  }
  // El núcleo llama a renderTrajectory() después de cada cambio de perfil o actividad.
  renderTrajectory = draw;
  draw();
})();
