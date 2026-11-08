// Destination studies matching the muted, layered Eiffel/Golden Gate scenes.
const bay='<path d="M0 324q95-9 190 1t210-4v89H0Z" fill="#a9c1c8"/><path d="M19 360h62m36 17h45m68-24h55m23 30h57" fill="none" stroke="#d1ded9" stroke-width="1.5" stroke-linecap="round"/>';
const city='<path d="M0 326v-22h24v-9h21v25h18v-35h25v36h23v-20h19v22h21v-41h25v40h21v-27h28v26h25v-19h32v20h19v-33h25v36h28v-18h22v20h26v-31h22v120H0Z" fill="#c7c7b8"/>';
export const tokyoScene = `
 ${city}
 <path d="M0 348q110-18 210-4t190-6v72H0Z" fill="#b1bba1"/>
 <path d="m250 369-49 41h152l-40-41" fill="#e0d1b9"/>
 <g fill="#859b7d"><ellipse cx="41" cy="347" rx="37" ry="24"/><ellipse cx="110" cy="352" rx="38" ry="23"/><ellipse cx="366" cy="345" rx="37" ry="27"/></g>
 <g stroke="#a15e4e" stroke-width="1.4" stroke-linejoin="round">
  <path d="M280 205v-25" fill="none" stroke-width="2"/>
  <path d="m280 205-7 40h14z" fill="#b97861"/>
  <path d="m277 220-4 25h14l-4-25z" fill="#f4ecda"/>
  <path d="m272 250-12 50-32 66h15l29-51h16l29 51h15l-32-66-12-50z" fill="#c18068"/>
  <path d="m267 273-7 27h40l-7-27zM248 326l-8 16h17l9-16zm46 0 9 16h17l-8-16z" fill="#f4ecda" stroke="none"/>
  <path d="m280 253-10 46h20zm-12 55-25 50h9l20-43m20-7 25 50h-9l-20-43" fill="#e5dcc6"/>
  <path d="m274 264 16 27m-4-27-16 27m-7 18-12 25 10 8m35-33 12 25-10 8" fill="none" stroke-width="1.2"/>
  <path d="M268 245h24v9h-24z" fill="#f2e9d6"/>
  <path d="M252 297h56v15h-56z" fill="#bc775e"/>
  <path d="M255 300h50v6h-50z" fill="#a9bcc0" stroke="none"/>
  <path d="M259 300v6m8-6v6m8-6v6m8-6v6m8-6v6m8-6v6" stroke="#e9dbc4"/>
  <path d="M250 311h60m-84 56h19m70 0h19" fill="none" stroke-width="3"/>
 </g>
 <path d="M0 375h400v35H0Z" fill="#a2b28f"/>
 <path d="m252 375-36 35h122l-30-35" fill="#e5d7c1"/>
`;

export const towerBridgeScene = `
 ${city}${bay}
 <path d="M0 321h73v12H0zm327 0h73v12h-73z" fill="#c0af93"/>
 <path d="M0 330h62v10H0zm338 0h62v10h-62z" fill="#a5957c"/>
 <g fill="#c2b398" stroke="#a7977e" stroke-width="1.4">
  <path d="M99 277h36v72H99zm166 0h36v72h-36z"/>
  <path d="M95 344h44v10H95zm166 0h44v10h-44z"/>
  <path d="M96 251h9v42h-9zm33 0h9v42h-9zm133 0h9v42h-9zm33 0h9v42h-9z"/>
 </g>
 <g fill="#788c90"><path d="m94 252 7-21 7 21zm33 0 7-21 7 21zm133 0 7-21 7 21zm33 0 7-21 7 21z"/><path d="m105 277 12-20 12 20zm166 0 12-20 12 20z"/></g>
 <g fill="#7e8580"><path d="M110 288h14v16h-14zm166 0h14v16h-14zM109 326v-9q8-13 16 0v9zm166 0v-9q8-13 16 0v9z"/></g>
 <path d="M135 282h130v8H135Z" fill="#b4a88f"/>
 <path d="M137 285h126" stroke="#718e9b" stroke-width="2"/>
 <g fill="none" stroke="#7599a6" stroke-width="3"><path d="M0 317q51 0 99-42m202 0q46 42 99 42M0 322h400"/></g>
 <g stroke="#91a9b0" stroke-width="1"><path d="M22 315v7m18-12v12m18-20v20m18-30v30m248-30v30m18-20v20m18-12v12m18-7v7"/></g>
 <path d="M0 326h400" stroke="#a99b83" stroke-width="4"/>
 <path d="m142 327 54-2 6 2 6-2 51 2" stroke="#7599a6" stroke-width="3" fill="none"/>
 <path d="M0 392q60-13 105 18H0Zm400-8q-54-2-90 26h90Z" fill="#a8b398"/>
`;

