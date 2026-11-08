import {eiffelScene,goldenGateScene} from './destination-art.js';
import {tokyoScene,towerBridgeScene,libertyScene,sydneyScene,romeScene} from './more-destination-art.js';
const base='<path d="M0 345Q90 330 180 347T400 340V410H0Z" fill="#b6c3af"/>';
const water='<path d="M0 341H400V410H0Z" fill="#a9c1c8"/><path d="M25 369h60m70 12h80m70-17h60" stroke="#dce7e8" stroke-width="2"/>';
const art={eiffel:eiffelScene,'golden-gate':goldenGateScene,tokyo:tokyoScene,'tower-bridge':towerBridgeScene,liberty:libertyScene,sydney:sydneyScene,rome:romeScene};
export function sceneFor(id){if(art[id])return art[id];if(id==='sea')return water;
 if(id==='snowy-mountains')return '<path d="m0 354 94-91 85 71 79-96 142 116v56H0Z" fill="#aabdc5"/><path d="m94 263-32 31 20-4 12 10 13-12 22 8zM258 238l-32 39 21-7 12 12 13-13 28 9z" fill="#fffbf4"/><path d="m0 391 136-72 102 68 88-55 74 62v16H0Z" fill="#c4d2d2"/><path d="m136 319-25 14 17-2 9 10 12-8 19 9z" fill="#fffbf4"/>';

 if(id==='forest')return base+'<path d="M0 339q100-35 200 0t200-8v79H0Z" fill="#a3b39d"/>'+Array.from({length:11},(_,i)=>{const x=i*39+4,y=295+(i%3)*12;return `<path d="M${x} ${y+15}v55" stroke="#877b64" stroke-width="4"/><path d="m${x} ${y-28}-23 43h12l-17 21h56l-17-21h12z" fill="${i%2?'#819b7a':'#92a787'}"/>`;}).join('');
 if(id==='desert')return '<path d="M0 337q100-30 200-4t200-4v81H0Z" fill="#dcc9a8"/><path d="m90 337 65-87 65 87z" fill="#c5ad87"/><path d="m155 250 20 87h45z" fill="#b59c77"/><path d="m235 341 45-61 47 61z" fill="#cbb58f"/><path d="m280 280 13 61h34z" fill="#baa17b"/><path d="M0 377q140-48 260-3t140-5v41H0Z" fill="#e4d3b4"/>';
 if(id==='mountains')return '<path d="m0 354 94-91 85 71 79-96 142 116v56H0Z" fill="#b6c3af"/><path d="m0 391 136-72 102 68 88-55 74 62v16H0Z" fill="#a3b39d"/>';return base+Array.from({length:12},(_,i)=>`<rect x="${i*36-8}" y="${325-[25,9,35,16,43,5][i%6]}" width="26" height="65" fill="${i%2?'#bdc6b4':'#aebda6'}"/>`).join('');}
