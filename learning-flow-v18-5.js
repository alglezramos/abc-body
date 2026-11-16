/* ABC BODY V18.6 — experiencia educativa guiada, sin cambios al dataset ni a la evaluación docente
   V18.6: reflexión de la ficha recuperada, cuestionario con respuestas barajadas y distractores
   tomados de otras fichas de la ruta, mensajes en la página en lugar de alert(). */
(() => {
 'use strict';
 const host=document.getElementById('academia'); if(!host)return;
 const ids=['aprende','observa','comprueba','practica'];
 let stage='aprende',videoUrl=null,lastId=null;
 const E=v=>String(v??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const el=id=>document.getElementById(id);
 const record=w=>s.academy[w.id]||{};
 const store=(w,values)=>{s.academy[w.id]={...record(w),...values,date:new Date().toISOString().slice(0,10)};persist()};
 // Cuestionarios guardados con V18.5 tenían otras preguntas: se ignoran (quedan en el respaldo)
 const quizRec=w=>{let q=record(w).quiz;return q&&q.v===2?q:{}};
 const topic=w=>w.domain||w.title;
 const key=w=>'educational-'+w.id;
 const sentence=t=>String(t||'').split(/(?<=[.!?])\s+/)[0]?.trim()||'';
 const clip=(t,n=170)=>{t=String(t||'').trim();if(t.length<=n)return t;let c=t.slice(0,n);return c.slice(0,c.lastIndexOf(' ')>n*.6?c.lastIndexOf(' '):n).replace(/[,;:.\s]+$/,'')+'…'};
 // Quita el nombre de la propia ficha del texto de una opción (si no, la respuesta correcta se delata con el título)
 const esc=t=>t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 const neutral=(x,t)=>{let name=String(x.title||'').split(' · ')[0].trim();if(!name)return t;return String(t||'').replace(new RegExp('«?'+esc(name)+'»?','gi'),'esta actividad')};
 const isWarmup=w=>w.program==='ABC ATHLETE'&&/preparaci[oó]n y calentamiento/i.test(topic(w));
 // Generador pseudoaleatorio con semilla: el orden es estable para cada ficha (no cambia al recargar)
 const seed=str=>{let h=2166136261;for(const c of String(str)){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0};
 const rng=n=>()=>{n=(n+0x6D2B79F5)>>>0;let t=n;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296};
 const shuffle=(arr,r)=>{arr=arr.slice();for(let i=arr.length-1;i>0;i--){let j=Math.floor(r()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]]}return arr};
 // Distractores reales: misma clase de texto de OTRAS fichas de la ruta, de otro dominio
 const distractors=(w,get,r)=>{let own=get(w),seen=new Set([own]),pool=shuffle(currentWeeks().filter(x=>x.domain_id!==w.domain_id),r),out=[];
  for(const x of pool){let v=get(x);if(v&&!seen.has(v)){seen.add(v);out.push(v)}if(out.length===2)break}return out};
 const questions=w=>{
  if(isWarmup(w))return [
   {q:'¿Para qué sirve principalmente el calentamiento?',o:['Para terminar agotado antes del ejercicio','Para preparar gradualmente el cuerpo y la atención','Para evitar practicar después'],a:1,why:'Prepara progresivamente el cuerpo y la atención para el movimiento.'},
   {q:'¿Cómo conviene comenzar?',o:['Con movimientos suaves y progresivos','Con el máximo esfuerzo inmediatamente','Saltando la preparación'],a:0,why:'El esfuerzo y los movimientos deben adaptarse progresivamente.'},
   {q:'¿Qué haces si aparece dolor?',o:['Seguir más rápido','Ignorarlo','Detener o modificar la actividad y buscar orientación'],a:2,why:'El dolor es una señal para ajustar o detener la actividad.'}];
  const r=rng(seed(w.id));
  const make=(q,raw,why)=>{let get=x=>neutral(x,raw(x));let right=get(w);if(!right)return null;let wrong=distractors(w,get,r);if(wrong.length<2)return null;return {q,o:[right,...wrong],a:0,why:why(right)}};
  return [
   make('¿Cuál de estas ideas corresponde a la explicación de esta clase?',x=>clip(sentence(x.theory)),v=>'La teoría de esta clase dice: '+v),
   [1,2,3,0].map(k=>make('¿Cuál de estas consignas forma parte de la actividad de esta semana?',x=>clip(x.steps?.[k]),()=>'Es uno de los pasos de la actividad; repásalos en «Practica».')).find(Boolean),
   [0,1,2].map(k=>make('¿Qué revisará tu docente cuando practiques?',x=>{let t=sentence(x.rubric?.[k]).replace(/^En «[^»]*»,\s*/,'');return clip(t.charAt(0).toUpperCase()+t.slice(1))},v=>'El criterio de esta clase es: '+v)).find(Boolean)
    ||make('¿Cuál es el objetivo de esta clase?',x=>clip(x.objective),v=>'El objetivo es: '+v)
  ].filter(Boolean);
 };
 // Orden de opciones barajado por ficha y pregunta; los valores guardados siguen siendo índices originales
 const order=(w,i,n)=>shuffle([...Array(n).keys()],rng(seed(w.id+'#'+i)));
 host.insertAdjacentHTML('beforeend',`<section id="learningFlow" class="lf">
  <div class="lf-head"><div><div class="lf-kicker">ABC BODY · ACADEMIA</div><h2 id="lfTitle"></h2><p id="lfMeta"></p></div><button id="lfRoute" class="lf-secondary">Ruta Anual</button></div>
  <div id="lfTabs" class="lf-tabs" role="tablist"></div><div id="lfContent"></div>
  <p class="lf-footer">Progreso guardado en este navegador. Ni el cuestionario ni la subida de un video certifican habilidades: la validación docente es independiente.</p></section>`);
 el('lfRoute').onclick=()=>show('ruta');
 function tabs(w){let r=record(w),practice=s.submissions.some(x=>x.id===w.id);
  let flags=[r.reviewed?'Revisada':'Pendiente',r.videoWatched?'Visto':r.eduVideo?'Por ver':'Sin video',quizRec(w).passed?'Aprobado':'Pendiente',practice?'Registrada':'Pendiente'];
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
 function quiz(w){let qs=questions(w),r=quizRec(w),answers=r.answers||[],n=qs.length;return `<div class="lf-intro"><small>PASO 3 DE 4</small><h3>Comprueba lo que aprendiste</h3><p>Responde ${n===3?'estas tres preguntas':'estas preguntas'} y escribe tu reflexión.</p></div>
 ${!isWarmup(w)?'<p class="lf-disclaimer">Cuestionario inicial elaborado a partir de la ficha; pendiente de revisión pedagógica individual.</p>':''}
 ${qs.map((q,i)=>`<fieldset class="lf-question"><legend>${i+1}. ${E(q.q)}</legend>${order(w,i,q.o.length).map(j=>`<label class="lf-answer"><input type="radio" name="lfq${i}" value="${j}" ${answers[i]===j?'checked':''}> ${E(q.o[j])}</label>`).join('')}${r.submitted?`<p class="lf-feedback ${answers[i]===q.a?'correct':''}">${answers[i]===q.a?'Correcto. ':'Revisa esta respuesta. '}${E(q.why)}</p>`:''}</fieldset>`).join('')}
 ${r.submitted?`<p class="lf-score">Resultado: ${r.score}/${n} · ${r.passed?'Comprensión básica comprobada':'Puedes corregir y volver a intentar'}</p>`:''}
 <p class="lf-msg" id="lfQuizMsg" role="status"></p>
 <div class="lf-actions"><button class="lf-primary" id="lfGrade">Corregir respuestas</button></div>
 <div class="lf-reflection"><h4>Tu reflexión</h4><p>${E(w.question)}</p><textarea id="lfAnswer" rows="3" maxlength="650" placeholder="Escribe con tus palabras lo que aprendiste">${E(record(w).answer||'')}</textarea>
 <p class="lf-msg" id="lfAnswerMsg" role="status">${record(w).answer?'Reflexión guardada · '+E(record(w).date||''):'Sin corrección automática: es para ti y tu docente.'}</p>
 <div class="lf-actions"><button class="lf-secondary" id="lfSaveAnswer">Guardar mi reflexión</button><button class="lf-secondary" id="lfToPractice">Continuar a la práctica →</button></div></div>`}
 function practice(w){return `<div class="lf-intro"><small>PASO 4 DE 4</small><h3>Demuestra lo aprendido</h3><p>Realiza la actividad, registra una evidencia en video local o usa la opción de observación presencial.</p></div>
  <div class="lf-note"><h4>Pasos de la actividad</h4><ol>${(w.steps||[]).map(x=>`<li>${E(x)}</li>`).join('')}</ol></div>
  <div class="lf-note"><h4>Qué revisará el instructor</h4><ul>${(w.rubric||[]).map(x=>`<li>${E(x)}</li>`).join('')}</ul></div>
  <p class="lf-caution"><b>Seguridad:</b> ${E(w.safety)}</p>
  <p>${s.submissions.some(x=>x.id===w.id)?'✓ Ya existe una práctica registrada; sigue pendiente de evaluación profesional.':'Aún no se ha registrado una práctica para esta semana.'}</p>
  <button class="lf-primary" id="lfSubmitPractice">Abrir Entrena y subir video →</button>`}
 function cleanup(){if(videoUrl){URL.revokeObjectURL(videoUrl);videoUrl=null}let v=el('lfPlayer');if(v){v.pause();v.removeAttribute('src')}}
 async function loadVideo(w){try{let file=await getMedia(key(w));if(!file||stage!=='observa'||item().id!==w.id)return;let v=el('lfPlayer');if(!v)return;videoUrl=URL.createObjectURL(file);v.src=videoUrl;v.onended=()=>{store(w,{videoWatched:true});tabs(w)}}catch(_){}}
 function render(){let w=item();cleanup();if(w.id!==lastId){if(lastId!==null)stage='aprende';lastId=w.id}el('lfTitle').textContent=w.title;el('lfMeta').textContent=w.program+' · '+(w.cohort_label||w.age)+' años · Semana '+w.week;tabs(w);
  el('lfContent').innerHTML=({aprende:theory,observa:video,comprueba:quiz,practica:practice})[stage](w);
  if(stage==='aprende')el('lfLearn').onclick=()=>{store(w,{reviewed:true});stage='observa';update()};
  if(stage==='observa'){
   if(record(w).eduVideo)loadVideo(w);
   el('lfVideoNext').onclick=()=>{stage='comprueba';render()};
   el('lfSaveVideo').onclick=async()=>{let f=el('lfFile').files?.[0];if(!f){el('lfVideoMsg').textContent='Selecciona un archivo.';return}if(!['video/mp4','video/webm','video/quicktime'].includes(f.type)||f.size>80*1024*1024){el('lfVideoMsg').textContent='Formato MP4, WebM o MOV; máximo 80 MB.';return}try{await putMedia(key(w),f);store(w,{eduVideo:{name:f.name,type:f.type},videoWatched:false});render()}catch(e){el('lfVideoMsg').textContent='No se pudo guardar: '+e.message}};
  }
  if(stage==='comprueba'){
   el('lfGrade').onclick=()=>{let qs=questions(w),a=qs.map((q,i)=>{let x=document.querySelector('input[name="lfq'+i+'"]:checked');return x?Number(x.value):null});if(a.some(v=>v===null)){el('lfQuizMsg').textContent='Responde todas las preguntas antes de corregir.';return}let score=qs.filter((q,i)=>q.a===a[i]).length;store(w,{quiz:{v:2,answers:a,score,passed:score===qs.length,submitted:true}});update()};
   el('lfSaveAnswer').onclick=()=>{let t=el('lfAnswer').value.trim().slice(0,650);if(!t){el('lfAnswerMsg').textContent='Escribe algo antes de guardar.';return}store(w,{answer:t});update();let m=el('lfAnswerMsg');if(m)m.textContent='Reflexión guardada en este navegador. Aparece en «Mi Trayectoria».'};
   el('lfToPractice').onclick=()=>{stage='practica';render()};
  }
  if(stage==='practica')el('lfSubmitPractice').onclick=()=>show('evidencia');
 }
 const visible=()=>host.classList.contains('active');
 let origUpdate=update;update=function(){origUpdate();if(visible())render()};
 // Pie de página: la versión visible la fija esta capa hasta integrar todo en index.html
 document.querySelectorAll('footer,.footer,.main>p').forEach(f=>{if(/ABC BODY LOCAL V18\.\d/.test(f.textContent))f.textContent=f.textContent.replace(/V18\.\d/,'V18.6')});
 render();
})();
