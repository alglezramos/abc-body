/* ABC BODY V19.0 — Pruebas físicas por ciclo (6 a 18 años).
   Cinco pruebas sencillas para hacer en casa con un adulto que mide. Cada resultado se compara
   solo con las marcas anteriores del mismo niño o niña: no hay tablas de normas ni rankings.
   Datos: s.tests = [{id, v, tries:[a,b], d, c, age, p}] en el mismo perfil local. */
(() => {
'use strict';
if (typeof s !== 'object' || typeof currentWeeks !== 'function' || document.getElementById('pruebas')) return;
if (!Array.isArray(s.tests)) s.tests = [];

const E = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const today = () => new Date().toLocaleDateString('en-CA');
const nice = d => { const [y,m,dd] = String(d).split('-').map(Number); return new Date(y, m-1, dd).toLocaleDateString('es-CR', {day:'numeric', month:'short', year:'numeric'}); };
const eligible = () => s.program === 'KIDS' || s.program === 'YOUTH';
const cycleNow = () => Math.ceil(Number(s.week || 1) / 13);
const young = () => Number(s.age) <= 8;

/* ---------- Las cinco pruebas ---------- */
const TESTS = [
 {id:'velocidad', icon:'⚡', name:'Carrera de velocidad', measures:'Velocidad', unit:'s', dec:2, lower:true, tool:'crono', min:1.5, max:15,
  param:() => young() ? 10 : 20, paramText:p => `${p} m`,
  material:p => ['Un espacio plano de al menos ' + (p+5) + ' m','Dos marcas (zapatos, botellas o cinta)','Un adulto con este cronómetro'],
  steps:p => [`Marca una línea de salida y otra de llegada a ${p} m. Deja 5 m libres después de la llegada para frenar.`,
    'El niño o la niña se pone de pie detrás de la salida.','El adulto dice «¡Ya!» y toca Iniciar al mismo tiempo.',
    'Toca Detener cuando el pecho cruce la llegada.','Descansen 2 minutos y hagan el segundo intento. Cuenta el mejor tiempo (el más bajo).'],
  safety:'Calzado deportivo y piso que no resbale. No correr hacia una pared u obstáculo.'},
 {id:'salto', icon:'🦘', name:'Salto de longitud sin impulso', measures:'Fuerza de piernas', unit:'cm', dec:0, lower:false, tool:'medida', min:20, max:350,
  param:() => 0, paramText:() => '',
  material:() => ['Cinta métrica','Cinta adhesiva o tiza para marcar la línea','Piso firme que no resbale'],
  steps:() => ['De pie detrás de la línea, con los pies separados al ancho de las caderas.','Balancea los brazos, flexiona las rodillas y salta hacia adelante con los dos pies.',
    'Cae con los dos pies y quédate quieto, sin dar pasos.','Mide desde la línea hasta el talón que quedó más cerca de la línea.','Haz dos intentos. Cuenta el más largo.'],
  safety:'No saltar sobre colchones blandos ni superficies resbaladizas. Si cae hacia atrás, repite el intento.'},
 {id:'equilibrio', icon:'🦩', name:'Equilibrio en un pie', measures:'Equilibrio', unit:'s', dec:1, lower:false, tool:'crono', min:0, max:60, cap:60,
  param:() => 0, paramText:() => '',
  material:() => ['Piso firme, sin zapatos','Un adulto con este cronómetro'],
  steps:() => ['Manos en la cintura. Elige el pie con el que te sientas más seguro.','Levanta el otro pie; el adulto toca Iniciar en ese momento.',
    'Toca Detener si apoya el pie, suelta las manos de la cintura o salta sobre el pie de apoyo.','El máximo es 60 segundos (se detiene solo).','Dos intentos. Cuenta el más largo.'],
  safety:'Hazlo cerca de una pared o de un adulto por si pierde el equilibrio.'},
 {id:'atrapar', icon:'🎾', name:'Lanzar y atrapar contra la pared', measures:'Coordinación ojo-mano', unit:'atrapes', dec:0, lower:false, tool:'cuenta', secs:30, min:0, max:80,
  param:() => young() ? 1.5 : 2, paramText:p => `a ${String(p).replace('.',',')} m · 30 s`,
  material:p => ['Una pelota pequeña que rebote (de tenis o similar)','Una pared lisa sin ventanas',`Una marca en el piso a ${String(p).replace('.',',')} m de la pared`],
  steps:() => ['Párate detrás de la marca, frente a la pared.','Al iniciar, lanza la pelota contra la pared y atrápala antes de que toque el piso (puede rebotar una vez si tienes 8 años o menos).',
    'Toca +1 por cada atrape. Si se cae, recógela y sigue.','La prueba dura 30 segundos.','Dos intentos con un minuto de descanso. Cuenta el mejor.'],
  safety:'Lejos de ventanas, cuadros y objetos que se puedan romper.'},
 {id:'laterales', icon:'↔️', name:'Saltos laterales', measures:'Agilidad', unit:'saltos', dec:0, lower:false, tool:'cuenta', secs:15, min:0, max:80,
  param:() => 15, paramText:() => '15 s',
  material:() => ['Una línea de unos 50 cm en el piso (cinta o tiza)'],
  steps:() => ['Pies juntos, al lado de la línea.','Al iniciar, salta de un lado al otro de la línea con los dos pies juntos, sin pisarla.',
    'Toca +1 por cada salto bien hecho (si pisa la línea, no cuenta).','La prueba dura 15 segundos.','Dos intentos con un minuto de descanso. Cuenta el mejor.'],
  safety:'Piso que no resbale. Si hay mareo o dolor, se detiene.'}
];
const T = id => TESTS.find(t => t.id === id);
const fmt = (t, v) => (v == null || isNaN(v)) ? '—' : `${Number(v).toFixed(t.dec).replace('.',',')} ${t.unit}`;
const better = (t, a, b) => t.lower ? a < b : a > b;

/* ---------- Historial ---------- */
const recs = (id, p) => s.tests.filter(r => r && r.id === id && (p === undefined || r.p === p)).sort((a,b) => String(a.d).localeCompare(String(b.d)));
const latest = (id, p) => { const r = recs(id, p); return r[r.length-1] || null; };
const first = (id, p) => recs(id, p)[0] || null;
const inCycle = (id, c) => s.tests.filter(r => r.id === id && r.c === c).sort((a,b) => String(a.d).localeCompare(String(b.d))).pop() || null;
const cycleDone = c => TESTS.filter(t => inCycle(t.id, c)).length;
function change(t, p) {
  const all = recs(t.id, p); if (all.length < 2) return null;
  const a = all[0].v, b = all[all.length-1].v, diff = b - a;
  return {a, b, diff, up: better(t, b, a), same: Math.abs(diff) < 1e-9, from: all[0].d, to: all[all.length-1].d};
}
const diffText = (t, c) => c.same ? 'igual' : `${c.diff > 0 ? '+' : '−'}${Math.abs(c.diff).toFixed(t.dec).replace('.',',')} ${t.unit}`;

/* ---------- XP e insignias (se suman a V18.9) ---------- */
function improvements() { return TESTS.filter(t => { const l = latest(t.id); const c = l && change(t, l.p); return c && c.up && !c.same; }).length; }
window.ABC10 = { xp: () => s.tests.length * 5 + improvements() * 10, tests: TESTS, recs };
if (window.ABC9) {
  const prev = ABC9.extraAchievements;
  ABC9.extraAchievements = function () {
    const full = [1,2,3,4].filter(c => cycleDone(c) === 5).length;
    return [...prev.call(ABC9),
      ['primera-evaluacion','Primera evaluación','📏','Pruebas físicas',full,1,'Completar las 5 pruebas físicas de un ciclo.'],
      ['nueva-marca','Nueva marca personal','📈','Pruebas físicas',improvements(),1,'Mejorar tu propia marca en una prueba.'],
      ['cinco-marcas','Mejora completa','🏆','Pruebas físicas',improvements(),5,'Mejorar tu marca en las 5 pruebas.']];
  };
}

/* ---------- Avisos ---------- */
function toast(msg) {
  let t = document.getElementById('abcToast');
  if (!t) { t = document.createElement('div'); t.id = 'abcToast'; t.setAttribute('role','status'); document.body.append(t); }
  t.textContent = msg; t.classList.add('show'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 3000);
}

/* ---------- Vista Pruebas ---------- */
const nav = document.getElementById('nav');
const tab = document.createElement('button'); tab.className = 'nav'; tab.type = 'button'; tab.dataset.view = 'pruebas'; tab.textContent = '📏 Pruebas';
(nav.querySelector('[data-view="familia"]') || nav.querySelector('[data-view="inicio"]')).insertAdjacentElement('afterend', tab);
tab.onclick = () => show('pruebas');
const view = document.createElement('div'); view.className = 'view'; view.id = 'pruebas';
(document.getElementById('familia') || document.getElementById('inicio')).insertAdjacentElement('afterend', view);

function renderView() {
  if (!eligible()) {
    view.innerHTML = `<section class="pt"><header class="pt-hero"><span class="pt-kicker">PRUEBAS FÍSICAS</span><h1>Disponibles de 6 a 18 años</h1><p>Esta batería de pruebas está pensada para niñez y adolescencia (ABC KIDS y ABC YOUTH). Para adultos y personas mayores se preparará una evaluación propia, con pruebas seguras para cada etapa.</p></header></section>`;
    return;
  }
  const c = cycleNow(), done = cycleDone(c);
  view.innerHTML = `<section class="pt">
   <header class="pt-hero"><div><span class="pt-kicker">PRUEBAS FÍSICAS · CICLO ${c}</span><h1>Mide cuánto mejoras</h1>
     <p>Cinco pruebas cortas al inicio de cada ciclo. Solo te comparas contigo: tu marca de hoy contra la tuya de antes.</p></div>
     <div class="pt-ring" style="--p:${done*20}"><div><b>${done}/5</b><small>este ciclo</small></div></div></header>
   <div class="pt-help"><b>Para la familia:</b> la evaluación completa toma unos 20 minutos y necesita a un adulto para medir. Hagan antes el calentamiento de una sesión y descansen entre pruebas.</div>
   <div class="pt-grid">${TESTS.map(t => {
     const p = t.param(), l = latest(t.id, p), ch = l ? change(t, p) : null, cur = inCycle(t.id, c);
     return `<article class="pt-card ${cur ? 'done' : ''}"><div class="pt-card-top"><span class="pt-icon">${t.icon}</span><span class="pt-tag">${E(t.measures)}</span></div>
       <h3>${E(t.name)}</h3><p class="pt-param">${E(t.paramText(p))}</p>
       <div class="pt-result"><strong>${l ? fmt(t, l.v) : '—'}</strong><small>${l ? 'Última marca · ' + nice(l.d) : 'Sin registro todavía'}</small></div>
       ${ch && !ch.same ? `<p class="pt-change ${ch.up ? 'up' : 'down'}">${ch.up ? '▲ Mejoró' : '▼ Bajó'} ${diffText(t, ch)} desde la primera prueba</p>` : ch ? '<p class="pt-change">Igual que la primera prueba</p>' : ''}
       <button class="pt-btn" data-pt-run="${t.id}">${cur ? 'Repetir prueba' : 'Hacer prueba'}</button></article>`; }).join('')}</div>
   ${s.tests.length ? historyTable() : ''}
   <p class="pt-foot">Los resultados dependen del día, del piso y de quién mide: comparen siempre en condiciones parecidas. Las pruebas no son un diagnóstico médico ni sirven para comparar a niños entre sí.</p></section>`;
  view.querySelectorAll('[data-pt-run]').forEach(b => b.onclick = () => openTest(b.dataset.ptRun));
}
function historyTable() {
  const cycles = [...new Set(s.tests.map(r => r.c))].sort((a,b) => a-b);
  return `<section class="pt-card pt-history"><h3>Historial por ciclo</h3><div class="pt-table-wrap"><table><thead><tr><th>Prueba</th>${cycles.map(c => `<th>Ciclo ${c}</th>`).join('')}</tr></thead>
    <tbody>${TESTS.map(t => `<tr><td>${t.icon} ${E(t.name)}</td>${cycles.map(c => { const r = inCycle(t.id, c); return `<td>${r ? fmt(t, r.v) + (t.paramText(r.p) && r.p !== t.param() ? `<small> (${E(t.paramText(r.p))})</small>` : '') : '—'}</td>`; }).join('')}</tr>`).join('')}</tbody></table></div></section>`;
}

/* ---------- Ejecutar una prueba ---------- */
const modal = document.createElement('div'); modal.id = 'ptModal'; modal.hidden = true; modal.setAttribute('role','dialog'); modal.setAttribute('aria-modal','true');
document.body.append(modal);
let tick = null;
function stopTick() { clearInterval(tick); tick = null; }
function close() { stopTick(); modal.hidden = true; document.body.classList.remove('ss-open'); }
function openTest(id) {
  const t = T(id), p = t.param(), prev = latest(id, p);
  modal.innerHTML = `<div class="pt-modal"><button class="pt-close" id="ptClose" aria-label="Cerrar">✕</button>
   <span class="pt-kicker">PRUEBA · ${E(t.measures.toUpperCase())}</span><h2>${t.icon} ${E(t.name)}</h2>${t.paramText(p) ? `<p class="pt-param">${E(t.paramText(p))}</p>` : ''}
   ${prev ? `<p class="pt-prev">Tu marca anterior: <b>${fmt(t, prev.v)}</b> (${nice(prev.d)}). ¡A superarla!</p>` : ''}
   <details class="pt-how" open><summary>Cómo se hace</summary><p><b>Necesitan:</b> ${t.material(p).map(E).join(' · ')}</p><ol>${t.steps(p).map(x => `<li>${E(x)}</li>`).join('')}</ol><p class="pt-safety"><b>Seguridad:</b> ${E(t.safety)}</p></details>
   ${tool(t)}
   <div class="pt-tries"><label>Intento 1 <span>(${E(t.unit)})</span><input id="ptT1" type="number" inputmode="decimal" step="${t.dec ? Math.pow(10,-t.dec) : 1}" min="${t.min}" max="${t.max}"></label>
     <label>Intento 2 <span>(${E(t.unit)})</span><input id="ptT2" type="number" inputmode="decimal" step="${t.dec ? Math.pow(10,-t.dec) : 1}" min="${t.min}" max="${t.max}"></label></div>
   <p class="pt-msg" id="ptMsg" role="status"></p>
   <button class="pt-btn pt-save" id="ptSave">Guardar resultado</button></div>`;
  modal.hidden = false; document.body.classList.add('ss-open');
  modal.querySelector('#ptClose').onclick = close;
  bindTool(t);
  modal.querySelector('#ptSave').onclick = () => save(t, p);
}
function tool(t) {
  if (t.tool === 'medida') return `<p class="pt-tooltip">Mide con la cinta y escribe los centímetros de cada intento.</p>`;
  if (t.tool === 'crono') return `<div class="pt-tool"><strong id="ptClock">0,00</strong><span>segundos</span>
     <div class="pt-ctrl"><button class="pt-big" id="ptGo">Iniciar</button></div><div class="pt-ctrl"><button class="pt-ghost" data-pt-use="1" disabled>Usar en intento 1</button><button class="pt-ghost" data-pt-use="2" disabled>Usar en intento 2</button></div></div>`;
  return `<div class="pt-tool"><strong id="ptClock">${t.secs}</strong><span>segundos</span><div class="pt-count">Conteo: <b id="ptCount">0</b></div>
     <div class="pt-ctrl"><button class="pt-big" id="ptGo">Iniciar</button><button class="pt-plus" id="ptPlus" disabled>+1</button></div>
     <div class="pt-ctrl"><button class="pt-ghost" data-pt-use="1" disabled>Usar en intento 1</button><button class="pt-ghost" data-pt-use="2" disabled>Usar en intento 2</button></div></div>`;
}
function bindTool(t) {
  const go = modal.querySelector('#ptGo'); if (!go) return;
  const clock = modal.querySelector('#ptClock'), uses = modal.querySelectorAll('[data-pt-use]');
  let value = 0, start = 0, count = 0, state = 'idle';
  const enableUse = on => uses.forEach(b => b.disabled = !on);
  uses.forEach(b => b.onclick = () => { const f = modal.querySelector('#ptT' + b.dataset.ptUse); f.value = t.tool === 'crono' ? value.toFixed(t.dec) : count; f.dispatchEvent(new Event('input')); });
  if (t.tool === 'crono') {
    const stop = () => { stopTick(); value = Math.min(t.cap || 999, (performance.now() - start) / 1000); clock.textContent = value.toFixed(2).replace('.',','); state = 'idle'; go.textContent = 'Iniciar de nuevo'; enableUse(true); };
    go.onclick = () => {
      if (state === 'run') return stop();
      start = performance.now(); state = 'run'; go.textContent = 'Detener'; enableUse(false); stopTick();
      tick = setInterval(() => { const x = (performance.now() - start) / 1000; clock.textContent = x.toFixed(2).replace('.',','); if (t.cap && x >= t.cap) { stop(); toast('¡60 segundos! Marca máxima.'); } }, 30);
    };
  } else {
    const plus = modal.querySelector('#ptPlus'), shown = modal.querySelector('#ptCount');
    plus.onclick = () => { if (state === 'run') { count++; shown.textContent = count; } };
    go.onclick = () => {
      if (state === 'run') return;
      count = 0; shown.textContent = 0; state = 'run'; plus.disabled = false; go.disabled = true; enableUse(false); start = performance.now(); stopTick();
      tick = setInterval(() => { const left = Math.max(0, t.secs - Math.floor((performance.now() - start) / 1000)); clock.textContent = left;
        if (left <= 0) { stopTick(); state = 'idle'; plus.disabled = true; go.disabled = false; go.textContent = 'Iniciar de nuevo'; enableUse(true); toast(`¡Tiempo! ${count} ${t.unit}.`); } }, 100);
    };
  }
}
function save(t, p) {
  const msg = modal.querySelector('#ptMsg');
  const vals = ['#ptT1','#ptT2'].map(id => modal.querySelector(id).value.trim()).filter(v => v !== '').map(v => Number(v.replace(',','.')));
  if (!vals.length) { msg.textContent = 'Escribe el resultado de al menos un intento.'; return; }
  if (vals.some(v => isNaN(v) || v < t.min || v > t.max)) { msg.textContent = `Revisa los valores: deben estar entre ${t.min} y ${t.max} ${t.unit}.`; return; }
  const best = vals.reduce((a, b) => better(t, b, a) ? b : a);
  const prev = latest(t.id, p), c = cycleNow();
  s.tests = s.tests.filter(r => !(r.id === t.id && r.c === c && r.d === today()));
  s.tests.push({id:t.id, v:Number(best.toFixed(t.dec)), tries:vals, d:today(), c, age:Number(s.age), p});
  persist();
  const record = prev && better(t, best, prev.v);
  modal.querySelector('.pt-modal').innerHTML = `<span class="pt-kicker">RESULTADO GUARDADO</span><h2>${record ? '¡Nueva marca personal! 📈' : '¡Prueba completada! ✓'}</h2>
    <p class="pt-big-result">${fmt(t, best)}</p>
    ${prev ? `<p>Marca anterior: ${fmt(t, prev.v)} · ${record ? 'mejoraste' : 'esta vez no superaste'} ${record || better(t, prev.v, best) ? diffText(t, {diff: best - prev.v, same: false}) : ''}</p>` : '<p>Esta es tu primera marca. En el próximo ciclo verás cuánto mejoraste.</p>'}
    ${!record && prev ? '<p class="pt-muted">Es normal que algunas marcas suban y bajen: el cansancio, el piso o el día influyen. Lo importante es la tendencia.</p>' : ''}
    <p class="pt-xp">+5 XP${record ? ' · +10 XP por nueva marca' : ''}</p><button class="pt-btn" id="ptDone">Listo</button>`;
  modal.querySelector('#ptDone').onclick = () => { close(); update(); };
}
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) close(); });

