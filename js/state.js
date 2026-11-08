export const locations = [
  ['Eiffel Tower','Paris','eiffel'],['Tower Bridge','London','tower-bridge'],
  ['Statue of Liberty','New York City','liberty'],['Tokyo Tower','Tokyo','tokyo'],
  ['Sydney Opera House','Sydney','sydney'],['Colosseum','Rome','rome'],
  ['Golden Gate Bridge','San Francisco','golden-gate']
].map(([landmark,city,id])=>({landmark,city,id}));
export const passing = [
 'Your balloon floats past the {landmark} in {city}. Your worry has traveled so far away.',
 'Above the {landmark} in {city}, your balloon keeps moving. In this moment, the world feels so small.',
 'Your balloon passes the {landmark} in {city}. Where will life take you?'
];
export const closing = [
 'Your balloon comes to rest near the {landmark} in {city}, then fades into the sky. The brisk air fills the space it left behind.'
];
const segmenter = new Intl.Segmenter(undefined,{granularity:'grapheme'});
export const characters = text => Array.from(segmenter.segment(text),x=>x.segment);
export const sentenceLines = text => text.replace(/([.!?])\s+/g, '$1\n\n');
export const format = (text,location) => text.replaceAll('{landmark}',location.landmark).replaceAll('{city}',location.city);
function sample(items,n){const pool=[...items];for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}return pool.slice(0,n);}
export const TRANSIT_MESSAGES = [
 'Your worries are floating away, somewhere in the sky.',
 'Your worries travel even farther, farther away.',
 'With the wind, your worries drift away.'
];
export const COMPLETE_MESSAGE = 'What will you let go of next?';
export const TRANSIT_LANDSCAPES = ['city','mountains','sea','forest','desert','snowy-mountains'];
const TRANSIT_DRIFT = 26.4; // 10% faster than the original 24 units per five seconds.
const DISSOLVE_START = 30000;
const DISSOLVE_DURATION = 5000;
export class Experience {
 constructor(){this.reset();}
 reset(){this.stage='write';this.worry='';this.colour='red';this.elapsed=0;this.route=[];this.messages=[];this.final='';this.transitScenes=[];}
 write(text){if(this.stage==='write')this.worry=characters(text).slice(0,200).join('');}
 prepare(){if(this.stage==='write'&&this.worry.trim())this.stage='ready';}
 edit(){if(this.stage==='ready')this.stage='write';}
 hold(){if(this.stage==='ready')this.stage='holding';}
 cancel(){if(this.stage==='holding')this.stage='ready';}
 release(){if(this.stage!=='holding')return;this.route=sample(locations,3);this.transitScenes=sample(TRANSIT_LANDSCAPES,3);this.messages=sample(passing,2);this.final=sample(closing,1)[0];this.stage='journey';this.elapsed=0;}
 advance(ms){if(!['journey','dissolving'].includes(this.stage))return;this.elapsed+=Math.max(0,ms);if(this.elapsed>=DISSOLVE_START+DISSOLVE_DURATION){this.stage='complete';this.worry='';}else if(this.elapsed>=DISSOLVE_START)this.stage='dissolving';}
 // Only the final dissolution can change visibility. Travel and location holds stay opaque.
 get balloonOpacity(){if(this.stage==='complete')return 0;if(this.stage!=='dissolving')return 1;return Math.max(0,1-(this.elapsed-DISSOLVE_START)/DISSOLVE_DURATION);}
 get index(){return this.elapsed>=25000?2:this.elapsed>=15000?1:this.elapsed>=5000?0:-1;}
 get destination(){return this.index<0?null:this.route[this.index];}
 get reveal(){return this.elapsed>=25000||(this.elapsed>=5000&&this.elapsed<10000)||(this.elapsed>=15000&&this.elapsed<20000);}
 get transitIndex(){return this.elapsed>=20000?2:this.elapsed>=10000?1:0;}
 // A restrained 26.4-unit left-to-right drift over each five-second travel segment.
 get transitOffset(){if(this.stage!=='journey'||this.reveal)return 0;return -TRANSIT_DRIFT/2+TRANSIT_DRIFT*Math.min(1,(this.elapsed-this.transitIndex*10000)/5000);}
 get cloudOffset(){return TRANSIT_DRIFT*Math.min(3,Math.max(0,this.transitIndex)+Math.min(1,Math.max(0,(this.elapsed-this.transitIndex*10000)/5000)));}
 get transitScene(){return this.transitScenes[this.transitIndex];}
 get message(){if(this.stage==='complete')return COMPLETE_MESSAGE;return this.reveal&&this.destination?format(this.index===2?this.final:this.messages[this.index],this.destination):TRANSIT_MESSAGES[this.transitIndex];}
}
