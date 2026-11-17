/* ABC BODY V18.8 — Medallero + Convenios locales.
   V18.9: insignias de sesiones/racha/familia (window.ABC9) y Convenios muestra solo alianzas confirmadas. */
(()=>{
'use strict';
const medal=document.getElementById('medallero'), nav=document.getElementById('nav');
if(!medal||!nav||document.getElementById('convenios'))return;
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const weeks=()=>currentWeeks(), ac=w=>s.academy?.[w.id]||{};
const hasPr=w=>s.submissions.some(a=>a.id===w.id);
const metrics=()=>{
 const w=weeks(),domains=[...new Set(w.map(a=>a.domain_id))];
 return {
 practice:w.filter(hasPr).length,
 theory:w.filter(a=>ac(a).reviewed).length,
 both:w.filter(a=>ac(a).reviewed&&hasPr(a)).length,
 cycle:w.slice(0,13).filter(a=>ac(a).reviewed&&hasPr(a)).length,
 validated:domains.filter(d=>{const v=validationFor(d);return v&&['competente','consolidada'].includes(v.nivel)}).length
 }};
const achievements=m=>[...(window.ABC9?ABC9.extraAchievements():[]),
 ['primer-paso','Primer paso','✦','Participación',m.practice,1,'Registrar una práctica.'],
 ['constancia','Constancia','↗','Práctica',m.practice,4,'Registrar prácticas en cuatro semanas diferentes.'],
 ['curiosidad','Curiosidad activa','▤','Aprendizaje',m.theory,4,'Revisar cuatro lecciones en Academia.'],
 ['ciclo','Ciclo de aprendizaje','◈','Trayectoria',m.cycle,13,'Revisar teoría y registrar prácticas en las 13 semanas del ciclo 1.'],
 ['docente','Competencia validada','✓','Evaluación docente',m.validated,1,'Obtener una competencia validada por docente.']
].map(([id,name,icon,category,value,goal,description])=>({id,name,icon,category,value,goal,description,earned:value>=goal,pct:Math.min(100,Math.round(value/goal*100))}));
const custom=document.createElement('div');custom.id='medalleroNuevo';medal.append(custom);
const tab=document.createElement('button');tab.className='nav';tab.type='button';tab.dataset.view='convenios';tab.textContent='◇ Convenios';
(nav.querySelector('[data-view="medallero"]')||nav.lastElementChild).insertAdjacentElement('afterend',tab);
const panel=document.createElement('div');panel.id='convenios';panel.className='view';medal.insertAdjacentElement('afterend',panel);
tab.onclick=()=>show('convenios');
let filter='Todos';
const cats=['Deporte y movimiento','Bienestar','Educación','Comunidad'];
const featured=[
 /* Organizaciones de referencia: ocultas hasta tener convenio firmado (signed:true). */
 {id:'ref-ccdr-santa-ana',name:'Comité Cantonal de Deportes y Recreación de Santa Ana',category:'Comunidad',description:'Organización deportiva y recreativa del cantón de Santa Ana.',logoIndex:0},
 {id:'ref-san-francisco-judo',name:'Asociación San Francisco Judo Costa Rica',category:'Deporte y movimiento',description:'Asociación vinculada a la práctica del judo.',logoIndex:1},
 {id:'ref-icoder',name:'ICODER',category:'Deporte y movimiento',description:'Instituto Costarricense del Deporte y la Recreación.',logoIndex:2},
 {id:'ref-propella',name:'PROPELLA Education & Sports',category:'Educación',description:'Organización de educación y deporte.',logoIndex:3},
 {id:'ref-ccdr-san-jose',name:'CCDR San José',category:'Comunidad',description:'Comité Cantonal de Deportes y Recreación de San José.',logoIndex:4},
 /* V19.0 — Convenios firmados (logos en un sprite incrustado en medallero-convenios-v18-8.css, una casilla de 320×200 por aliado). benefit: texto opcional para familias. */
 {id:'athletic-advance',name:'Athletic Advance',category:'Deporte y movimiento',description:'Entrenamiento y desarrollo atlético.',tile:0,signed:true,benefit:''},
 {id:'perform',name:'Perform',category:'Deporte y movimiento',description:'Entrenamiento orientado al rendimiento.',tile:1,signed:true,benefit:''},
 {id:'crossfit-506',name:'CrossFit 506',category:'Deporte y movimiento',description:'Box de CrossFit.',tile:2,signed:true,benefit:''},
 {id:'halcones-dc',name:'Academia de Fútbol Halcones D.C.',category:'Deporte y movimiento',description:'Academia de fútbol.',tile:3,signed:true,benefit:''},
 {id:'baloncesto-barva',name:'Academia de Baloncesto Barva',category:'Deporte y movimiento',description:'Academia de baloncesto.',tile:4,signed:true,benefit:''},
 {id:'nutri-snacks',name:'Nutri Snacks',category:'Bienestar',description:'Alimentación y snacks.',tile:5,signed:true,benefit:''},
 {id:'goodlife',name:'Goodlife',category:'Bienestar',description:'Aliado de bienestar.',tile:6,signed:true,benefit:''},
 {id:'golds-gym',name:"Gold's Gym",category:'Deporte y movimiento',description:'Gimnasio.',tile:7,signed:true,benefit:''}
];

const records=()=>{if(!Array.isArray(s.convenios))s.convenios=[];return s.convenios.filter(x=>x&&x.name).slice(0,100)};
function medalView(){
 const m=metrics(),arr=achievements(m),earned=arr.filter(x=>x.earned).length;
 const next=arr.filter(x=>!x.earned).sort((a,b)=>b.pct-a.pct)[0];
 custom.innerHTML=`<section class="cv"><header class="cv-hero"><div class="cv-kicker">ABC BODY / MEDALLERO</div><h2>Tu esfuerzo cuenta.</h2><p>Reconocemos el aprendizaje, la constancia y las competencias observadas.</p><div class="cv-hero-stats"><strong>${earned}<small> / ${arr.length}</small></strong><span>Insignias conseguidas</span></div></header>
 <div class="cv-stats"><article><strong>${m.practice}</strong><span>Semanas con práctica</span></article><article><strong>${m.theory}</strong><span>Lecciones revisadas</span></article><article><strong>${m.both}</strong><span>Teoría + práctica</span></article><article><strong>${m.validated}</strong><span>Competencias validadas</span></article></div>
 ${next?`<section class="cv-next"><div><span class="cv-kicker">SIGUIENTE LOGRO</span><h3>${esc(next.name)}</h3><p>${esc(next.description)}</p><div class="cv-bar"><i style="width:${next.pct}%"></i></div><small>${next.value} / ${next.goal}</small></div><button id="cvContinue" class="cv-action">Seguir aprendiendo</button></section>`:''}
 <h3>Mi colección de insignias</h3><div class="cv-medals">${arr.map(a=>`<article class="cv-medal ${a.earned?'earned':''}"><span class="cv-symbol">${a.icon}</span><strong>${esc(a.name)}</strong><small>${esc(a.category)}</small><p>${esc(a.description)}</p><div class="cv-bar"><i style="width:${a.pct}%"></i></div><span>${Math.min(a.value,a.goal)} / ${a.goal} · ${a.earned?'Conseguida':'Por conseguir'}</span></article>`).join('')}</div><div class="cv-note"><strong>Reglas claras</strong><p>Las insignias por participación no equivalen a dominio. Las competencias validadas requieren evaluación docente y no se conceden al subir un video.</p><button id="cvGoPartners">Explorar Convenios</button></div></section>`;
 custom.querySelector('#cvContinue')?.addEventListener('click',()=>show('academia'));
 custom.querySelector('#cvGoPartners')?.addEventListener('click',()=>show('convenios'));
}
function partnersView(){
 const confirmed=featured.filter(x=>x.signed),stored=records(),entries=[...confirmed,...stored],view=filter==='Todos'?entries:entries.filter(x=>x.category===filter);
 panel.innerHTML=`<section class="cv"><header class="cv-hero"><span class="cv-kicker">ABC BODY / CONVENIOS</span><h2>Alianzas para ir más lejos.</h2><p>Estamos sumando clubes, comités deportivos y organizaciones educativas. Aquí verás únicamente convenios confirmados y sus beneficios para tu familia.</p></header>
 <div class="cv-head"><div><span class="cv-kicker">EXPLORA</span><h3>Organizaciones y convenios</h3></div><span>${confirmed.length+stored.length} ${confirmed.length+stored.length===1?'alianza':'alianzas'}</span></div>
 ${entries.length?`<div class="cv-filters">${['Todos',...cats].map(c=>`<button data-cv-filter="${esc(c)}" class="${filter===c?'selected':''}">${esc(c)}</button>`).join('')}</div>`:''}
 ${view.length?`<div class="cv-partners">${view.map(p=>`<article class="cv-partner" data-featured="${Number.isInteger(p.logoIndex)||Number.isInteger(p.tile)}" data-signed="${!!p.signed}"><div class="cv-partner-logo">${Number.isInteger(p.tile)?`<span class="cv-logo-tile" role="img" aria-label="Logotipo de ${esc(p.name)}" style="--cv-pos:${(p.tile*100/7).toFixed(4)}%"></span>`:Number.isInteger(p.logoIndex)?`<span class="cv-logo-sprite" role="img" aria-label="Logotipo de ${esc(p.name)}" style="--cv-pos:${p.logoIndex*25}%"></span>`:p.logo?.startsWith('data:image/')?`<img alt="Logotipo de ${esc(p.name)}" src="${esc(p.logo)}">`:'<span aria-hidden="true">◇</span>'}</div><span class="cv-kicker">${esc(p.category||'Convenio')}</span><h4>${esc(p.name)}</h4><p>${esc(p.description||'Sin descripción registrada')}</p>${p.benefit?`<p class="cv-benefit"><b>Para familias ABC:</b> ${esc(p.benefit)}</p>`:''}<small>${p.signed?'✓ Convenio firmado':Number.isInteger(p.logoIndex)?'Organización de referencia · Vínculo por confirmar':'En desarrollo · No verificado'}</small>${p.signed?'':`<div class="cv-partner-actions"><label>Agregar logo<input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" data-cv-logo="${esc(p.id)}" hidden></label><button data-cv-delete="${esc(p.id)}">Eliminar</button></div>`}</article>`).join('')}</div>`:'<div class="cv-empty"><strong>Próximamente</strong><p>Estamos conversando con organizaciones deportivas y educativas. Cuando un convenio esté firmado, aparecerá aquí con sus beneficios.</p></div>'}
 <details class="cv-editor"><summary>Administración · registrar alianza</summary><form id="cvForm"><label>Nombre<input name="name" required maxlength="90" placeholder="Nombre del aliado"></label><label>Categoría<select name="category">${cats.map(c=>`<option>${c}</option>`).join('')}</select></label><label>Descripción<textarea name="description" maxlength="320" rows="3" placeholder="Posible colaboración o propósito"></textarea></label><label>Logotipo (opcional)<input name="logo" type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml"></label><button class="cv-action" type="submit">Guardar registro</button><p id="cvStatus" role="status"></p></form></details>
 <p class="cv-disclaimer">Los logos pertenecen a sus respectivas organizaciones. Solo se publican alianzas con convenio firmado.</p></section>`;
 panel.querySelectorAll('[data-cv-filter]').forEach(b=>b.onclick=()=>{filter=b.dataset.cvFilter;partnersView()});
 panel.querySelectorAll('[data-cv-delete]').forEach(b=>b.onclick=()=>{s.convenios=stored.filter(x=>x.id!==b.dataset.cvDelete);persist();partnersView()});
 panel.querySelectorAll('[data-cv-logo]').forEach(input=>input.onchange=async()=>{const p=entries.find(x=>x.id===input.dataset.cvLogo);if(!p||!input.files?.[0])return;try{p.logo=await readLogo(input.files[0]);persist();partnersView()}catch(e){alert(e.message)}});
 panel.querySelector('#cvForm').onsubmit=async e=>{e.preventDefault();const f=e.currentTarget,form=f.elements;let logo='';try{if(form.logo.files?.[0])logo=await readLogo(form.logo.files[0]);let name=form.name.value.trim();if(!name)return;s.convenios=[...stored,{id:'partner-'+Date.now(),name,category:form.category.value,description:form.description.value.trim(),logo,status:'Borrador'}];if(persist())partnersView();else panel.querySelector('#cvStatus').textContent='No se pudo guardar. Revisa el espacio local.'}catch(err){panel.querySelector('#cvStatus').textContent=err.message}};
}
async function readLogo(file){
 if(file.size>180000)throw Error('El logo debe pesar menos de 180 KB para incluirlo en el respaldo local.');
 if(!['image/png','image/jpeg','image/webp','image/svg+xml'].includes(file.type))throw Error('Elige PNG, JPG, WebP o SVG.');
 // SVG is not accepted in this demo, to avoid active content inside inline data URLs.
 if(file.type==='image/svg+xml')throw Error('Por seguridad, convierte el SVG a PNG antes de guardarlo.');
 return await new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=()=>reject(Error('No se pudo leer el archivo'));r.readAsDataURL(file)});
}
const oldMedals=renderMedals;renderMedals=function(){oldMedals();medalView()};
const oldShow=show;show=function(view){oldShow(view);if(view==='convenios')partnersView()};
medalView();
})();