/* ---------- Inicio y Panel Familia ---------- */
function homePrompt() {
  const host = document.getElementById('abcToday'); if (!host) return;
  let box = document.getElementById('ptHome');
  if (!eligible() || cycleDone(cycleNow()) === 5) { box?.remove(); return; }
  if (!box) { box = document.createElement('div'); box.id = 'ptHome'; host.insertAdjacentElement('afterend', box); }
  const d = cycleDone(cycleNow());
  box.innerHTML = `<span>📏</span><div><b>${d ? `Pruebas del ciclo ${cycleNow()}: ${d} de 5 hechas` : `Prueba física del ciclo ${cycleNow()}`}</b><small>${d ? 'Termina las que faltan para ver tu progreso completo.' : 'Mide tu velocidad, salto, equilibrio, coordinación y agilidad. Unos 20 minutos con un adulto.'}</small></div><button class="pt-btn" id="ptHomeGo">${d ? 'Continuar' : 'Empezar'}</button>`;
  box.querySelector('#ptHomeGo').onclick = () => show('pruebas');
}
function familySection() {
  const fp = document.querySelector('#familia .fp'); if (!fp || fp.querySelector('.pt-family')) return;
  const anchor = fp.querySelector('.fp-chart')?.closest('.fp-card'); if (!anchor) return;
  const name = E(s.alias || 'su hijo/a');
  let body;
  if (!eligible()) body = '<p class="fp-muted">Las pruebas físicas de esta versión están diseñadas para 6 a 18 años.</p>';
  else if (!s.tests.length) body = `<p>Todavía no hay pruebas. La primera evaluación toma unos 20 minutos, necesita a un adulto para medir y sirve como punto de partida para ver cuánto mejora ${name} en cada ciclo.</p><button class="fp-btn" id="ptFamGo">Ver las pruebas</button>`;
  else body = `<ul class="pt-fam-list">${TESTS.map(t => { const l = latest(t.id); if (!l) return `<li><span>${t.icon} ${E(t.name)}</span><span class="fp-muted">Pendiente</span></li>`;
      const ch = change(t, l.p);
      return `<li><span>${t.icon} ${E(t.name)}</span><span>${ch ? `${fmt(t, ch.a)} → <b>${fmt(t, ch.b)}</b> <em class="${ch.same ? '' : ch.up ? 'up' : 'down'}">${ch.same ? 'igual' : (ch.up ? '▲ ' : '▼ ') + diffText(t, ch)}</em>` : `<b>${fmt(t, l.v)}</b> <small class="fp-muted">primera marca</small>`}</span></li>`; }).join('')}</ul>
      <p class="fp-muted">Comparación entre la primera y la última prueba de ${name}. No se compara con otros niños.</p>`;
  anchor.insertAdjacentHTML('afterend', `<section class="fp-card pt-family"><span class="fp-kicker">PRUEBAS FÍSICAS</span><h3>¿Cuánto ha mejorado?</h3>${body}</section>`);
  fp.querySelector('#ptFamGo')?.addEventListener('click', () => show('pruebas'));
}

/* ---------- Integración ---------- */
const active = id => document.getElementById(id)?.classList.contains('active');
const prevUpdate = update;
update = function () {
  prevUpdate();
  if (active('pruebas')) renderView();
  if (active('inicio')) homePrompt();
  if (active('familia')) familySection();
};
homePrompt();
})();