export const libertyScene = `
 ${city}${bay}
 <path d="m134 363 30-9 30-16 49 2 39 13 27 16-39 16-92-3z" fill="#c2b99f"/>
 <path d="m151 361 47-14 43 4 42 14-28 11-75-3z" fill="#91a382"/>
 <path d="m198 353-12-7 14-9-2-9 21 1 14-11 13 13 22 1-8 11 10 10-28 8z" fill="#a99d84"/>
 <g fill="#c9b99b" stroke="#a7997f" stroke-width="1.3"><path d="M211 302h34v38h-34z"/><path d="M206 335h44v8h-44zm3-38h38v9h-38z"/><path d="m216 279 24 0 5 18h-34z"/></g>
 <g fill="#86a59a" stroke="#6f8f84" stroke-width="1.2" stroke-linejoin="round">
  <path d="m219 237-5 22-8 26 38 0-8-31-3-18z"/>
  <path d="m219 241-14-15-8-37-7 2 3 41 21 21z"/>
  <path d="m231 244 17 11-1 19-10-4-9-18z"/>
  <path d="m240 250 10 1 2 19-11 1z" fill="#9cb5a6"/>
  <ellipse cx="226" cy="228" rx="7" ry="10"/>
  <path d="m217 224-9-9 13 3-1-13 7 11 7-13-1 15 13-4-10 11z"/>
  <path d="M188 187h12v6h-12zm3-9h6v9h-6z"/>
 </g>
 <path d="m194 178-5-5 5-12 4 7-1 7z" fill="#c9a36c"/>
 <g stroke="#6f8f84" fill="none" stroke-width="1.2"><path d="m219 251-5 29m12-34-3 35m9-24 5 25m-42-88 3 28"/></g>
 <path d="M214 310h4v15h-4m9-15h4v15h-4m9-15h4v15h-4" fill="#9e957e"/>
 <path d="m35 384 16-4 14 4-8 5H42Z" fill="#f2ecdb"/>
`;

export const sydneyScene = `
 <path d="M0 318q45-20 94-5t98 1 119-7 89 11v92H0Z" fill="#bec7b5"/>${bay}
 <path d="m53 344 45-9 175-4 69 17-22 14-237 2z" fill="#b6a78b"/>
 <path d="M83 347h238v11H83Z" fill="#d1bea0"/>
 <path d="m98 344 22-24 165-1 29 25z" fill="#8b9d9f"/>
 <g fill="#f7efdb" stroke="#c3b9a3" stroke-width="1.3" stroke-linejoin="round">
  <path d="M99 340q-1-47-28-73 65 6 93 73z"/>
  <path d="M133 340q15-67 58-102 22 53 15 102z"/>
  <path d="M187 340q29-70 87-89-5 53-42 89z"/>
  <path d="M231 340q24-47 73-60-1 41-28 60z"/>
  <path d="M274 341q19-25 54-28l-21 28z"/>
 </g>
 <g fill="#ded4bb"><path d="M71 267q44 29 62 73h31q-28-67-93-73z"/><path d="M191 238q-4 60-25 102h40q7-49-15-102z"/><path d="M274 251q-26 52-66 89h24q37-36 42-89z"/><path d="M304 280q-19 35-54 60h26q27-19 28-60z"/></g>
 <path d="M84 345h236" stroke="#efe3cb" stroke-width="4"/>
 <path d="m323 374 13-20 13 20z" fill="#fff8e8"/><path d="M336 354v23m-19 1h38l-7 5h-22z" fill="#8b9a93" stroke="#8b9a93" stroke-width="1"/>
 <path d="M0 394q35-12 73 16H0Z" fill="#91a485"/>
`;

function arch(x,y,w,h){return `<path d="M${x} ${y+h}v-${h-w/2}a${w/2} ${w/2} 0 0 1 ${w} 0v${h-w/2}z"/>`;}
const arches=[{y:283,h:15},{y:307,h:17},{y:332,h:19}].map(({y,h})=>Array.from({length:11},(_,i)=>arch(89+i*21,y,12,h)).join('')).join('');
export const romeScene = `
 <path d="M0 328q100-26 200-3t200-5v90H0Z" fill="#c4c8ae"/>
 <g fill="#a3b394"><path d="M0 320h48v35H0zm331-4h69v37h-69z"/></g>
 <path d="M0 357q180-11 400 1v52H0Z" fill="#dfd0b5"/>
 <ellipse cx="202" cy="365" rx="139" ry="13" fill="#c4b597" opacity=".5"/>
 <path d="M78 353V285q35-31 100-27l23 13 22-2 8 9 34-7 47 14v68q-115 30-234 0z" fill="#cdb38e" stroke="#ad9270" stroke-width="1.5"/>
 <path d="M78 285q33-20 100-19l23 13 22-2 8 9 34-7 47 14v-8l-47-14-34 7-8-9-22 2-23-13q-65-4-100 27z" fill="#e3ceb0"/>
 <g fill="#8f8068">${arches}</g>
 <g fill="none" stroke="#e9d5b5" stroke-width="3"><path d="M80 301q115 19 230 0M80 326q115 20 230 0M80 352q115 26 230 0"/></g>
 <g stroke="#e0c7a2" stroke-width="3">${Array.from({length:12},(_,i)=>`<path d="M${84+i*21} 282v72"/>`).join('')}</g>
 <path d="M78 285v68q22 8 43 11V273q-24 4-43 12z" fill="#b99d79" opacity=".3"/>
 <path d="M312 286v67q-20 7-38 10v-84z" fill="#a88e6c" opacity=".2"/>
 <g fill="#879b7d"><path d="M29 355v-39h5v39z"/><ellipse cx="31" cy="315" rx="24" ry="9"/><path d="M365 355v-49h5v49z"/><ellipse cx="367" cy="305" rx="27" ry="10"/></g>
 <path d="m167 380-14 30m68-29 3 29m45-31 20 31" stroke="#cabb9f" stroke-width="1"/>
`;
