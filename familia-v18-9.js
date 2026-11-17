/* ABC BODY V18.9 — Panel Familia, sesiones cortas en casa, deporte favorito y progreso tipo juego.
   No modifica el currículo: usa las fichas existentes y guarda datos nuevos en el mismo perfil local
   (s.sessions, s.sport, s.avatar, s.familyDone). */
(() => {
'use strict';
if (typeof s !== 'object' || typeof currentWeeks !== 'function' || document.getElementById('familia')) return;

/* ---------- Estado ---------- */
if (!s.sessions || typeof s.sessions !== 'object' || Array.isArray(s.sessions)) s.sessions = {};
if (!s.familyDone || typeof s.familyDone !== 'object' || Array.isArray(s.familyDone)) s.familyDone = {};
if (s.alias === 'Estudiante demo') s.alias = 'Deportista';

const E = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const today = () => new Date().toLocaleDateString('en-CA');
const dayMs = 864e5;
const parseDay = d => { const [y,m,dd] = d.split('-').map(Number); return new Date(y, m-1, dd); };
const fmtDay = d => d.toLocaleDateString('en-CA');
const mondayOf = d => { const x = new Date(d); x.setHours(0,0,0,0); x.setDate(x.getDate() - ((x.getDay()+6)%7)); return x; };
const shortDate = d => d.toLocaleDateString('es-CR', {day:'numeric', month:'short'});

/* ---------- Deportes y categorías ---------- */
const SPORTS = {
  futbol:['⚽','Fútbol','fútbol',true], baloncesto:['🏀','Baloncesto','baloncesto',true], voleibol:['🏐','Voleibol','voleibol',true],
  natacion:['🏊','Natación','natación',false], atletismo:['🏃','Atletismo','atletismo',false], artes:['🥋','Artes marciales','artes marciales',false],
  tenis:['🎾','Tenis','tenis',false], gimnasia:['🤸','Gimnasia','gimnasia',false], ciclismo:['🚴','Ciclismo','ciclismo',false],
  varios:['✨','Varios deportes','tus deportes favoritos',false]
};
const CATS = [
  ['metas',/meta|evaluaci/], ['equilibrio',/equilibrio/], ['control',/control corporal|conciencia|técnica/],
  ['saltos',/salto/], ['agilidad',/agilidad|reacci|desaceler/], ['locomocion',/locomo|desplaz|velocidad|aceleraci|marcha|caminar/],
  ['coordinacion',/coordinaci|manipulaci|lanzar|objetos|alcance/], ['fuerza',/fuerza|sentarse/], ['resistencia',/resistencia|aeróbica/],
  ['movilidad',/movilidad|recuperaci|carga|preparaci|calentamiento|pausas/], ['nutricion',/aliment|nutrici|hidrat/],
  ['sueno',/sueño|descanso/], ['cooperacion',/cooperaci|juego|psicolog|social|estrategia|recreativa/], ['integracion',/integraci|autonom|proyecto|plan/]
];
const catOf = w => { const d = String(w?.domain || '').toLowerCase(); return (CATS.find(([,r]) => r.test(d)) || ['otra'])[0]; };
const CAT_LABEL = {metas:'Metas',equilibrio:'Equilibrio',control:'Control corporal',saltos:'Saltos',agilidad:'Agilidad',locomocion:'Velocidad',coordinacion:'Coordinación',fuerza:'Fuerza',resistencia:'Resistencia',movilidad:'Movilidad',nutricion:'Nutrición',sueno:'Descanso',cooperacion:'Trabajo en equipo',integracion:'Autonomía',otra:'Movimiento'};
const L = {
 metas:{futbol:'una meta clara (como dar 10 pases seguidos) le da propósito a cada entrenamiento.',baloncesto:'una meta clara (como encestar 5 de 10 tiros) te ayuda a medir tu avance.',voleibol:'una meta clara (como hacer 10 toques seguidos) te ayuda a entrenar con propósito.',natacion:'una meta clara (como nadar un largo sin parar) te muestra cuánto avanzas.',atletismo:'una meta clara (como mejorar tu salida) te ayuda a entrenar con propósito.',artes:'una meta clara (como dominar una caída nueva) te prepara para tu siguiente nivel.',tenis:'una meta clara (como pasar 10 bolas seguidas) te ayuda a medir tu avance.',gimnasia:'una meta clara (como sostener una figura 5 segundos) guía tu entrenamiento.',ciclismo:'una meta clara (como completar una ruta sin bajarte) te muestra tu progreso.',varios:'saber qué quieres mejorar te ayuda a avanzar en cualquier deporte.'},
 control:{futbol:'controlar tu cuerpo te permite proteger el balón y no caerte en un choque.',baloncesto:'controlar tu cuerpo te ayuda a frenar, pivotar y tirar sin perder la postura.',voleibol:'controlar tu cuerpo te ayuda a colocarte bien antes de recibir o rematar.',natacion:'sentir y controlar tu cuerpo te ayuda a ir alineado y deslizarte mejor.',atletismo:'una buena postura hace que cada zancada sea más eficiente.',artes:'el control corporal es la base de cada guardia, postura y caída.',tenis:'controlar tu cuerpo te ayuda a golpear con buena postura y recuperar rápido.',gimnasia:'la conciencia corporal es la base de cada figura y cada aterrizaje.',ciclismo:'controlar el tronco te da estabilidad sobre la bici en curvas y bajadas.',varios:'controlar tu cuerpo es la base de cualquier gesto deportivo.'},
 equilibrio:{futbol:'más equilibrio = patear con fuerza mientras te apoyas en un solo pie.',baloncesto:'el equilibrio te ayuda a tirar y aterrizar estable, incluso con contacto.',voleibol:'el equilibrio te deja recibir bien plantado y aterrizar seguro tras saltar.',natacion:'el equilibrio te ayuda a mantener el cuerpo estable en salidas y vueltas.',atletismo:'el equilibrio hace tus apoyos más firmes al correr y al saltar.',artes:'el equilibrio te permite patear, esquivar y no caer cuando te empujan.',tenis:'el equilibrio te deja golpear bien aunque llegues a la pelota en movimiento.',gimnasia:'el equilibrio es clave en la viga, en las figuras y en cada aterrizaje.',ciclismo:'el equilibrio es lo que te mantiene estable sobre la bici a baja velocidad.',varios:'el equilibrio te da estabilidad en cualquier deporte.'},
 locomocion:{futbol:'correr y cambiar de ritmo te ayuda a llegar primero al balón y desmarcarte.',baloncesto:'moverte en todas direcciones te ayuda a defender y encontrar espacios.',voleibol:'desplazarte rápido te ayuda a llegar a tiempo a cada balón.',natacion:'moverte con fuerza fortalece las piernas que usas para impulsarte en la pared.',atletismo:'correr con buena técnica es la base de todas las pruebas de pista.',artes:'desplazarte con pasos cortos y rápidos te ayuda a entrar y salir de la distancia.',tenis:'moverte rápido y con pasos cortos te deja llegar bien colocado a cada bola.',gimnasia:'correr con buena técnica mejora tu carrera antes de cada salto.',ciclismo:'moverte y correr fortalece las piernas que luego usas para pedalear.',varios:'moverte bien en todas direcciones sirve en casi todos los deportes.'},
 coordinacion:{futbol:'coordinar ojos, manos y pies mejora tu control y tus pases.',baloncesto:'la coordinación ojo-mano mejora tu bote, tus pases y tu tiro.',voleibol:'la coordinación ojo-mano te ayuda a tocar el balón en el momento justo.',natacion:'coordinar brazos, piernas y respiración es la base de cada estilo.',atletismo:'la coordinación hace que brazos y piernas trabajen juntos al correr y lanzar.',artes:'coordinar manos y pies te ayuda a encadenar técnicas con fluidez.',tenis:'la coordinación ojo-mano te ayuda a golpear la pelota en el punto justo.',gimnasia:'la coordinación te ayuda a encadenar los movimientos de una rutina.',ciclismo:'coordinar piernas y manos te ayuda a pedalear, frenar y señalizar a la vez.',varios:'la coordinación mejora cualquier gesto con pelota o implemento.'},
 saltos:{futbol:'saltar y aterrizar bien te ayuda a cabecear y a cuidar tus rodillas.',baloncesto:'saltar más y aterrizar bien te ayuda a rebotear y proteger tus rodillas.',voleibol:'saltar y aterrizar con control es clave para rematar y bloquear.',natacion:'saltar con fuerza mejora tus salidas desde el borde.',atletismo:'saltar y aterrizar bien es la base del salto largo y las vallas.',artes:'saltar y aterrizar con control te prepara para patadas con salto.',tenis:'los saltos te dan piernas rápidas para reaccionar y sacar.',gimnasia:'saltar y aterrizar con control es la base de cada acrobacia.',ciclismo:'los saltos fortalecen tus piernas para arrancar y subir cuestas.',varios:'aterrizar bien protege tus rodillas en cualquier deporte.'},
 agilidad:{futbol:'reaccionar y cambiar de dirección rápido te ayuda a regatear y defender.',baloncesto:'reaccionar rápido te ayuda a robar balones y superar a tu defensor.',voleibol:'reaccionar rápido te ayuda a defender remates difíciles.',natacion:'reaccionar rápido mejora tu salida al escuchar la señal.',atletismo:'reaccionar rápido mejora tu salida en las carreras.',artes:'reaccionar rápido te ayuda a esquivar y contraatacar.',tenis:'reaccionar rápido te deja devolver bolas que parecían imposibles.',gimnasia:'la agilidad te ayuda a ajustar tus movimientos en el aire.',ciclismo:'reaccionar rápido te ayuda a esquivar obstáculos con seguridad.',varios:'la agilidad te hace más rápido para reaccionar en cualquier juego.'},
 fuerza:{futbol:'más fuerza te ayuda a patear más lejos y ganar los choques.',baloncesto:'más fuerza te ayuda a saltar más alto y aguantar el contacto.',voleibol:'más fuerza en piernas y tronco te ayuda a saltar y rematar.',natacion:'más fuerza te ayuda a impulsarte en cada brazada y patada.',atletismo:'más fuerza se traduce en zancadas más potentes.',artes:'la fuerza te da estabilidad en agarres, proyecciones y patadas.',tenis:'un tronco fuerte le da potencia y control a tus golpes.',gimnasia:'la fuerza te permite sostener tu propio peso en barras y figuras.',ciclismo:'piernas fuertes te ayudan a subir cuestas y arrancar más rápido.',varios:'ser más fuerte te ayuda a rendir mejor y a prevenir lesiones.'},
 resistencia:{futbol:'más resistencia te permite correr todo el partido sin bajar el ritmo.',baloncesto:'más resistencia te deja seguir defendiendo en el último cuarto.',voleibol:'más resistencia te ayuda a mantener la intensidad en sets largos.',natacion:'la resistencia te permite nadar más distancia sin parar.',atletismo:'la resistencia es la base de las carreras medias y largas.',artes:'la resistencia te ayuda a mantener el ritmo durante toda la clase o el combate.',tenis:'la resistencia te ayuda a jugar puntos largos sin cansarte.',gimnasia:'la resistencia te permite entrenar más tiempo con buena técnica.',ciclismo:'la resistencia te permite pedalear más tiempo y más lejos.',varios:'más resistencia te permite jugar más tiempo y disfrutar más.'},
 movilidad:{futbol:'movilidad y descanso te ayudan a patear mejor y evitar tirones.',baloncesto:'cuidar movilidad y descanso te ayuda a saltar y aterrizar sin molestias.',voleibol:'hombros y caderas móviles te ayudan a rematar y cuidar tu cuerpo.',natacion:'hombros y tobillos móviles hacen tu brazada y tu patada más eficientes.',atletismo:'movilidad y recuperación te dejan entrenar seguido sin lesionarte.',artes:'caderas móviles te permiten patear más alto con control.',tenis:'hombros y caderas móviles le dan amplitud a tus golpes.',gimnasia:'la movilidad es clave para splits, puentes y figuras.',ciclismo:'estirar y recuperar alivia las piernas después de rodar.',varios:'movilidad y descanso te ayudan a entrenar sin lesiones.'}
};
function sportLine(w, sport) {
  const sp = SPORTS[sport]; if (!sp) return '';
  const c = catOf(w), name = sp[2];
  let t = L[c]?.[sport];
  if (!t) t = ({
    nutricion:`comer bien e hidratarte te da energía para entrenar y jugar ${name}.`,
    sueno:`dormir bien es cuando tu cuerpo se recupera y fija lo que entrenaste en ${name}.`,
    cooperacion: sp[3] ? `comunicarte y cooperar es lo que hace funcionar a un equipo de ${name}.` : `cooperar y respetar a otros te hace mejor compañero/a de entrenamiento en ${name}.`,
    integracion:`unir lo aprendido te ayuda a usar varias habilidades a la vez, como en una competencia de ${name}.`
  })[c] || `esta habilidad es una base que vas a usar en ${name}.`;
  return `${sp[0]} En ${sport === 'varios' ? 'tus deportes' : sp[1].toLowerCase()}: ${t}`;
}

/* ---------- Retos familiares (uno por categoría) ---------- */
const FAMILY = {
  metas:'Cada persona escribe una meta de movimiento para la semana y la pegan en la refri.',
  control:'Juego de estatuas: con música todos se mueven; cuando se apaga, todos congelados.',
  equilibrio:'¿Quién aguanta más en un pie? Primero normal, luego con los brazos cruzados.',
  locomocion:'Paseo familiar de 15 minutos cambiando la forma de caminar cada minuto.',
  coordinacion:'Pásense una pelota o un calcetín enrollado: 20 pases seguidos sin que caiga.',
  saltos:'Rayuela en el piso con cinta o tiza: cada persona inventa una casilla nueva.',
  agilidad:'«Simón dice» con cambios rápidos: adelante, atrás, a un lado, ¡agáchate!',
  fuerza:'Tres rondas de 10 sentadillas juntos; quien termina primero anima a los demás.',
  resistencia:'Bailen tres canciones seguidas sin parar.',
  movilidad:'Cinco minutos de estiramientos suaves antes de dormir, todos juntos.',
  nutricion:'Preparen juntos una merienda con fruta y agua en lugar de bebida azucarada.',
  sueno:'Una noche sin pantallas una hora antes de dormir, para toda la familia.',
  cooperacion:'Inventen un juego en equipo donde nadie pierde y todos deben ayudarse.',
  integracion:'Que su hijo/a les enseñe la actividad que más le gustó de estas semanas.',
  otra:'Salgan juntos a moverse 15 minutos: caminar, bailar o jugar.'
};
const familyText = w => FAMILY[catOf(w)] || FAMILY.otra;

/* ---------- Sesiones cortas ---------- */
const minutesFor = () => { const a = Number(s.age); return s.program === 'KIDS' ? (a <= 8 ? 10 : 12) : 15; };
const cleanStep = t => String(t || '')
  .replace(/^\s*(Primera ronda|Segunda ronda|Tercera ronda|Transferencia|Inicio|Activación|Núcleo\s*[AB]|Cierre)\s*(\(\d+\s*min\))?\s*:\s*/i, '')
  .replace(/\s*En esta edad:.*$/i, '').trim();
const T = w => String(w?.title || '').split(' · ')[0];
const cap = t => t ? t.charAt(0).toUpperCase() + t.slice(1) : t;
function sessionSteps(w, n) {
  const st = w.steps || [];
  const pick = st.length >= 5 ? [st[2], st[3], st[4]] : [st[0], st[1], st[2]];
  return cap(cleanStep(pick[n-1] || st[st.length-1] || w.objective));
}
const NEEDS = [[/pelota|lanz|atrap|recib/,'Pelota (o un calcetín enrollado)'],[/\baro/,'Aro (o una cuerda en círculo)'],[/cono|marcador/,'Marcadores (botellas o zapatos sirven)'],[/cuerda/,'Cuerda'],[/pañuelo/,'Pañuelo'],[/globo/,'Globo'],[/colchoneta|tapete/,'Colchoneta o toalla gruesa'],[/pared/,'Una pared libre'],[/cinta|tiza/,'Cinta o tiza para marcar el piso'],[/banco/,'Banco o escalón bajo y estable'],[/música/,'Música']];
function needsFor(w, n) {
  const v = (w.variants || {})[['base','progresion','desafio'][n-1]] || {};
  const txt = (sessionSteps(w, n) + ' ' + (v.activity || '')).toLowerCase();
  const out = NEEDS.filter(([r]) => r.test(txt)).map(([,t]) => t);
  const still = /aliment|nutrici|hidrat|sueño|descanso/.test(String(w.domain).toLowerCase());
  return [still ? 'Un lugar tranquilo' : 'Espacio libre de unos 3 × 3 m', 'Agua', ...out];
}
const WARM = ['Trota suave en tu lugar 30 segundos','Haz círculos con brazos, caderas y tobillos','Da 10 saltitos suaves en las puntas de los pies','Camina de puntillas y luego de talones','Haz 5 sentadillas lentas'];
function plan(w, n) {
  const total = minutesFor(), main = total - 5;
  const v = (w.variants || {})[['base','progresion','desafio'][n-1]] || {};
  const close = ['Muéstrale a alguien de tu familia lo que aprendiste hoy.','Inventa tu propia variación y pruébala.','Reto final: hazlo 3 veces seguidas con control. Luego registra tu práctica en Entrena.'][n-1];
  return {
    total, needs: needsFor(w, n),
    name: ['Aprende y prueba','Practica y mejora','Reto de la semana'][n-1],
    blocks: [
      {t:'Calienta', m:2, d:[WARM[(w.week+n)%5], WARM[(w.week+n+2)%5]].join(' · ')},
      {t:'Actividad principal', m:main, d:sessionSteps(w, n), extra:(() => { const x = (v.activity||'').split('. ')[0].replace(/\.+$/,''); const main = sessionSteps(w, n).toLowerCase(); return x && !main.startsWith(x.toLowerCase().slice(0,25)) ? x : ''; })()},
      {t:'Reto', m:2, d:close},
      {t:'Vuelta a la calma', m:1, d:'Respira lento cinco veces y estira suave lo que más trabajaste.'}
    ]
  };
}
const doneOf = w => s.sessions[w.id] || {};
const doneCount = w => [1,2,3].filter(n => doneOf(w)[n]).length;
const nextSession = w => [1,2,3].find(n => !doneOf(w)[n]) || null;

/* ---------- Métricas ---------- */
function allSessions() {
  const out = [];
  for (const [id, rec] of Object.entries(s.sessions)) for (const n of [1,2,3]) if (rec?.[n]?.d) out.push({id, n, d:rec[n].d, m:Number(rec[n].m)||0});
  return out;
}
function streaks() {
  const days = new Set(allSessions().map(x => x.d));
  let cur = 0, t = parseDay(today());
  if (!days.has(fmtDay(t))) t = new Date(t - dayMs);
  while (days.has(fmtDay(t))) { cur++; t = new Date(t - dayMs); }
  let best = 0, run = 0, prev = null;
  for (const d of [...days].sort()) { const x = parseDay(d); run = prev && Math.round((x - prev) / dayMs) === 1 ? run + 1 : 1; best = Math.max(best, run); prev = x; }
  return {cur, best, days};
}
function stats() {
  const ses = allSessions(), weeksComplete = Object.values(s.sessions).filter(r => r && r[1] && r[2] && r[3]).length;
  const quizPassed = Object.values(s.academy || {}).filter(a => a?.quiz?.v === 2 && a.quiz.passed).length;
  const practices = new Set((s.submissions || []).map(x => x.id)).size;
  const family = Object.keys(s.familyDone).length;
  const validated = Object.values(s.validations || {}).filter(v => v && ['competente','consolidada'].includes(v.nivel)).length;
  const st = streaks();
  const xp = ses.length*10 + weeksComplete*20 + quizPassed*10 + practices*15 + family*15 + validated*50 + (window.ABC10?.xp?.() || 0);
  return {ses, sessions:ses.length, minutes:ses.reduce((a,x)=>a+x.m,0), weeksComplete, quizPassed, practices, family, validated, xp, streak:st.cur, best:st.best, days:st.days};
}
const LEVELS = [[0,'Semilla'],[100,'Brote'],[250,'Explorador/a'],[500,'Aventurero/a'],[900,'Atleta en camino'],[1400,'Atleta ABC'],[2000,'Leyenda ABC']];
function level(xp) {
  let i = 0; while (i+1 < LEVELS.length && xp >= LEVELS[i+1][0]) i++;
  const lo = LEVELS[i][0], hi = LEVELS[i+1]?.[0];
  return {n:i+1, name:LEVELS[i][1], pct: hi ? Math.round(100*(xp-lo)/(hi-lo)) : 100, toNext: hi ? hi - xp : 0};
}
const AVATARS = {guepardo:['🐆','Guepardo'],canguro:['🦘','Canguro'],delfin:['🐬','Delfín'],aguila:['🦅','Águila'],oso:['🐻','Oso'],zorro:['🦊','Zorro'],mono:['🐒','Mono'],tortuga:['🐢','Tortuga']};
const avatar = () => AVATARS[s.avatar] || AVATARS.guepardo;
function skills() {
  const set = new Map();
  for (const w of currentWeeks()) if (doneCount(w) === 3) set.set(catOf(w), CAT_LABEL[catOf(w)]);
  return [...set.values()];
}
/* Insignias extra para el Medallero (formato de medallero-convenios-v18-8.js) */
window.ABC9 = {
  extraAchievements() {
    const m = stats();
    return [
      ['primera-sesion','Primera sesión','▶','Sesiones',m.sessions,1,'Completar tu primera sesión corta en casa.'],
      ['racha-3','Racha de 3 días','🔥','Constancia',m.best,3,'Hacer sesiones tres días seguidos.'],
      ['semana-completa','Semana completa','◆','Sesiones',m.weeksComplete,1,'Completar las 3 sesiones de una semana.'],
      ['familia','Reto en familia','♥','Familia',m.family,1,'Completar un reto familiar.'],
      ['quiz-perfecto','Cuestionario perfecto','✓','Aprendizaje',m.quizPassed,1,'Responder bien todas las preguntas de un cuestionario.'],
      ['racha-7','Racha de 7 días','🔥','Constancia',m.best,7,'Hacer sesiones siete días seguidos.'],
      ['diez-sesiones','10 sesiones','✚','Sesiones',m.sessions,10,'Completar diez sesiones cortas.'],
      ['cinco-semanas','Cinco semanas','◆','Sesiones',m.weeksComplete,5,'Completar las sesiones de cinco semanas.']
    ];
  },
  stats, level
};

/* ---------- Avisos breves ---------- */
function toast(msg) {
  let t = document.getElementById('abcToast');
  if (!t) { t = document.createElement('div'); t.id = 'abcToast'; t.setAttribute('role','status'); document.body.append(t); }
  t.textContent = msg; t.classList.add('show'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 2600);
}

/* ---------- Reproductor de sesión ---------- */
let timer = null, elapsed = 0, running = false, playing = null;
const modal = document.createElement('div'); modal.id = 'abcSession'; modal.hidden = true; modal.setAttribute('role','dialog'); modal.setAttribute('aria-modal','true');
document.body.append(modal);
const mmss = sec => `${String(Math.floor(sec/60)).padStart(2,'0')}:${String(Math.max(0,sec%60)).padStart(2,'0')}`;
function openSession(n) {
  const w = item(); n = n || nextSession(w) || 3; playing = {w, n}; elapsed = 0; running = false; clearInterval(timer);
  const p = plan(w, n), sp = s.sport ? sportLine(w, s.sport) : '';
  modal.innerHTML = `<div class="ss-card"><button class="ss-close" id="ssClose" aria-label="Cerrar">✕</button>
   <span class="ss-kicker">SESIÓN ${n} DE 3 · ${p.total} MIN · SEMANA ${w.week}</span><h2>${E(p.name)}</h2><p class="ss-title">${E(T(w))}</p>
   ${sp ? `<p class="ss-sport">${E(sp)}</p>` : ''}
   <div class="ss-needs"><b>Necesitas:</b> ${p.needs.map(x => `<span>${E(x)}</span>`).join('')}</div>
   <div class="ss-timer"><strong id="ssClock">${mmss(p.total*60)}</strong><div class="ss-bar"><i id="ssBar"></i></div>
   <div class="ss-ctrl"><button id="ssPlay" class="ss-primary">▶ Empezar</button><button id="ssReset" class="ss-ghost">Reiniciar</button></div></div>
   <ol class="ss-blocks">${p.blocks.map((b,i) => `<li data-ss-block="${i}"><div><b>${E(b.t)}</b><small>${b.m} min</small></div><p>${E(b.d)}</p>${b.extra ? `<p class="ss-extra">${E(b.extra)}.</p>` : ''}</li>`).join('')}</ol>
   <p class="ss-safety"><b>Seguridad:</b> ${E(w.safety)}</p>
   <button id="ssDone" class="ss-primary ss-done">✓ Terminé la sesión</button></div>`;
  modal.hidden = false; document.body.classList.add('ss-open');
  const total = p.total*60, cum = []; p.blocks.reduce((a,b,i) => (cum[i] = a + b.m*60, cum[i]), 0);
  const paint = () => {
    modal.querySelector('#ssClock').textContent = mmss(Math.max(0, total - elapsed));
    modal.querySelector('#ssBar').style.width = Math.min(100, 100*elapsed/total) + '%';
    const cur = cum.findIndex(c => elapsed < c);
    modal.querySelectorAll('[data-ss-block]').forEach((li,i) => { li.classList.toggle('now', running || elapsed ? i === (cur < 0 ? cum.length-1 : cur) : false); li.classList.toggle('past', cur < 0 || i < cur); });
  };
  modal.querySelector('#ssPlay').onclick = e => {
    running = !running; e.target.textContent = running ? '❚❚ Pausa' : '▶ Seguir';
    clearInterval(timer);
    if (running) timer = setInterval(() => { elapsed++; paint(); if (elapsed >= total) { clearInterval(timer); running = false; e.target.textContent = '✓ Tiempo cumplido'; toast('¡Tiempo cumplido! Marca la sesión como terminada.'); } }, 1000);
    paint();
  };
  modal.querySelector('#ssReset').onclick = () => { clearInterval(timer); running = false; elapsed = 0; modal.querySelector('#ssPlay').textContent = '▶ Empezar'; paint(); };
  modal.querySelector('#ssClose').onclick = closeSession;
  modal.querySelector('#ssDone').onclick = finishSession;
  paint(); modal.querySelector('#ssPlay').focus();
}
function closeSession() { clearInterval(timer); running = false; modal.hidden = true; document.body.classList.remove('ss-open'); playing = null; }
function finishSession() {
  if (!playing) return;
  const {w, n} = playing, p = plan(w, n), before = level(stats().xp);
  const minutes = elapsed >= 60 ? Math.round(elapsed/60) : p.total;
  s.sessions[w.id] = {...doneOf(w), [n]: {d: today(), m: minutes}};
  persist();
  const full = doneCount(w) === 3, after = level(stats().xp);
  modal.querySelector('.ss-card').innerHTML = `<span class="ss-kicker">SESIÓN ${n} DE 3 COMPLETADA</span><h2>${full ? '¡Semana completa! 🎉' : '¡Bien hecho! 💪'}</h2>
   <p class="ss-xp">+10 XP${full ? ' · +20 XP por completar la semana' : ''}</p>
   ${after.n > before.n ? `<p class="ss-level">${avatar()[0]} ¡Subiste a nivel ${after.n}: ${E(after.name)}!</p>` : ''}
   <p>${full ? 'Completaste las tres sesiones de esta semana. Registra tu práctica para que tu docente pueda verla.' : `Te ${3-doneCount(w) === 1 ? 'falta 1 sesión' : 'faltan ' + (3-doneCount(w)) + ' sesiones'} para completar la semana.`}</p>
   <div class="ss-ctrl">${full ? `<button class="ss-primary" id="ssPractice">Registrar práctica</button>${w.week < 52 ? '<button class="ss-ghost" id="ssNext">Ir a la semana siguiente →</button>' : ''}` : '<button class="ss-primary" id="ssOk">Listo</button>'}</div>`;
  const go = v => { closeSession(); v ? show(v) : update(); };
  modal.querySelector('#ssOk')?.addEventListener('click', () => go());
  modal.querySelector('#ssPractice')?.addEventListener('click', () => go('evidencia'));
  modal.querySelector('#ssNext')?.addEventListener('click', () => { s.week = Math.min(52, Number(s.week) + 1); persist(); go('inicio'); });
}
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeSession(); });

