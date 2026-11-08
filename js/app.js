import {Experience,characters,sentenceLines} from './state.js';
import {sceneFor} from './scenes.js';
import {DISTANT_SCALE,departureProgress,journeyScale,balloonTransform} from './balloon-scale.js';
const $=id=>document.getElementById(id);
const model=new Experience();
// A second, fixed-size copy allows a fade instead of scaling for reduced motion.
const distantBalloon=$('balloon').cloneNode(true);
distantBalloon.id='distant-balloon';
for(const element of distantBalloon.querySelectorAll('[id]')){element.classList.add(element.id);element.removeAttribute('id');}
$('balloon').after(distantBalloon);
distantBalloon.style.opacity='0';

const colours={red:'#bc7169',blue:'#7196ae',green:'#819b7a',yellow:'#d7bd76'};
let previousStage='',previousScene='',previousMessage='',lastTime=null,activePointer=null,activeKey=null,frame=null,composing=false,messageAnimation=null,finalTextShown=false,finalTextAppearing=false,completionAnimations=[],previousWorry=null;
const travel=()=>['journey','dissolving','complete'].includes(model.stage);
function render(){
 const stage=model.stage,travelling=travel();
 document.body.dataset.travelling=String(travelling);
 $('write-panel').hidden=stage!=='write';$('hold-panel').hidden=!['ready','holding'].includes(stage);$('journey-panel').hidden=!travelling;
 $('continue').disabled=!model.worry.trim();$('count').textContent=`${characters(model.worry).length} / 200`;
 $('balloon-body').setAttribute('fill',colours[model.colour]);$('balloon-knot').setAttribute('fill',colours[model.colour]);
 distantBalloon.querySelector('.balloon-body').setAttribute('fill',colours[model.colour]);
 distantBalloon.querySelector('.balloon-knot').setAttribute('fill',colours[model.colour]);
 if(model.worry!==previousWorry){
  const preview=$('balloon-preview');preview.textContent=model.worry;
  let fontSize=13;preview.style.fontSize=fontSize+'px';
  while(preview.scrollHeight>$('balloon-text-box').clientHeight&&fontSize>6){fontSize-=0.5;preview.style.fontSize=fontSize+'px';}
  const distantText=distantBalloon.querySelector('.balloon-preview');
  distantText.textContent=model.worry;distantText.style.fontSize=preview.style.fontSize;
  previousWorry=model.worry;
 }
 $('hold').classList.toggle('is-holding',stage==='holding');
 $('hold').setAttribute('aria-pressed',String(stage==='holding'));
 $('hold').textContent=stage==='holding'?'✓ Holding · release when ready':'Hold your balloon';
 $('heading').textContent=(['write','ready','holding'].includes(stage))?'What will you let go?':!finalTextAppearing?'A little farther away.':'In the sky, far away';
 $('subtitle').textContent=(['write','ready','holding'].includes(stage))?'Your worries will float away.':!finalTextAppearing?'With the winds, among the clouds':"You've let go of what you were holding onto";
 const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const progress=travelling?departureProgress(model.departureElapsed):0;
 $('balloon').setAttribute('transform',balloonTransform(travelling&&!reducedMotion?journeyScale(model.departureElapsed):1));
 $('balloon').style.opacity=String(model.balloonOpacity*(reducedMotion?1-progress:1));
 distantBalloon.setAttribute('transform',balloonTransform(DISTANT_SCALE));
 distantBalloon.style.opacity=String(reducedMotion?model.balloonOpacity*progress:0);
 const inTransit=travelling&&!model.departing&&!model.reveal;
 const scene=travelling&&model.reveal?model.destination.id:inTransit?model.transitScene:'city';
 const sceneKey=scene+(inTransit?':transit':':still');
 if(sceneKey!==previousScene){
  const container=$('landscape'),old=container.lastElementChild;
  const layer=document.createElementNS('http://www.w3.org/2000/svg','g');
  layer.classList.add('scene-layer');layer.style.opacity='0';
  const moving=inTransit;
  // Neighbouring tiles keep the edges covered as the landscape drifts.
  layer.innerHTML=moving?`<g class="transit-pan">${[-400,0,400].map(x=>`<g transform="translate(${x} 0)">${sceneFor(scene)}</g>`).join('')}</g>`:sceneFor(scene);
  container.append(layer);
  requestAnimationFrame(()=>requestAnimationFrame(()=>{layer.style.opacity='1';if(old){old.style.opacity='0';setTimeout(()=>old.remove(),850);}}));
  previousScene=sceneKey;
 }
 const pan=$('landscape').lastElementChild?.querySelector('.transit-pan');
 if(pan)pan.setAttribute('transform',`translate(${window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:model.transitOffset} 0)`);
 $('clouds').setAttribute('transform',`translate(${travelling&&!model.departing&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches?model.cloudOffset:0} 0)`);
 const caption=travelling&&model.reveal?`${model.destination.landmark} · ${model.destination.city}`:travelling?"your words are gently floating away":"you're still holding onto it";
 $('scene-caption').textContent=caption;
 $('scene').setAttribute('aria-label',`${stage==='complete'?'An open sky':travelling?'A small '+model.colour+' balloon':'An outstretched arm and hand holding a small '+model.colour+' balloon by its long string'} above ${caption}.`);
 if(travelling&&model.message!==previousMessage){
  const text=model.message;previousMessage=text;
  if(stage==='complete'){
   // Replace the destination reflection only after the balloon has disappeared.
   messageAnimation=$('message').animate([{opacity:1},{opacity:0}],{duration:500,fill:'forwards'});
   messageAnimation.finished.then(()=>{
    if(model.stage!=='complete'||previousMessage!==text)return;
    $('message').textContent=sentenceLines(text);
    messageAnimation.cancel();
    finalTextAppearing=true;render();
    completionAnimations=['message','heading','subtitle'].map(id=>$(id).animate([{opacity:0},{opacity:1}],{duration:700}));
    messageAnimation=completionAnimations[0];
    return Promise.all(completionAnimations.map(animation=>animation.finished)).then(()=>{if(model.stage==='complete'&&previousMessage===text){finalTextShown=true;render();}});
   }).catch(()=>{});
  }else{$('message').textContent=sentenceLines(text);}
 }
 $('restart').hidden=stage!=='complete'||!finalTextShown;$('end').hidden=stage==='complete';
 if(stage!==previousStage){
  // Focus only at screen boundaries; never steal focus for a passing landmark.
  if(stage==='ready'&&previousStage==='write')$('hold').focus();
  if(stage==='write'&&previousStage)$('worry').focus();
  if(stage==='journey'||stage==='complete')$('heading').focus();
  if(stage==='complete')$('worry').value='';
  previousStage=stage;
 }
}
function cancelHold(){activePointer=null;activeKey=null;model.cancel();render();}
function release(){activePointer=null;activeKey=null;model.release();lastTime=null;render();startClock();}
function reset(){finalTextShown=false;finalTextAppearing=false;completionAnimations.forEach(animation=>animation.cancel());completionAnimations=[];if(messageAnimation){messageAnimation.cancel();messageAnimation=null;}cancelAnimationFrame(frame);frame=null;lastTime=null;activePointer=null;activeKey=null;model.reset();$('worry').value='';document.querySelector('input[value="red"]').checked=true;previousMessage='';render();}
function startClock(){if(frame!==null||document.hidden)return;frame=requestAnimationFrame(tick);}
function tick(now){frame=null;if(document.hidden)return;if(lastTime!==null)model.advance(now-lastTime);lastTime=now;render();if(['journey','dissolving'].includes(model.stage))startClock();}
function input(){if(composing)return;model.write($('worry').value);if($('worry').value!==model.worry)$('worry').value=model.worry;render();}
$('worry').addEventListener('input',input);$('worry').addEventListener('compositionstart',()=>composing=true);$('worry').addEventListener('compositionend',()=>{composing=false;input();});
$('continue').addEventListener('click',()=>{input();model.prepare();$('worry').blur();$('worry').value='';render();});
$('edit').addEventListener('click',()=>{cancelHold();model.edit();$('worry').value=model.worry;render();});
document.querySelectorAll('input[name="colour"]').forEach(input=>input.addEventListener('change',()=>{if(model.stage==='write'){model.colour=input.value;render();}}));
const hold=$('hold');
hold.addEventListener('pointerdown',event=>{if(event.button!==0||!event.isPrimary||model.stage!=='ready')return;event.preventDefault();hold.focus();activePointer=event.pointerId;hold.setPointerCapture(event.pointerId);model.hold();render();});
hold.addEventListener('pointerup',event=>{if(activePointer!==event.pointerId)return;const r=hold.getBoundingClientRect();const inside=event.clientX>=r.left&&event.clientX<=r.right&&event.clientY>=r.top&&event.clientY<=r.bottom;if(inside)release();else cancelHold();});
hold.addEventListener('pointercancel',cancelHold);hold.addEventListener('lostpointercapture',()=>{if(activePointer!==null)cancelHold();});
hold.addEventListener('keydown',event=>{if(event.key==='Escape'){cancelHold();return;}if(![' ','Enter'].includes(event.key))return;event.preventDefault();if(event.repeat||model.stage!=='ready')return;activeKey=event.key;model.hold();render();});
hold.addEventListener('keyup',event=>{if(event.key===activeKey){event.preventDefault();release();}});
hold.addEventListener('blur',()=>{if(model.stage==='holding')cancelHold();});
hold.addEventListener('contextmenu',event=>event.preventDefault());
// Assistive technology may synthesize click without pointer or key events.
hold.addEventListener('click',event=>{if(event.detail===0&&model.stage==='ready'){model.hold();release();}});
$('end').addEventListener('click',reset);$('restart').addEventListener('click',reset);
window.addEventListener('blur',()=>{if(model.stage==='holding')cancelHold();});
document.addEventListener('visibilitychange',()=>{if(document.hidden){if(model.stage==='holding')cancelHold();cancelAnimationFrame(frame);frame=null;lastTime=null;}else if(['journey','dissolving'].includes(model.stage)){lastTime=null;startClock();}});
window.addEventListener('pagehide',reset);window.addEventListener('pageshow',event=>{if(event.persisted)reset();});
// Clear browser-restored input; no session persistence.
$('worry').value='';render();
