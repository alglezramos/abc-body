/* ABC BODY V18.5 — experiencia educativa guiada, sin cambios al dataset ni a la evaluación docente */
(() => {
 'use strict';
 const host=document.getElementById('academia'); if(!host)return;
 const ids=['aprende','observa','comprueba','practica'];
 let stage='aprende',videoUrl=null;
 const E=v=>String(v??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const el=id=>document.getElementById(id);
 const record=w=>s.academy[w.id]||{};
 const store=(w,values)=>{s.academy[w.id]={...record(w),...values,date:new Date().toISOString().slice(0,10)};persist()};
 const topic=w=>w.domain||w.title;
 const key=w=>'educational-'+w.id;
 const sentence=t=>String(t||'').split(/(?<=[.!?])\s+/)[0]?.trim()||'Repasa la teoría de la ficha.';
 const isWarmup=w=>w.program==='ABC ATHLETE'&&/preparaci[oó]n y calentamiento/i.test(topic(w));
 const questions=w=>{
  if(isWarmup(w))return [
   {q:'¿Para qué sirve principalmente el calentamiento?',o:['Para terminar agotado antes del ejercicio','Para preparar gradualmente el cuerpo y la atención','Para evitar practicar después'],a:1,why:'Prepara progresivamente el cuerpo y la atención para el movimiento.'},
   {q:'¿Cómo conviene comenzar?',o:['Con movimientos suaves y progresivos','Con el máximo esfuerzo inmediatamente','Saltando la preparación'],a:0,why:'El esfuerzo y los movimientos deben adaptarse progresivamente.'},
   {q:'¿Qué haces si aparece dolor?',o:['Seguir más rápido','Ignorarlo','Detener o modificar la actividad y buscar orientación'],a:2,why:'El dolor es una señal para ajustar o detener la actividad.'}];
  const others=[...new Set(currentWeeks().map(x=>topic(x)))].filter(x=>x!==topic(w));
  const action=String(w.steps?.[1]||w.steps?.[0]||'Seguir los pasos de la ficha').slice(0,195);
  const idea=sentence(w.theory).slice(0,190);
  return [
   {q:'¿Qué habilidad trabajamos esta semana?',o:[others[2]||'Otro tema',topic(w),others[6]||'Otro ejercicio'],a:1,why:'Esta clase trata de '+topic(w)+'.'},
   {q:'¿Cuál es la idea principal de la explicación?',o:['Todos deben realizar la misma dificultad',idea,'Siempre es mejor practicar hasta el agotamiento'],a:1,why:idea},
   {q:'¿Qué indica la actividad principal?',o:[action,'Ignorar las indicaciones y competir por velocidad','Empezar directamente por la variante más exigente'],a:0,why:'Sigue la consigna y adapta el esfuerzo a tus capacidades.'}
  ];
 };
 host.insertAdjacentHTML('beforeend',`<section id="learningFlow" class="lf">
  <div class="lf-head"><div><div class="lf-kicker">ABC BODY · ACADEMIA</div><h2 id="lfTitle"></h2><p id="lfMeta"></p></div><button id="lfRoute" class="lf-secondary">Ruta Anual</button></div>
  <div id="lfTabs" class="lf-tabs" role="tablist"></div><div id="lfContent"></div>
  <p class="lf-footer">Progreso guardado en este navegador. Ni el cuestionario ni la subida de un video certifican habilidades: la validación docente es independiente.</p></section>`);
 el('lfRoute').onclick=()=>show('ruta');
 function tabs(w){let r=record(w),practice=s.submissions.some(x=>x.id===w.id);
  let flags=[r.reviewed?'Revisada':'Pendiente',r.videoWatched?'Visto':r.eduVideo?'Por ver':'Sin video',r.quiz?.passed?'Aprobado':'Pendiente',practice?'Registrada':'Pendiente'];
  el('lfTabs').innerHTML=ids.map((id,i)=>`<button type="button" data-lf="${id}" class="lf-tab ${stage===id?'active':''}" role="tab" aria-selected="${stage===id}"><span>${i+1}</span><b>${['Aprende','Observa','Comprueba','Practica'][i]}<small>${flags[i]}</small></b></button>`).join('');
  el('lfTabs').querySelectorAll('[data-lf]').forEach(b=>b.onclick=()=>{stage=b.dataset.lf;render()});
 }
 function theory(w){return `<div class="lf-intro"><small>PASO 1 DE 4</small><h3>Primero, aprende la teoría</h3><p>Entiende qué es, por qué importa y qué vas a practicar.</p></div>
  <div class="lf-theory"><h4>Lo que necesitas saber</h4><p>${E(w.theory)}</p></div>
  <div class="lf-two"><div class="lf-note"><h4>Objetivo de aprendizaje</h4><p>${E(w.objective)}</p></div><div class="lf-note"><h4>Materiales</h4><p>${E(w.materials||'Prepara un espacio adecuado.')}</p></div></div>
  <button class="lf-primary" id="lfLearn">Marcar teoría revisada y continuar →</button>`}
 function video(w){let exists=!!record(w).eduVideo;return `<div class="lf-intro"><small>PASO 2 DE 4</small><h3>Observa cómo se hace</h3><p>El video debe explicar los movimientos, mostrar cómo realizarlos y señalar errores frecuentes.</p></div>
  <div class="lf-video">${exists?'<video id="lfPlayer" controls playsinline preload="metadata"></video>':'<div class="lf-empty"><div class="lf-play">▶</div><h4>Video explicativo pendiente</h4><p>Esta clase todavía no tiene un video educativo. No se marcará como visto.</p></div>'}</div>
  <div class="lf-note"><h4>Qué observar en la demostración</h4><ol>${(w.steps||[]).slice(0,3).map(x=>`<li>${E(x)}</li>`).join('')}</ol></div>
  <details class="lf-author"><summary>Añadir video educativo (modo desarrollo)</summary><p>Usa solamente videos propios o autorizados. El archivo se guarda en IndexedDB en este dispositivo; no se publica.</p><input id="lfFile" type="file" accept="video/mp4,video/webm,video/quicktime"><button id="lfSaveVideo" class="lf-secondary">Guardar video</button><p id="lfVideoMsg"></p></details>
  <button id="lfVideoNext" class="lf-secondary">Continuar al cuestionario →</button>`}
 function quiz(w){let qs=questions(w),r=record(w).quiz||{},answers=r.answers||[];return `<div class="lf-intro"><small>PASO 3 DE 4</small><h3>Comprueba lo que aprendiste</h3><p>Responde estas tres preguntas y recibe una explicación de cada respuesta.</p></div>
 ${!isWarmup(w)?'<p class="lf-disclaimer">Cuestionario inicial elaborado a partir de la ficha; pendiente de revisión pedagógica individual.</p>':''}
 ${qs.map((q,i)=>`<fieldset class="lf-question"><legend>${i+1}. ${E(q.q)}</legend>${q.o.map((o,j)=>`<label class="lf-answer"><input type="radio" name="lfq${i}" value="${j}" ${answers[i]===j?'checked':''}> ${E(o)}</label>`).join('')}${r.submitted?`<p class="lf-feedback ${answers[i]===q.a?'correct':''}">${answers[i]===q.a?'Correcto. ':'Revisa esta respuesta. '}${E(q.why)}</p>`:''}</fieldset>`).join('')}
 ${r.submitted?`<p class="lf-score">Resultado: ${r.score}/3 · ${r.passed?'Comprensión básica comprobada':'Puedes corregir y volver a intentar'}</p>`:''}
 <div class="lf-actions"><button class="lf-primary" id="lfGrade">Corregir respuestas</button><button class="lf-secondary" id="lfToPractice">Continuar a la práctica →</button></div>`}
 function practice(w){return `<div class="lf-intro"><small>PASO 4 DE 4</small><h3>Demuestra lo aprendido</h3><p>Realiza la actividad, registra una evidencia en video local o usa la opción de observación presencial.</p></div>
  <div class="lf-note"><h4>Pasos de la actividad</h4><ol>${(w.steps||[]).map(x=>`<li>${E(x)}</li>`).join('')}</ol></div>
  <div class="lf-note"><h4>Qué revisará el instructor</h4><ul>${(w.rubric||[]).map(x=>`<li>${E(x)}</li>`).join('')}</ul></div>
  <p class="lf-caution"><b>Seguridad:</b> ${E(w.safety)}</p>
  <p>${s.submissions.some(x=>x.id===w.id)?'✓ Ya existe una práctica registrada; sigue pendiente de evaluación profesional.':'Aún no se ha registrado una práctica para esta semana.'}</p>
  <button class="lf-primary" id="lfSubmitPractice">Abrir Entrena y subir video →</button>`}
 function cleanup(){if(videoUrl){URL.revokeObjectURL(videoUrl);videoUrl=null}let v=el('lfPlayer');if(v){v.pause();v.removeAttribute('src')}}
 async function loadVideo(w){try{let file=await getMedia(key(w));if(!file||stage!=='observa'||item().id!==w.id)return;let v=el('lfPlayer');if(!v)return;videoUrl=URL.createObjectURL(file);v.src=videoUrl;v.onended=()=>{store(w,{videoWatched:true});tabs(w)}}catch(_){}}
 function render(){let w=item();cleanup();el('lfTitle').textContent=w.title;el('lfMeta').textContent=w.program+' · '+(w.cohort_label||w.age)+' años · Semana '+w.week;tabs(w);
  el('lfContent').innerHTML=({aprende:theory,observa:video,comprueba:quiz,practica:practice})[stage](w);
  if(stage==='aprende')el('lfLearn').onclick=()=>{store(w,{reviewed:true});stage='observa';render();update()};
  if(stage==='observa'){
   if(record(w).eduVideo)loadVideo(w);
   el('lfVideoNext').onclick=()=>{stage='comprueba';render()};
   el('lfSaveVideo').onclick=async()=>{let f=el('lfFile').files?.[0];if(!f){el('lfVideoMsg').textContent='Selecciona un archivo.';return}if(!['video/mp4','video/webm','video/quicktime'].includes(f.type)||f.size>80*1024*1024){el('lfVideoMsg').textContent='Formato MP4, WebM o MOV; máximo 80 MB.';return}try{await putMedia(key(w),f);store(w,{eduVideo:{name:f.name,type:f.type},videoWatched:false});render()}catch(e){el('lfVideoMsg').textContent='No se pudo guardar: '+e.message}};
  }
  if(stage==='comprueba'){
   el('lfGrade').onclick=()=>{let qs=questions(w),a=qs.map((q,i)=>{let x=document.querySelector('input[name="lfq'+i+'"]:checked');return x?Number(x.value):null});if(a.some(v=>v===null)){alert('Responde las tres preguntas.');return}let score=qs.filter((q,i)=>q.a===a[i]).length;store(w,{quiz:{answers:a,score,passed:score===3,submitted:true}});render();update()};
   el('lfToPractice').onclick=()=>{stage='practica';render()};
  }
  if(stage==='practica')el('lfSubmitPractice').onclick=()=>show('evidencia');
 }
 let origUpdate=update;update=function(){origUpdate();if(el('learningFlow'))render()};
 let origShow=show;show=function(view){origShow(view);if(view==='academia')render()};
 render();
})();