/* ---------- Inicio: avatar, racha y sesión de hoy ---------- */
const home = document.getElementById('inicio');
const todayBox = document.createElement('section'); todayBox.id = 'abcToday';
(home.querySelector('.dashboard-heading') || home.firstElementChild).insertAdjacentElement('afterend', todayBox);
const sportChips = () => `<div class="ab-chips">${Object.entries(SPORTS).map(([k,v]) => `<button type="button" data-ab-sport="${k}" class="${s.sport===k?'on':''}">${v[0]} ${E(v[1])}</button>`).join('')}</div>`;
function renderHome() {
  const w = item(), m = stats(), lv = level(m.xp), n = nextSession(w), av = avatar(), sk = skills();
  const weekDots = [1,2,3].map(i => `<i class="${doneOf(w)[i] ? 'on' : ''}"></i>`).join('');
  const p = n ? plan(w, n) : null, fam = !!s.familyDone[w.id];
  todayBox.innerHTML = `<div class="ab-player"><div class="ab-avatar" title="${E(av[1])}">${av[0]}<span>Nv ${lv.n}</span></div>
     <div class="ab-player-info"><strong>${E(lv.name)}</strong><div class="ab-xp"><i style="width:${lv.pct}%"></i></div><small>${m.xp} XP${lv.toNext ? ` · ${lv.toNext} para el siguiente nivel` : ''}</small>
     <div class="ab-streak"><span>🔥 <b>${m.streak}</b> ${m.streak === 1 ? 'día' : 'días'} seguidos</span><span>Mejor racha: ${m.best}</span></div>
     ${sk.length ? `<div class="ab-skills">${sk.map(x => `<span>${E(x)}</span>`).join('')}</div>` : '<small class="ab-hint">Completa semanas para que tu avatar gane habilidades.</small>'}</div></div>
   <div class="ab-today"><span class="ab-kicker">SESIÓN DE HOY</span>
     ${p ? `<h3>Sesión ${n} de 3 · ${p.total} min</h3><p class="ab-sub">Semana ${w.week}: ${E(T(w))}</p>` : `<h3>¡Semana ${w.week} completa! ✓</h3><p class="ab-sub">Puedes repetir el reto o pasar a la siguiente semana.</p>`}
     <div class="ab-dots" aria-label="${doneCount(w)} de 3 sesiones">${weekDots}<small>${doneCount(w)}/3 esta semana</small></div>
     ${s.sport ? `<p class="ab-sport">${E(sportLine(w, s.sport))}</p>` : `<p class="ab-ask">¿Cuál es tu deporte favorito?</p>${sportChips()}`}
     ${p ? `<p class="ab-needs"><b>Necesitas:</b> ${E(p.needs.join(' · '))}</p>` : ''}
     <div class="ab-actions">${p ? `<button class="ab-primary" id="abStart">▶ Empezar sesión</button>` : `<button class="ab-primary" id="abRepeat">Repetir el reto</button>${w.week < 52 ? '<button class="ab-ghost" id="abNextWeek">Semana siguiente →</button>' : ''}`}</div></div>
   <div class="ab-family ${fam ? 'done' : ''}"><span class="ab-kicker">♥ RETO FAMILIAR DE LA SEMANA</span><p>${E(familyText(w))}</p>
     <button class="ab-ghost" id="abFamily" ${fam ? 'disabled' : ''}>${fam ? '✓ ¡Lo hicieron en familia!' : 'Lo hicimos en familia'}</button></div>`;
  todayBox.querySelector('#abStart')?.addEventListener('click', () => openSession());
  todayBox.querySelector('#abRepeat')?.addEventListener('click', () => openSession(3));
  todayBox.querySelector('#abNextWeek')?.addEventListener('click', () => { s.week = Math.min(52, Number(s.week)+1); persist(); update(); });
  todayBox.querySelector('#abFamily')?.addEventListener('click', () => { s.familyDone[w.id] = today(); persist(); toast('+15 XP · ¡Reto familiar completado!'); update(); });
  bindSport(todayBox);
}
function bindSport(root) {
  root.querySelectorAll('[data-ab-sport]').forEach(b => b.onclick = () => { s.sport = b.dataset.abSport; persist(); toast(`${SPORTS[s.sport][0]} Deporte favorito: ${SPORTS[s.sport][1]}`); update(); });
}

