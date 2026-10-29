// Chibi character builder: round faces with simple expressive features, peg bodies,
// thick outlines, soft shading, cast shadow. Origin = bottom centre of the body.
const CI='#2b2320', SKIN='#f7ddc2', SKINS='#e9c2a0';
let _cid=0;
const ARMS={down:{a:12,b:-8},out:{a:62,b:10},up:{a:150,b:10},wave:{a:120,b:-40},hip:{a:38,b:-110},chest:{a:16,b:-120},point:{a:88,b:0},forward:{a:40,b:-70},raise:{a:165,b:0},shrug:{a:40,b:80},chin:{a:20,b:-150},pray:{a:10,b:-128}};
function eyes(k,dx=0){return `<g class="eye">${eyes0(k,dx)}</g>`;}
function eyes0(k,dx=0){const L=-20+dx,R=20+dx,y=-150;
  if(k==='happy')return `<path d="M${L-8},${y+3} Q${L},${y-8} ${L+8},${y+3} M${R-8},${y+3} Q${R},${y-8} ${R+8},${y+3}" stroke="${CI}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
  if(k==='closed')return `<path d="M${L-8},${y} Q${L},${y+6} ${L+8},${y} M${R-8},${y} Q${R},${y+6} ${R+8},${y}" stroke="${CI}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  if(k==='wide')return `<ellipse cx="${L}" cy="${y}" rx="8" ry="10" fill="#fff" stroke="${CI}" stroke-width="3"/><ellipse cx="${R}" cy="${y}" rx="8" ry="10" fill="#fff" stroke="${CI}" stroke-width="3"/><circle cx="${L+1}" cy="${y+1}" r="3.6" fill="${CI}"/><circle cx="${R+1}" cy="${y+1}" r="3.6" fill="${CI}"/>`;
  if(k==='side')return `<ellipse cx="${L+5}" cy="${y}" rx="5" ry="7.5" fill="${CI}"/><ellipse cx="${R+5}" cy="${y}" rx="5" ry="7.5" fill="${CI}"/>`;
  return `<ellipse cx="${L}" cy="${y}" rx="5.2" ry="7.6" fill="${CI}"/><ellipse cx="${R}" cy="${y}" rx="5.2" ry="7.6" fill="${CI}"/><circle cx="${L+1.6}" cy="${y-3}" r="1.6" fill="#fff"/><circle cx="${R+1.6}" cy="${y-3}" r="1.6" fill="#fff"/>`;}
