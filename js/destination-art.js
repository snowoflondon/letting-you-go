// Hand-drawn vector scenes in the shared 400 × 410 coordinate system.
// Leave the upper sky clear for the balloon; ground each structure in its setting.
export const eiffelScene = `
 <path d="M0 326q75-13 141-2t129-6 130 5v87H0Z" fill="#cbd0bd"/>
 <g fill="#c3bbac" opacity=".8">
  <path d="M0 320h28v-15h28v19h23v-23h35v24h29v-13h32v15h33v-19h28v20h34v-18h35v15h33v-12h29v13h33v84H0Z"/>
  <path d="m26 305 16-8 16 8m19-4 19-8 19 8m92 7 16-9 15 9m41 2 18-9 19 9" fill="#a99f92"/>
 </g>
 <path d="M0 350q100-11 200-3t200-3v66H0Z" fill="#a7b596"/>
 <path d="m222 366-51 44h174l-42-44z" fill="#e2d4bd"/>
 <path d="M0 367h400v8H0Z" fill="#ded0b7"/>
 <path d="M0 376h400" stroke="#c5b89e" stroke-width="2"/>
 <g fill="#879b7a">
  <ellipse cx="35" cy="342" rx="24" ry="27"/><ellipse cx="67" cy="347" rx="22" ry="23"/>
  <ellipse cx="115" cy="346" rx="24" ry="26"/><ellipse cx="373" cy="344" rx="28" ry="30"/>
 </g>
 <g stroke="#776b5b" fill="none" stroke-linejoin="round" stroke-linecap="round">
  <!-- Four sweeping legs, with daylight under the characteristic base arch. -->
  <path d="M279 211q-5 49-15 85-10 37-39 69h17q17-25 25-45 12-24 24 0 8 20 25 45h17q-29-32-39-69-10-36-15-85Z" fill="#a59379" stroke-width="2"/>
  <path d="M279 211v-17m-3 17h6m-8 14h10" stroke-width="2"/>
  <path d="m279 226-7 36h14zm-8 40-9 34h34l-9-34z" fill="#d6c8af" stroke-width="1.2"/>
  <path d="m275 240 8 11-11 11m13-22-9 11 11 11m-16 7 20 26m-4-26-22 26" stroke-width="1.2"/>
  <path d="m262 307-16 35m8-20 7 11m-12 0 7 10m40-36 16 35m-8-20-7 11m12 0-7 10" stroke-width="1.3"/>
  <path d="M267 262h24v5h-24zM253 298h52v7h-52z" fill="#8d7a61" stroke-width="1.5"/>
  <path d="M252 298h54m-37-39h20" stroke="#c6b395" stroke-width="1"/>
  <path d="M243 347q36-58 72 0" stroke-width="3"/>
  <path d="M224 365h20m70 0h20" stroke-width="4"/>
 </g>
 <g fill="#667f65"><ellipse cx="23" cy="375" rx="28" ry="10"/><ellipse cx="94" cy="379" rx="44" ry="11"/><ellipse cx="369" cy="379" rx="46" ry="11"/></g>
 <path d="m229 386-23 24m101-24 20 24" stroke="#cabb9f" stroke-width="1"/>
`;

const hangers = Array.from({length:21},(_,i)=>{
 const x=54+i*14;
 // Quadratic cable curve: tower tops at 113/287 and a low centre span.
 let y;
 if(x<113)y=305-83*((x-28)/85)**2;
 else if(x>287)y=305-83*((372-x)/85)**2;
 else y=222+68.5*(1-((x-200)/87)**2);
 return `<path d="M${x} ${y.toFixed(1)}V315"/>`;
}).join('');
export const goldenGateScene = `
 <path d="M0 299q55-39 103-24l44 21q50-30 97-16l56 14q49-29 100-21v137H0Z" fill="#c0c9bc"/>
 <path d="M0 309q80-10 155 2t245-5v104H0Z" fill="#a4bdc2"/>
 <path d="m0 285 42 9 30 19-19 36-53 17z" fill="#8f9f85"/>
 <path d="m400 279-44 13-25 25 22 26 47 21z" fill="#a2ad91"/>
 <path d="m0 336 44-5 16-16 13 2-15 29-58 27zm400-1-45-8-17-14-12 5 24 30 50 26z" fill="#bcad91"/>
 <g stroke="#ccdad7" stroke-width="1.4" stroke-linecap="round" opacity=".75">
  <path d="M79 357h37m36 15h44m34-18h40m29 21h35M22 389h51m154 6h52m39-39h20"/>
 </g>
 <!-- Concrete tower footings sit in the bay, and approaches terminate on land. -->
 <g fill="#c6bdad"><path d="M100 340h27v11h-27zm173 0h28v11h-28z"/></g>
 <g fill="#b7735b" stroke="#9c5e4d" stroke-width="1">
  <path d="M103 216h7v128h-7zm14 0h7v128h-7zM277 216h7v128h-7zm14 0h7v128h-7z"/>
  <path d="M103 226h21v5h-21zm0 29h21v5h-21zm0 29h21v5h-21zM277 226h21v5h-21zm0 29h21v5h-21zm0 29h21v5h-21z"/>
 </g>
 <g stroke="#b7735b" fill="none">
  <path d="M28 305Q72 305 113 222Q200 359 287 222Q330 305 372 305" stroke-width="2.6"/>
 </g>
 <g stroke="#bc8068" stroke-width="1" opacity=".95">${hangers}</g>
 <path d="M26 314h348v7H26Z" fill="#a76753"/>
 <path d="M26 313h348" stroke="#d5a48a" stroke-width="1.5"/>
 <path d="M27 322h346" stroke="#8e6453" stroke-width="1"/>
 <g fill="#a18d75"><path d="M24 319h8v11h-8zm342 0h8v13h-8z"/></g>
 <path d="M0 390q37-30 68-15l49 35H0Zm400-8q-37-20-66-8l-57 36h123Z" fill="#849a80"/>
 <g fill="#728b74"><path d="m9 388 12-34 12 34zm26 1 10-29 11 29zm330-3 12-33 12 33z"/></g>
`;