/* ---------- Perfil: deporte y avatar ---------- */
const perfil = document.getElementById('perfil');
const prefCard = document.createElement('div'); prefCard.className = 'card ab-pref'; prefCard.style.marginTop = '18px';
perfil.firstElementChild?.insertAdjacentElement('afterend', prefCard);
function renderPerfil() {
  prefCard.innerHTML = `<div class="eyebrow">ABC BODY / MI ESTILO</div><h2>Deporte favorito y avatar</h2>
   <p class="muted">El deporte conecta cada actividad con lo que más te gusta. El avatar sube de nivel con tus sesiones.</p>
   <label>Deporte favorito</label>${sportChips()}
   <label>Mi avatar</label><div class="ab-chips">${Object.entries(AVATARS).map(([k,v]) => `<button type="button" data-ab-avatar="${k}" class="${(s.avatar||'guepardo')===k?'on':''}">${v[0]} ${E(v[1])}</button>`).join('')}</div>`;
  bindSport(prefCard);
  prefCard.querySelectorAll('[data-ab-avatar]').forEach(b => b.onclick = () => { s.avatar = b.dataset.abAvatar; persist(); update(); });
}

/* ---------- Panel Familia ---------- */
const nav = document.getElementById('nav');
const tab = document.createElement('button'); tab.className = 'nav'; tab.type = 'button'; tab.dataset.view = 'familia'; tab.textContent = '♥ Familia';
(nav.querySelector('[data-view="inicio"]') || nav.firstElementChild).insertAdjacentElement('afterend', tab);
tab.onclick = () => show('familia');
const panel = document.createElement('div'); panel.className = 'view'; panel.id = 'familia';
home.insertAdjacentElement('afterend', panel);
const TIPS = {
  KIDS:['Celebra el esfuerzo, no solo el resultado: «vi que lo intentaste muchas veces».','Juega con él o ella 10 minutos: a esta edad aprenden más jugando que repitiendo.','Deja que elija la variante: decidir le da confianza y ganas de seguir.'],
  YOUTH:['Pregúntale qué quiere mejorar en su deporte y conecta las sesiones con esa meta.','Cuida el descanso: dormir bien es parte del entrenamiento.','Acompaña sin comparar con otros; cada cuerpo madura a su ritmo.']
};
function renderFamily() {
  const w = item(), m = stats(), lv = level(m.xp), monday = mondayOf(new Date()), sunday = new Date(+monday + 6*dayMs);
  const inWeek = (d, mon) => { const x = parseDay(d); return x >= mon && x < new Date(+mon + 7*dayMs); };
  const thisWeek = m.ses.filter(x => inWeek(x.d, monday));
  const activeDays = new Set(thisWeek.map(x => x.d)).size;
  const weeks = Array.from({length:6}, (_, i) => { const mon = new Date(+monday - (5-i)*7*dayMs); const list = m.ses.filter(x => inWeek(x.d, mon)); return {mon, min:list.reduce((a,x)=>a+x.m,0), n:list.length}; });
  const maxMin = Math.max(30, ...weeks.map(x => x.min));
  const lastRef = Object.entries(s.academy || {}).filter(([,a]) => a?.answer).sort((a,b) => String(b[1].date).localeCompare(String(a[1].date)))[0];
  const refW = lastRef ? W.find(x => x.id === lastRef[0]) : null;
  const validated = Object.entries(s.validations || {}).filter(([,v]) => v && ['competente','consolidada'].includes(v.nivel));
  const domName = id => (W.find(x => x.domain_id === id) || {}).domain || id;
  const n = nextSession(w), p = n ? plan(w, n) : null, fam = !!s.familyDone[w.id];
  const tips = TIPS[s.program] || TIPS.YOUTH, name = E(s.alias || 'tu hijo/a');
  panel.innerHTML = `<section class="fp">
   <header class="fp-hero"><div><span class="fp-kicker">PANEL FAMILIAR</span><h1>${name}</h1><p>${E(s.age)} años · ABC ${E(s.program)}${s.sport ? ' · ' + SPORTS[s.sport][0] + ' ' + E(SPORTS[s.sport][1]) : ''}</p></div>
     <div class="fp-avatar">${avatar()[0]}<small>Nivel ${lv.n} · ${E(lv.name)}</small></div></header>
   <div class="fp-range">Semana del ${shortDate(monday)} al ${shortDate(sunday)}</div>
   ${m.sessions ? '' : `<div class="fp-empty"><strong>Todavía no hay sesiones registradas.</strong><p>Invita a ${name} a hacer la sesión de hoy desde Inicio: dura entre 10 y 15 minutos y se puede hacer en casa.</p></div>`}
   <div class="fp-kpis">
     <article><strong>${thisWeek.length}<small> / 3</small></strong><span>Sesiones esta semana</span></article>
     <article><strong>${thisWeek.reduce((a,x)=>a+x.m,0)}<small> min</small></strong><span>Minutos de actividad</span></article>
     <article><strong>${activeDays}<small> / 7</small></strong><span>Días activos</span></article>
     <article><strong>🔥 ${m.streak}</strong><span>Días seguidos · mejor: ${m.best}</span></article></div>
   <section class="fp-card"><h3>Minutos por semana</h3><div class="fp-chart">${weeks.map(x => `<div class="fp-col" title="${x.min} min · ${x.n} sesiones"><span class="fp-val">${x.min || ''}</span><i style="height:${Math.round(100*x.min/maxMin)}%"></i><small>${shortDate(x.mon)}</small></div>`).join('')}</div></section>
   <div class="fp-grid">
     <section class="fp-card"><span class="fp-kicker">QUÉ ESTÁ APRENDIENDO</span><h3>${E(w.domain)}</h3><p class="fp-strong">Semana ${w.week}: ${E(T(w))}</p><p>${E(w.objective)}</p>
       ${s.sport ? `<p class="fp-sport">${E(sportLine(w, s.sport))}</p>` : ''}<p class="fp-muted">${doneCount(w)} de 3 sesiones de esta semana completadas.</p></section>
     <section class="fp-card"><span class="fp-kicker">LO QUE HA LOGRADO</span><ul class="fp-list">
       <li><b>${m.sessions}</b> sesiones · <b>${m.minutes}</b> minutos en total</li>
       <li><b>${m.weeksComplete}</b> semanas completas</li>
       <li><b>${m.quizPassed}</b> cuestionarios con todas las respuestas correctas</li>
       <li><b>${m.practices}</b> prácticas registradas para su docente</li>
       <li><b>${m.family}</b> ${m.family === 1 ? 'reto' : 'retos'} en familia</li>
       <li><b>${validated.length}</b> competencias validadas por un docente${validated.length ? ': ' + validated.map(([id,v]) => `${E(domName(id))} (${E(v.docente)}, ${E(v.fecha)})`).join('; ') : ''}</li></ul></section>
   </div>
   ${lastRef ? `<section class="fp-card fp-quote"><span class="fp-kicker">SU ÚLTIMA REFLEXIÓN${refW ? ' · SEMANA ' + refW.week : ''}</span><blockquote>«${E(String(lastRef[1].answer).slice(0,300))}»</blockquote>${refW ? `<small>Pregunta: ${E(refW.question)}</small>` : ''}</section>` : ''}
   <div class="fp-grid">
     <section class="fp-card"><span class="fp-kicker">QUÉ VIENE</span>${p ? `<h3>Sesión ${n} de 3 · ${p.total} min</h3><p>${E(p.blocks[1].d)}</p><p class="fp-muted"><b>Necesita:</b> ${E(p.needs.join(' · '))}</p>` : `<h3>Semana completa ✓</h3><p>La próxima es la semana ${Math.min(52, w.week+1)}.</p>`}</section>
     <section class="fp-card ${fam ? 'fp-done' : ''}"><span class="fp-kicker">♥ RETO FAMILIAR</span><p class="fp-strong">${E(familyText(w))}</p>
       <button class="fp-btn" id="fpFamily" ${fam ? 'disabled' : ''}>${fam ? '✓ Completado' : 'Lo hicimos en familia'}</button></section>
   </div>
   <section class="fp-card"><span class="fp-kicker">CÓMO APOYAR EN CASA</span><ul class="fp-tips">${tips.map(t => `<li>${E(t)}</li>`).join('')}</ul></section>
   <footer class="fp-foot"><p>Estos datos son los que ${name} registra en este dispositivo. Las competencias solo aparecen como logradas cuando un docente las valida en clase.</p>
     <button class="fp-btn" id="fpPrint">Imprimir o guardar PDF</button></footer></section>`;
  panel.querySelector('#fpFamily')?.addEventListener('click', () => { s.familyDone[w.id] = today(); persist(); update(); });
  panel.querySelector('#fpPrint').onclick = () => window.print();
}

/* ---------- Integración ---------- */
/* Una semana con sesiones cuenta como «con actividad» en Inicio y Ruta Anual. */
if (typeof routeProgress === 'function') { const prevRP = routeProgress; routeProgress = w => prevRP(w) || doneCount(w) > 0; }
const active = id => document.getElementById(id)?.classList.contains('active');
const prevUpdate = update;
update = function () {
  prevUpdate();
  if (active('inicio')) renderHome();
  if (active('familia')) renderFamily();
  if (active('perfil')) renderPerfil();
};
renderHome(); renderPerfil();
})();
