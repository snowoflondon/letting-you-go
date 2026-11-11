// Soft, flat landscape studies. The upper sky stays clear for the balloon.
export const wheatField = `
 <path d="M0 317q110-15 200 0t200-1v94H0Z" fill="#d7c591"/>
 <path d="M0 344q120-25 240-2t160 0v68H0Z" fill="#cbb47a"/>
 <path d="M0 378q130-19 265 0t135-1v33H0Z" fill="#ddca96"/>
 <g stroke="#b59b61" stroke-width="1.2" fill="none" opacity=".7">
 ${Array.from({length:27},(_,i)=>{const x=i*16-8,y=350+(i%3)*11;return `<path d="M${x} ${y+24}v-26m0 6-4-4m4 10 4-4m-4 10-4-4"/>`;}).join('')}
 </g>
 <!-- One small red tractor, with a cab, hood, and unequal wheels. -->
 <g transform="translate(244 321)">
  <path d="M-4 25h66" stroke="#ad965e" stroke-width="3" opacity=".4"/>
  <path d="M13 3h22v19H13Z" fill="#b87565"/>
  <path d="M17 6h14v12H17Z" fill="#b5cdca"/>
  <path d="M12 1h24v4H12Z" fill="#a36053"/>
  <path d="M30 16h23q5 0 5 5v4H26Z" fill="#b96f5e"/>
  <path d="M48 15V8" stroke="#726f5b" stroke-width="2"/>
  <circle cx="17" cy="25" r="10" fill="#626759"/><circle cx="17" cy="25" r="4.5" fill="#c4b391"/>
  <circle cx="49" cy="27" r="6.5" fill="#626759"/><circle cx="49" cy="27" r="3" fill="#c4b391"/>
 </g>`;

export const icySea = `
 <path d="M0 306h400v104H0Z" fill="#b5cdd1"/>
 <path d="M0 296 31 277 61 289 95 265 132 285 166 276 202 297 238 279 270 290 310 267 345 286 377 279 400 293v25H0Z" fill="#d7e3df"/>
 <path d="m61 289 34-24 37 20-22-7-14 9-8-12zM270 290l40-23 35 19-22-8-12 9-8-9z" fill="#f7f6ed"/>
 <path d="M0 318q95-10 180 1t220-2v93H0Z" fill="#a8c3ca"/>
 <g fill="#f3f4e9" stroke="#ccdedc" stroke-width="1">
  <path d="m50 345 21-36 20 9 19 29z"/><path d="m71 309 4 36h35l-19-27z" fill="#c9deda"/>
  <path d="m239 359 18-29 17-18 23 21 15 27z"/><path d="m274 312 4 46h34l-15-27z" fill="#c5dbd9"/>
  <path d="m142 386 15-20 18 7 11 14z"/>
 </g>
 <g fill="none" stroke="#dce8e2" stroke-width="1.5" stroke-linecap="round"><path d="M32 352h93m99 17h105m-202 23h75M165 339h40m127-7h41m-357 53h40"/></g>
 <path d="M0 406q35-12 69 4H0Zm400-4q-39-7-71 8h71Z" fill="#e8eee5"/>`;

export const autumnForest = `
 <path d="M0 329q110-20 220-3t180-5v89H0Z" fill="#c8bb95"/>
 <g fill="#c3ab80"><path d="M0 343q100-18 200-1t200-4v72H0Z"/></g>
 ${Array.from({length:12},(_,i)=>{
  const x=i*38-8,y=301+(i%3)*9;
  const colour=['#bc7b61','#cc9b69','#ae6e59','#c9a86f'][i%4];
  return `<g><path d="M${x} ${y+12}v55m0-25-8-9m8 1 8-11" fill="none" stroke="#8e7c60" stroke-width="2.5"/><path d="M${x-20} ${y+14}q-9-15 3-24 0-17 17-19 16-1 20 16 17 8 9 25-5 13-23 12-18 3-26-10z" fill="${colour}"/></g>`;
 }).join('')}
 <path d="M0 378q108-17 210 0t190-3v35H0Z" fill="#d7c197"/>
 <g fill="#b7805c" opacity=".7"><ellipse cx="39" cy="383" rx="3" ry="1.5"/><ellipse cx="135" cy="394" rx="3" ry="1.5"/><ellipse cx="274" cy="381" rx="3" ry="1.5"/><ellipse cx="357" cy="397" rx="3" ry="1.5"/></g>`;