function brows(k,dx=0){const L=-20+dx,R=20+dx,y=-166;
  if(k==='worried')return `<path d="M${L-9},${y+2} L${L+7},${y-5} M${R-7},${y-5} L${R+9},${y+2}" stroke="${CI}" stroke-width="4" stroke-linecap="round"/>`;
  if(k==='angry'||k==='bold')return `<path d="M${L-9},${y-4} L${L+8},${y+3} M${R-8},${y+3} L${R+9},${y-4}" stroke="${CI}" stroke-width="4.5" stroke-linecap="round"/>`;
  if(k==='up')return `<path d="M${L-8},${y-6} Q${L},${y-12} ${L+8},${y-6} M${R-8},${y-6} Q${R},${y-12} ${R+8},${y-6}" stroke="${CI}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  if(k==='think')return `<path d="M${L-8},${y-2} Q${L},${y-6} ${L+8},${y-2} M${R-8},${y-8} Q${R},${y-12} ${R+8},${y-6}" stroke="${CI}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  return '';}
function mouth(k,dx=0){const x=dx,y=-120;
  if(k==='smile')return `<path d="M${x-10},${y-2} Q${x},${y+8} ${x+10},${y-2}" stroke="${CI}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  if(k==='grin')return `<path d="M${x-14},${y-5} Q${x},${y-3} ${x+14},${y-5} Q${x+12},${y+14} ${x},${y+14} Q${x-12},${y+14} ${x-14},${y-5}Z" fill="#8f2e2e" stroke="${CI}" stroke-width="3.5" stroke-linejoin="round"/><path d="M${x-11},${y-3} Q${x},${y-1} ${x+11},${y-3} L${x+10},${y+2} Q${x},${y+4} ${x-10},${y+2}Z" fill="#fff"/><path d="M${x-6},${y+10} Q${x},${y+6} ${x+6},${y+10}" fill="#e46b6b"/>`;
  if(k==='o')return `<ellipse cx="${x}" cy="${y+2}" rx="6" ry="7.5" fill="#8f2e2e" stroke="${CI}" stroke-width="3.5"/>`;
  if(k==='scream')return `<path d="M${x-14},${y-8} Q${x},${y-12} ${x+14},${y-8} Q${x+16},${y+18} ${x},${y+20} Q${x-16},${y+18} ${x-14},${y-8}Z" fill="#8f2e2e" stroke="${CI}" stroke-width="3.5" stroke-linejoin="round"/><path d="M${x-8},${y+16} Q${x},${y+8} ${x+8},${y+16}" fill="#e46b6b"/>`;
  if(k==='talk')return `<path d="M${x-10},${y-4} Q${x},${y-6} ${x+10},${y-4} Q${x+9},${y+12} ${x},${y+12} Q${x-9},${y+12} ${x-10},${y-4}Z" fill="#8f2e2e" stroke="${CI}" stroke-width="3.5" stroke-linejoin="round"/><path d="M${x-5},${y+9} Q${x},${y+4} ${x+5},${y+9}" fill="#e46b6b"/>`;
  if(k==='flat')return `<path d="M${x-8},${y} H${x+8}" stroke="${CI}" stroke-width="4" stroke-linecap="round"/>`;
  if(k==='wavy')return `<path d="M${x-12},${y+1} q4,-5 8,0 t8,0 t8,0" stroke="${CI}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  if(k==='shout')return `<path d="M${x-16},${y-8} Q${x},${y-10} ${x+16},${y-8} Q${x+14},${y+16} ${x},${y+16} Q${x-14},${y+16} ${x-16},${y-8}Z" fill="#8f2e2e" stroke="${CI}" stroke-width="3.5" stroke-linejoin="round"/><path d="M${x-12},${y-7} H${x+12} L${x+11},${y-2} H${x-11}Z" fill="#fff"/><path d="M${x-7},${y+12} Q${x},${y+5} ${x+7},${y+12}" fill="#e46b6b"/>`;
  return `<path d="M${x-7},${y} Q${x},${y+5} ${x+7},${y}" stroke="${CI}" stroke-width="4" fill="none" stroke-linecap="round"/>`;}
const HEAD='M-56,-150 C-57,-196 -34,-215 0,-215 C34,-215 57,-196 56,-150 C56,-110 38,-93 0,-93 C-38,-93 -56,-110 -56,-150Z';
function hairBack(k,c){
  if(k==='jesus')return `<path d="M-62,-160 C-66,-204 -30,-224 0,-224 C30,-224 66,-204 62,-160 C64,-124 64,-96 56,-70 L-56,-70 C-64,-96 -64,-124 -62,-160Z" fill="${c}" stroke="${CI}" stroke-width="4.5" stroke-linejoin="round"/>`;
  if(k==='veil')return `<path d="M-66,-150 C-70,-206 -32,-228 0,-228 C32,-228 70,-206 66,-150 C68,-110 70,-80 66,-56 L-66,-56 C-70,-80 -68,-110 -66,-150Z" fill="${c}" stroke="${CI}" stroke-width="4.5" stroke-linejoin="round"/>`;
  if(k==='girl')return `<path d="M52,-184 C80,-180 86,-150 76,-120 C72,-136 64,-150 50,-156Z" fill="${c}" stroke="${CI}" stroke-width="4.5" stroke-linejoin="round"/>`;
  if(k==='scarf')return `<path d="M-64,-150 C-68,-204 -32,-226 0,-226 C32,-226 68,-204 64,-150 C64,-120 62,-100 56,-84 L-56,-84 C-62,-100 -64,-120 -64,-150Z" fill="${c}" stroke="${CI}" stroke-width="4.5" stroke-linejoin="round"/>`;
  return '';}
function hairFront(k,c){const S=`stroke="${CI}" stroke-width="4.5" stroke-linejoin="round"`;
  if(k==='father')return `<path d="M-58,-148 C-63,-198 -34,-224 4,-222 C42,-222 62,-198 58,-160 C50,-180 36,-190 16,-191 C22,-185 24,-178 23,-171 C6,-186 -22,-188 -38,-176 C-48,-168 -54,-160 -58,-148Z" fill="${c}" ${S}/><path d="M-30,-206 C-12,-214 12,-214 30,-206" stroke="#6b6070" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  if(k==='jesus')return `<path d="M-57,-150 C-56,-200 -28,-218 0,-216 C28,-218 56,-200 57,-150 C50,-180 30,-196 2,-190 C-26,-196 -50,-180 -57,-150Z" fill="${c}" ${S}/><path d="M-50,-160 C-52,-130 -54,-104 -50,-80 M50,-160 C52,-130 54,-104 50,-80" stroke="${c}" stroke-width="10" fill="none"/>`;
  if(k==='paul')return `<path d="M-57,-142 C-62,-160 -58,-176 -50,-184 C-46,-168 -44,-156 -42,-140Z M57,-142 C62,-160 58,-176 50,-184 C46,-168 44,-156 42,-140Z" fill="${c}" ${S}/><path d="M-24,-200 C-12,-206 4,-206 14,-202" stroke="${SKINS}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  if(k==='peter')return `<path d="M-58,-150 C-70,-160 -64,-184 -50,-190 C-50,-206 -34,-218 -18,-214 C-8,-226 12,-226 20,-214 C36,-220 52,-206 50,-190 C64,-184 70,-160 58,-150 C50,-168 40,-180 22,-186 C6,-180 -8,-180 -24,-186 C-40,-180 -50,-168 -58,-150Z" fill="${c}" ${S}/>`;
  if(k==='teen')return `<path d="M-58,-150 C-64,-196 -40,-224 -4,-222 L6,-236 L16,-220 L30,-230 L34,-214 C54,-206 62,-184 58,-158 C48,-176 30,-186 10,-184 L4,-174 L-6,-186 C-26,-186 -46,-172 -58,-150Z" fill="${c}" ${S}/>`;
  if(k==='girl')return `<path d="M-58,-146 C-64,-198 -34,-222 2,-220 C38,-220 62,-196 58,-150 C50,-176 34,-190 10,-192 C-8,-176 -30,-170 -50,-170 C-54,-162 -56,-156 -58,-146Z" fill="${c}" ${S}/>`;
  if(k==='veil')return `<path d="M-58,-150 C-58,-200 -30,-218 0,-218 C30,-218 58,-200 58,-150 C52,-186 30,-202 0,-202 C-30,-202 -52,-186 -58,-150Z" fill="${c}" ${S}/><path d="M-58,-150 C-60,-196 -30,-214 0,-214" stroke="#fff" stroke-width="4" fill="none" opacity=".35"/>`;
  if(k==='scarf')return `<path d="M-58,-150 C-58,-200 -30,-218 0,-218 C30,-218 58,-200 58,-150 C52,-186 30,-200 0,-200 C-30,-200 -52,-186 -58,-150Z" fill="${c}" ${S}/>`;
  if(k==='monk')return `<path d="M-57,-150 C-60,-174 -54,-192 -44,-200 C-36,-188 -30,-182 -18,-178 C0,-176 18,-178 34,-186 C44,-194 50,-196 52,-198 C58,-186 60,-170 57,-150 C50,-166 40,-172 30,-172 C10,-168 -14,-168 -34,-172 C-44,-170 -52,-164 -57,-150Z" fill="${c}" ${S}/>`;
  return '';}
function beardSVG(k,c){if(!k)return '';const S=`stroke="${CI}" stroke-width="4.5" stroke-linejoin="round"`;
  if(k==='long')return `<path d="M-54,-140 C-54,-100 -30,-62 0,-56 C30,-62 54,-100 54,-140 C46,-118 30,-108 0,-106 C-30,-108 -46,-118 -54,-140Z" fill="${c}" ${S}/><path d="M-14,-96 C-12,-84 -6,-74 0,-68 M14,-96 C12,-84 6,-74 0,-68" stroke="${CI}" stroke-width="2" fill="none" opacity=".35"/>`;
  if(k==='curly')return `<path d="M-54,-140 C-58,-112 -48,-92 -30,-84 C-22,-74 -8,-72 0,-76 C8,-72 22,-74 30,-84 C48,-92 58,-112 54,-140 C46,-120 30,-108 0,-108 C-30,-108 -46,-120 -54,-140Z" fill="${c}" ${S}/>`;
  return `<path d="M-54,-140 C-52,-106 -28,-80 0,-78 C28,-80 52,-106 54,-140 C46,-120 30,-108 0,-108 C-30,-108 -46,-120 -54,-140Z" fill="${c}" ${S}/>`;}
function garment(o,id){const k=o.robe, c1=o.c1, c2=o.c2;const S=`stroke="${CI}" stroke-width="4.5" stroke-linejoin="round"`;
  const body='M-48,-104 C-50,-64 -54,-24 -56,-8 Q-56,4 -44,4 L44,4 Q56,4 56,-8 C54,-24 50,-64 48,-104Z';
  let s=`<clipPath id="${id}"><path d="${body}"/></clipPath><path d="${body}" fill="${c1}" ${S}/><g clip-path="url(#${id})">`;
  s+=`<path d="M20,-110 C26,-70 30,-30 30,10 L70,10 L70,-110Z" fill="#000" opacity=".16"/><path d="M-44,-100 C-46,-60 -48,-30 -50,0" stroke="#fff" stroke-width="10" opacity=".14" fill="none"/>`;
  if(k==='cassock'){for(let y=-90;y<0;y+=11)s+=`<circle cx="0" cy="${y}" r="2.6" fill="#8b8495"/>`;
    s+=`<path d="M-60,-46 H60 V-36 H-60Z" fill="#1f1c24"/><path d="M-30,-36 L-34,-6 L-26,-6 L-24,-36Z" fill="#1f1c24"/><path d="M-12,-60 C-14,-40 -16,-20 -18,0 M14,-56 C16,-30 18,-14 20,0" stroke="#17151b" stroke-width="2.5" fill="none"/>`;}
  if(k==='tunic'||k==='robe'||k==='dress'){s+=`<path d="M-14,-60 C-16,-40 -18,-20 -20,0 M12,-56 C14,-30 16,-14 18,0" stroke="#000" opacity=".18" stroke-width="2.5" fill="none"/>`;
    if(c2)s+=`<path d="M-52,-104 C-20,-92 26,-62 60,-26 L60,-4 C24,-44 -16,-70 -56,-78Z" fill="${c2}" ${S}/><path d="M-30,-90 C0,-74 28,-52 52,-24" stroke="#000" opacity=".2" stroke-width="3" fill="none"/>`;
    s+=`<path d="M-60,-42 Q0,-34 60,-42" stroke="${o.belt||'#c9a46a'}" stroke-width="7" fill="none"/><path d="M-60,-42 Q0,-34 60,-42" stroke="${CI}" stroke-width="1.5" fill="none" opacity=".5"/>`;}
  if(k==='hoodie'){s+=`<path d="M-60,-30 H60 V10 H-60Z" fill="${o.c3||'#5b7bb5'}"/><path d="M0,-30 V10" stroke="${CI}" stroke-width="2.5" opacity=".5"/><path d="M-60,-30 H60" stroke="${CI}" stroke-width="3.5"/><path d="M-24,-62 H24 L28,-38 H-28Z" fill="#000" opacity=".12" stroke="${CI}" stroke-width="2.5"/><path d="M-8,-100 V-74 M8,-100 V-74" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`;}
  if(k==='habit'){s+=`<path d="M-20,-104 L-18,10 L18,10 L20,-104Z" fill="#000" opacity=".12" stroke="${CI}" stroke-width="2.5"/><path d="M-60,-46 Q0,-38 60,-46" stroke="#f0e2c0" stroke-width="7" fill="none"/><path d="M-10,-42 L-14,-6 M-4,-42 L0,-10" stroke="#f0e2c0" stroke-width="5" stroke-linecap="round"/>`;}
  s+=`</g>`;
  if(k==='cassock')s+=`<path d="M-26,-102 Q0,-90 26,-102 L24,-92 Q0,-82 -24,-92Z" fill="#1f1c24" ${S}/><rect x="-7" y="-100" width="14" height="9" rx="2" fill="#fff" stroke="${CI}" stroke-width="2.5"/>`;
  if(k==='hoodie'||k==='habit')s+=`<path d="M-40,-104 C-46,-118 -30,-122 0,-118 C30,-122 46,-118 40,-104 Q0,-94 -40,-104Z" fill="${k==='habit'?c1:(o.c2||c1)}" ${S}/>`;
  return s;}
function armSVG(side,pose,c,hold=''){const P=typeof pose==='string'?ARMS[pose]:pose;const sg=side==='L'?1:-1;
  const a=sg*P.a, b=sg*P.b;
  return `<g class="arm${side}" data-b="${side==='L'?-40:40},-90" transform="translate(${side==='L'?-40:40},-90) rotate(${a})"><g class="fore${side}" data-b="0,30" transform="translate(0,30) rotate(${b})"><path d="M-10,-4 L-9,24 L9,24 L10,-4Z" fill="${c}" stroke="${CI}" stroke-width="4.5" stroke-linejoin="round"/>${hold}<circle cx="0" cy="30" r="11" fill="${SKIN}" stroke="${CI}" stroke-width="4.5"/></g><path d="M-11,0 A11,11 0 0 1 11,0 L10,32 L-10,32Z" fill="${c}" stroke="${CI}" stroke-width="4.5" stroke-linejoin="round"/></g>`;}
// o: robe,c1,c2,hair,hc,beard,bc,eyes,brows,mouth,look,armL,armR,holdL,holdR,front(extra svg on top),back(extra svg behind),halo,blush,tilt
function chibi(o){const id='cb'+(++_cid);const dx=o.look||0;
  const sleeve=o.sleeve||o.c1;
  const head=`<g class="head" data-c="0 -100" transform="rotate(${o.tilt||0} 0 -100)">${hairBack(o.hair,o.hc)}<path d="${HEAD}" fill="${SKIN}" stroke="${CI}" stroke-width="4.5"/><path d="M28,-206 C50,-190 56,-160 52,-130 C46,-108 30,-96 10,-94 C40,-112 46,-170 28,-206Z" fill="${SKINS}" opacity=".9"/>${o.hair==='paul'||o.hair==='monk'?`<ellipse cx="-14" cy="-196" rx="16" ry="7" fill="#fff" opacity=".45"/>`:''}${beardSVG(o.beard,o.bc||o.hc)}${o.blush!==false?`<ellipse cx="${-32+dx}" cy="-128" rx="9" ry="5" fill="#f19a9a" opacity=".45"/><ellipse cx="${32+dx}" cy="-128" rx="9" ry="5" fill="#f19a9a" opacity=".45"/>`:''}${(o.faces||[{eyes:o.eyes,brows:o.brows,mouth:o.mouth}]).map((f,i)=>{const L=f.look??dx;return `<g class="fc" style="display:${i?'none':'inline'}">${eyes(f.eyes,L)}${brows(f.brows,L)}${mouth(f.mouth,L)}</g><g class="fcT" style="display:none">${eyes(f.eyes,L)}${brows(f.brows,L)}${mouth(f.talk||'talk',L)}</g>`;}).join('')}${hairFront(o.hair,o.hc)}${o.hat||''}</g>`;
  const shadow=`<ellipse cx="18" cy="2" rx="70" ry="13" fill="rgba(50,30,15,.22)"/>`;
  const halo=o.halo?`<ellipse cx="0" cy="-222" rx="58" ry="14" fill="none" stroke="#f3c84b" stroke-width="7"/><ellipse cx="0" cy="-222" rx="58" ry="14" fill="none" stroke="${CI}" stroke-width="2" opacity=".4"/>`:'';
  return svg(300*(o.k||1),320*(o.k||1),'-150 -290 300 320',`<g transform="${o.dir===-1?'scale(-1,1)':''}">${shadow}${o.back||''}${halo}${garment(o,id)}${head}${armSVG('L',o.armL||'down',sleeve,o.holdL)}${armSVG('R',o.armR||'down',sleeve,o.holdR)}${o.front||''}</g>`);}
// props (drawn in hand space: hand centre is at 0,30)
const P_BIBLE=`<g transform="translate(-2,34) rotate(-8)"><rect x="-20" y="-26" width="40" height="52" rx="5" fill="#7a2e2a" stroke="${CI}" stroke-width="4"/><rect x="14" y="-24" width="5" height="48" fill="#f3ead6"/><path d="M-3,-14 V12 M-11,-5 H5" stroke="#f3c84b" stroke-width="4.5" stroke-linecap="round"/></g>`;
const P_SCROLL=`<g transform="translate(0,34) rotate(70)"><rect x="-30" y="-14" width="60" height="28" fill="#fbf1d9" stroke="${CI}" stroke-width="4"/><rect x="-36" y="-17" width="12" height="34" rx="6" fill="#e3c891" stroke="${CI}" stroke-width="4"/><rect x="24" y="-17" width="12" height="34" rx="6" fill="#e3c891" stroke="${CI}" stroke-width="4"/></g>`;
const P_PHONE=`<g transform="translate(0,26) rotate(-12)"><rect x="-11" y="-22" width="22" height="38" rx="4" fill="#2e2f3a" stroke="${CI}" stroke-width="3.5"/><rect x="-7" y="-17" width="14" height="27" rx="2" fill="#9fe0ff"/></g>`;
const P_STAFF=`<path d="M0,-90 V150" stroke="#8a5a32" stroke-width="9" stroke-linecap="round"/><path d="M0,-90 V150" stroke="${CI}" stroke-width="2" opacity=".5"/><path d="M0,-90 C0,-120 30,-124 32,-100" stroke="#8a5a32" stroke-width="9" fill="none" stroke-linecap="round"/>`;
const P_ROSARY=`<g transform="translate(0,40)">${[...Array(9)].map((_,i)=>`<circle cx="${Math.sin(i/8*Math.PI)*10}" cy="${i*5}" r="3" fill="#8a5a32"/>`).join('')}<path d="M0,44 V60 M-6,50 H6" stroke="#c99a2e" stroke-width="3.5" stroke-linecap="round"/></g>`;
function flameSVG(x,y,s=1){return `<g transform="translate(${x},${y}) scale(${s})"><path d="M0,-50 C16,-30 26,-14 22,4 C18,18 8,24 0,24 C-8,24 -18,18 -22,4 C-26,-12 -12,-22 -6,-36 C-4,-24 2,-20 6,-24 C8,-32 4,-42 0,-50Z" fill="#ff8a2a" stroke="${CI}" stroke-width="4" stroke-linejoin="round"/><path d="M0,-18 C8,-8 12,2 8,10 C4,16 -4,16 -8,10 C-10,2 -4,-8 0,-18Z" fill="#ffd84a"/></g>`;}
function sweat(x,y,s=1){return `<path transform="translate(${x},${y}) scale(${s})" d="M0,-14 C6,-4 9,2 9,6 A9,9 0 0 1 -9,6 C-9,2 -6,-4 0,-14Z" fill="#9fdcff" stroke="${CI}" stroke-width="3"/>`;}
function lines(x,y,s=1,rot=0){return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})" stroke="${CI}" stroke-width="4" stroke-linecap="round"><path d="M0,0 L14,-10 M4,14 L20,8 M0,28 L16,28"/></g>`;}
