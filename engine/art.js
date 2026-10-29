// Art library: painterly single-hue backgrounds, faceless mask-head characters, props.
// Everything is generated SVG so it stays crisp at 1080p.
const INK='#25212b';
let _uid=0; const uid=p=>(p||'u')+(++_uid);
function rng(seed){let s=seed|0;return()=>{s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const hsl=(h,s,l,a=1)=>`hsla(${h},${s}%,${l}%,${a})`;
const svg=(w,h,vb,body,extra='')=>`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${vb}" ${extra} style="overflow:visible">${body}</svg>`;
// shared hand-drawn wobble filter (applied to outlined art)
const ROUGH=`<filter id="rough" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="3.2"/></filter>`;
document.write(`<svg width="0" height="0" style="position:absolute">${ROUGH}</svg>`);

// smooth path through points (quadratic midpoints)
function smooth(pts){let d=`M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for(let i=1;i<pts.length-1;i++){const m=[(pts[i][0]+pts[i+1][0])/2,(pts[i][1]+pts[i+1][1])/2];d+=` Q${pts[i][0].toFixed(1)},${pts[i][1].toFixed(1)} ${m[0].toFixed(1)},${m[1].toFixed(1)}`;}
  const l=pts[pts.length-1];return d+` L${l[0].toFixed(1)},${l[1].toFixed(1)}`;}
function wave(seed,amp,base){const r=rng(seed);const F=[0,1,2].map(i=>[(0.002+r()*0.004)*(i+1),r()*6.28,amp/(i+1.3)]);
  return x=>base+F.reduce((s,[f,p,a])=>s+Math.sin(x*f+p)*a,0);}

// ---------- BACKGROUND LANDSCAPE ----------
// returns an array of layer elements (with parallax depth) for a scene
function land(o){
  const hs=o.h, S=o.s??45, W=o.w??1800, H=o.hgt??1000, cx=o.cx??640, r=rng(o.seed||1);
  const x0=cx-W/2, y0=360-H/2, X1=x0+W;
  const h=(hs>=180&&hs<=245)?(o.hh??150):hs;
  const L=[]; const lay=(body,depth,z,blur)=>L.push({html:svg(W,H,`${x0} ${y0} ${W} ${H}`,body),x:cx,y:360,depth,z,filter:blur?`blur(${blur}px)`:undefined});
  // sky
  const g=uid('sk');
  let sky=`<defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${o.sky1||hsl(hs+8,S+5,70)}"/><stop offset=".75" stop-color="${o.sky2||hsl(hs,S+10,88)}"/></linearGradient>
   <radialGradient id="${g}s" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
   <rect x="${x0}" y="${y0}" width="${W}" height="${H}" fill="url(#${g})"/>`;
  if(o.sun) sky+=`<circle cx="${o.sun[0]}" cy="${o.sun[1]}" r="420" fill="url(#${g}s)" opacity=".75"/>`;
  if(o.rays){const [sx,sy]=o.sun||[640,-60];for(let i=0;i<9;i++){const a=-0.3+i*0.42+r()*0.1,b=a+0.12+r()*0.08;sky+=`<path d="M${sx},${sy} L${sx+Math.sin(a)*2200},${sy+Math.cos(a)*2200} L${sx+Math.sin(b)*2200},${sy+Math.cos(b)*2200}Z" fill="#fff" opacity=".13"/>`;}}
  for(let i=0;i<(o.clouds??7);i++){const x=x0+r()*W,y=y0+60+r()*(o.cloudBand??260);sky+=`<g filter="url(#bl6)">${cloud(x,y,90+r()*120,'#fff',.5+r()*.3)}</g>`;}
  lay(sky,0.15,0,0);
  // far mountains
  if(o.mountains!==false){let pts=[];for(let x=x0;x<=X1+40;x+=40+r()*50){pts.push([x,(o.mY??330)-r()*130*(o.mAmp??1)]);}
    const d=`M${x0},${y0+H} `+pts.map(p=>`L${p[0].toFixed(0)},${p[1].toFixed(0)}`).join(' ')+` L${X1},${y0+H}Z`;
    lay(`<path d="${d}" fill="${hsl(h,S-12,72)}" stroke="${hsl(h,S-15,60)}" stroke-width="3" stroke-linejoin="round"/>`,0.3,1,2.6);}
  // far hills (+city)
  const f1=wave(o.seed*3+1,30,o.hy1??420);
  let far=hillLayer(f1,x0,X1,y0+H,hsl(h,S-5,66),hsl(h,S,50),r,h,S,62,2.5);
  if(o.city) far+=city(o.city,f1,x0,X1,h,S,r);
  if(o.church) far+=church(o.church[0],f1(o.church[0])+12,o.church[1]||1,h,S);
  lay(far,0.5,2,1.4);
  // mid hills
  const f2=wave(o.seed*5+2,38,o.hy2??500);
  let mid=hillLayer(f2,x0,X1,y0+H,hsl(h,S,57),hsl(h,S+5,38),r,h,S,52,3);
  if(o.trees) for(let i=0;i<o.trees;i++){const x=x0+r()*W;if(o.clearX&&Math.abs(x-o.clearX[0])<o.clearX[1])continue;mid+=tree(x,f2(x)+14,0.55+r()*0.4,h,S,r,o.cypress);}
  lay(mid,0.75,3,0.6);
  // near ground
  const f3=o.flat?(x=>o.gy??600):wave(o.seed*7+3,14,o.gy??600);
  let near=hillLayer(f3,x0,X1,y0+H,hsl(h,S+2,48),hsl(h,S+8,30),r,h,S,44,3.5);
  if(o.bushes) for(let i=0;i<o.bushes;i++){const side=i%2?1:-1;const x=cx+side*(560+r()*360);near+=bush(x,f3(x)+6,0.8+r()*0.7,h,S,r);}
  lay(near,1,4,0);
  return L;
}
function hillLayer(f,x0,X1,bot,fill,line,r,h,S,l,sw){
  const pts=[];for(let x=x0-20;x<=X1+20;x+=24)pts.push([x,f(x)]);
  const id=uid('hc');
  let d=smooth(pts)+` L${X1+20},${bot+20} L${x0-20},${bot+20}Z`;
  let s=`<defs><clipPath id="${id}"><path d="${d}"/></clipPath></defs><path d="${d}" fill="${fill}"/>`;
  // painted variation blobs
  s+=`<g clip-path="url(#${id})">`;
  for(let i=0;i<10;i++){const x=x0+r()*(X1-x0),y=f(x)+20+r()*120;s+=`<ellipse cx="${x}" cy="${y}" rx="${120+r()*200}" ry="${30+r()*50}" fill="${hsl(h,S,l+(r()<.5?8:-7),.5)}" filter="url(#bl12)"/>`;}
  // grass strokes
  for(let i=0;i<70;i++){const x=x0+r()*(X1-x0),y=f(x)+8+r()*150,w=14+r()*26,c=r()<.5?hsl(h,S,l+12,.55):hsl(h,S+5,l-12,.5);
    s+=`<path d="M${x},${y} q${w/2},${-4-r()*5} ${w},${-1}" stroke="${c}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;}
  s+=`</g><path d="${smooth(pts)}" fill="none" stroke="${line}" stroke-width="${sw}" stroke-linecap="round"/>`;
  return s;
}
document.write(`<svg width="0" height="0" style="position:absolute"><filter id="bl12" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14"/></filter><filter id="bl6" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter></svg>`);
function cloud(x,y,w,fill,op,line){let s='';const n=5;const cs=[];for(let i=0;i<n;i++){const t=i/(n-1);cs.push([x-w/2+t*w,y-Math.sin(t*Math.PI)*w*0.28,w*(0.22+Math.sin(t*Math.PI)*0.16)]);}
  if(line)s+=cs.map(c=>`<circle cx="${c[0]}" cy="${c[1]}" r="${c[2]+line[1]}" fill="${line[0]}"/>`).join('');
  s+=cs.map(c=>`<circle cx="${c[0]}" cy="${c[1]}" r="${c[2]}" fill="${fill}"/>`).join('')+`<rect x="${x-w/2}" y="${y-2}" width="${w}" height="${w*0.18}" rx="${w*0.09}" fill="${fill}"/>`;
  return `<g opacity="${op}">${s}</g>`;}
function tree(x,y,sc,h,S,r,cyp){
  if(cyp&&r()<.55){const H=150*sc,W=30*sc;return `<path d="M${x},${y-H} C${x+W},${y-H*0.6} ${x+W*0.9},${y-10} ${x},${y} C${x-W*0.9},${y-10} ${x-W},${y-H*0.6} ${x},${y-H}Z" fill="${hsl(h,S,40)}" stroke="${hsl(h,S+5,26)}" stroke-width="3"/><path d="M${x-4},${y-H*0.8} C${x-W*0.6},${y-H*0.5} ${x-W*0.5},${y-30} ${x-6},${y-8}" stroke="${hsl(h,S,52)}" stroke-width="5" fill="none" opacity=".6"/>`;}
  const R=46*sc;let s=`<rect x="${x-5*sc}" y="${y-R*1.6}" width="${10*sc}" height="${R*1.6}" fill="${hsl(h,S-10,32)}" stroke="${hsl(h,S,22)}" stroke-width="2.5"/>`;
  const cs=[[0,-R*2.1,R],[-R*.7,-R*1.6,R*.75],[R*.7,-R*1.6,R*.75],[0,-R*1.4,R*.7]];
  s+=cs.map(c=>`<circle cx="${x+c[0]}" cy="${y+c[1]}" r="${c[2]+3}" fill="${hsl(h,S+5,26)}"/>`).join('')+cs.map(c=>`<circle cx="${x+c[0]}" cy="${y+c[1]}" r="${c[2]}" fill="${hsl(h,S,44)}"/>`).join('')+`<circle cx="${x-R*.3}" cy="${y-R*2.3}" r="${R*.45}" fill="${hsl(h,S,54)}" opacity=".7"/>`;
  return s;}
function bush(x,y,sc,h,S,r){const R=40*sc;const cs=[[-R,0,R*.8],[0,-R*.5,R],[R,0,R*.8],[R*.4,R*.3,R*.7],[-R*.5,R*.3,R*.7]];
  return cs.map(c=>`<circle cx="${x+c[0]}" cy="${y+c[1]}" r="${c[2]+3.5}" fill="${hsl(h,S+8,22)}"/>`).join('')+cs.map(c=>`<circle cx="${x+c[0]}" cy="${y+c[1]}" r="${c[2]}" fill="${hsl(h,S+4,36)}"/>`).join('')+`<circle cx="${x-R*.2}" cy="${y-R*.8}" r="${R*.4}" fill="${hsl(h,S,46)}" opacity=".8"/>`;}
function city(kind,f,x0,X1,h,S,r){let s='';const xs=[];const cx0=kind.x0,cx1=kind.x1;
  for(let x=cx0;x<cx1;x+=22+r()*20)xs.push(x);
  const wall=hsl(h,S-18,84),side=hsl(h,S-12,70),line=hsl(h,S,36),dark=hsl(h,S,34);
  xs.sort(()=>r()-.5).forEach(x=>{const w=34+r()*30,hh=26+r()*34,y=f(x)+10-r()*16;
    if(kind.type==='modern'){s+=`<rect x="${x}" y="${y-hh}" width="${w}" height="${hh}" fill="${wall}" stroke="${line}" stroke-width="2"/><rect x="${x+w*.6}" y="${y-hh}" width="${w*.4}" height="${hh}" fill="${side}"/><path d="M${x-4},${y-hh} L${x+w/2},${y-hh-18} L${x+w+4},${y-hh}Z" fill="${side}" stroke="${line}" stroke-width="2"/><rect x="${x+6}" y="${y-hh+8}" width="7" height="8" fill="${dark}"/>`;}
    else{s+=`<rect x="${x}" y="${y-hh}" width="${w}" height="${hh}" fill="${wall}" stroke="${line}" stroke-width="2"/><rect x="${x+w*.62}" y="${y-hh}" width="${w*.38}" height="${hh}" fill="${side}"/><rect x="${x-3}" y="${y-hh-4}" width="${w+6}" height="5" fill="${wall}" stroke="${line}" stroke-width="2"/><rect x="${x+6}" y="${y-hh+9}" width="6" height="9" fill="${dark}"/>${r()<.3?`<path d="M${x+6},${y-hh-4} A${w/2-6},${w/2-6} 0 0 1 ${x+w-6},${y-hh-4}Z" fill="${wall}" stroke="${line}" stroke-width="2"/>`:''}`;}});
  if(kind.temple){const x=kind.temple,y=f(x)+6,w=150,hh=70;s+=`<rect x="${x-w/2}" y="${y-12}" width="${w}" height="12" fill="${wall}" stroke="${line}" stroke-width="2"/>`;for(let i=0;i<7;i++)s+=`<rect x="${x-w/2+8+i*21}" y="${y-hh}" width="9" height="${hh-12}" fill="${wall}" stroke="${line}" stroke-width="2"/>`;s+=`<rect x="${x-w/2-4}" y="${y-hh-10}" width="${w+8}" height="10" fill="${wall}" stroke="${line}" stroke-width="2"/><path d="M${x-w/2-4},${y-hh-10} L${x},${y-hh-44} L${x+w/2+4},${y-hh-10}Z" fill="${wall}" stroke="${line}" stroke-width="2"/>`;}
  return s;}
function church(x,y,sc,h,S){const wall=hsl(h,S-18,86),side=hsl(h,S-10,72),line=hsl(h,S,32),dark=hsl(h,S,36);const k=sc;
  return `<g transform="translate(${x},${y}) scale(${k})"><rect x="-70" y="-90" width="140" height="90" fill="${wall}" stroke="${line}" stroke-width="3"/><rect x="30" y="-90" width="40" height="90" fill="${side}"/><path d="M-80,-88 L0,-140 L80,-88Z" fill="${side}" stroke="${line}" stroke-width="3"/><rect x="-22" y="-220" width="44" height="130" fill="${wall}" stroke="${line}" stroke-width="3"/><path d="M-28,-218 L0,-262 L28,-218Z" fill="${side}" stroke="${line}" stroke-width="3"/><path d="M0,-262 V-296 M-11,-284 H11" stroke="${line}" stroke-width="5" stroke-linecap="round"/><path d="M-12,0 V-34 A12,12 0 0 1 12,-34 V0Z" fill="${dark}"/><path d="M-8,-170 V-186 A8,8 0 0 1 8,-186 V-170Z" fill="${dark}"/><path d="M-50,-40 V-58 A8,8 0 0 1 -34,-58 V-40Z M34,-40 V-58 A8,8 0 0 1 50,-58 V-40Z" fill="${dark}"/></g>`;}

// church interior (pink): arches, columns, windows with light
function interior(h,S,W=2600,cx=1000){const x0=cx-W/2,y0=-140,H=1000,r=rng(11);const L=[];
  const g=uid('ig');
  let back=`<defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${hsl(h,S,74)}"/><stop offset="1" stop-color="${hsl(h,S,84)}"/></linearGradient></defs><rect x="${x0}" y="${y0}" width="${W}" height="${H}" fill="url(#${g})"/>`;
  for(let x=x0+60;x<x0+W;x+=300){back+=`<path d="M${x},560 V170 A90,90 0 0 1 ${x+180},170 V560Z" fill="${hsl(h,S-5,66)}" stroke="${hsl(h,S,50)}" stroke-width="3"/><path d="M${x+50},360 V200 A40,40 0 0 1 ${x+130},200 V360Z" fill="${hsl(h+15,S+20,92)}" stroke="${hsl(h,S,50)}" stroke-width="3"/><path d="M${x+90},160 V360 M${x+50},260 H${x+130}" stroke="${hsl(h,S,58)}" stroke-width="3"/><path d="M${x+60},360 L${x+10},640 L${x+190},640 L${x+120},360Z" fill="#fff" opacity=".14"/>`;}
  L.push({html:svg(W,H,`${x0} ${y0} ${W} ${H}`,back),x:cx,y:360,depth:0.55,z:0,filter:'blur(2px)'});
  let mid='';for(let x=x0+210;x<x0+W;x+=300){mid+=`<rect x="${x-26}" y="-140" width="52" height="740" fill="${hsl(h,S-8,80)}" stroke="${hsl(h,S,44)}" stroke-width="3"/><rect x="${x+8}" y="-140" width="18" height="740" fill="${hsl(h,S-5,70)}"/><rect x="${x-36}" y="560" width="72" height="30" fill="${hsl(h,S-8,80)}" stroke="${hsl(h,S,44)}" stroke-width="3"/>`;}
  mid+=`<rect x="${x0}" y="590" width="${W}" height="300" fill="${hsl(h,S-5,60)}" stroke="${hsl(h,S,42)}" stroke-width="3"/>`;
  for(let x=x0;x<x0+W;x+=90)mid+=`<path d="M${x},590 L${x-60},860" stroke="${hsl(h,S,52)}" stroke-width="2.5"/>`;
  L.push({html:svg(W,H,`${x0} ${y0} ${W} ${H}`,mid),x:cx,y:360,depth:0.85,z:1,filter:'blur(.6px)'});
  return L;}

// ---------- CHARACTERS ----------
const WH='#f7f5f8', SH='#cdc6d2', FO='#a79eb0';
const GAR={
  cassock:{f:'#353140',s:'#211e28',hi:'#4d4859',fo:'#16141b',hand:WH},
  white:{f:WH,s:SH,hi:'#fff',fo:FO,hand:WH},
  habit:{f:'#e4dccf',s:'#bfb3a2',hi:'#f0eadf',fo:'#9a8d7b',hand:WH},
  hoodie:{f:'#eef0f6',s:'#c3c8d6',hi:'#fff',fo:'#9aa1b4',hand:WH},
};
function headSVG(o){const g=GAR.white;let s='';const HC=o.hc||'#9c7f62',HS=o.hs||'#6f5642';
  // hair behind
  if(o.hair==='veil'||o.hair==='hood')s+=`<path d="M-34,-60 C-30,-88 20,-94 40,-62 C50,-40 46,-10 40,10 L50,40 L-58,40 C-52,10 -46,-30 -34,-60Z" fill="${o.hair==='hood'?GAR.habit.f:WH}" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/><path d="M-40,30 C-44,0 -40,-40 -26,-62" stroke="${o.hair==='hood'?GAR.habit.s:SH}" stroke-width="10" fill="none" opacity=".8"/>`;
  if(o.hair==='pony')s+=`<path d="M-26,-60 C-50,-60 -56,-30 -50,-6 C-44,-24 -36,-40 -24,-46Z" fill="${WH}" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/>`;
  // mask head
  s+=`<path d="M-26,-12 C-38,-34 -34,-70 -4,-78 C20,-84 40,-66 39,-46 C38,-30 30,-14 18,-2 C10,5 0,6 -8,3 C-16,0 -22,-5 -26,-12Z" fill="${WH}" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/>`;
  s+=`<path d="M-26,-12 C-38,-34 -34,-70 -4,-78 C-20,-60 -22,-30 -10,1 C-16,0 -22,-5 -26,-12Z" fill="${SH}"/>`;
  s+=`<path d="M10,-79 C26,-62 30,-30 17,-1" stroke="${FO}" stroke-width="2.6" fill="none" opacity=".7"/>`;
  if(o.hair==='short2')s+=`<path d="M-29,-22 C-40,-46 -32,-76 -4,-82 C18,-88 38,-76 40,-58 C24,-66 8,-66 -4,-60 C-14,-54 -20,-40 -29,-22Z" fill="${HC}" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/><path d="M-16,-70 C-4,-78 10,-80 22,-76" stroke="${HS}" stroke-width="3" fill="none"/>`;
  if(o.hair==='short')s+=`<path d="M-29,-22 C-40,-46 -32,-76 -4,-82 C18,-88 38,-76 40,-58 C30,-66 16,-68 4,-64 C10,-60 12,-56 12,-52 C0,-58 -12,-54 -18,-44 C-22,-36 -24,-30 -29,-22Z" fill="#4b4654" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/><path d="M-18,-70 C-6,-78 10,-80 24,-76" stroke="#7b7487" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  if(o.hair==='bald')s+=`<path d="M-26,-10 C-38,-26 -38,-46 -31,-56 C-22,-42 -18,-26 -10,-12Z" fill="${HC}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
  if(o.hair==='long')s+=`<path d="M32,-72 C14,-86 -18,-84 -32,-66 C-44,-50 -44,-20 -38,0 C-34,16 -36,30 -42,40 L-14,40 C-18,20 -22,2 -25,-12 C-29,-34 -24,-54 -8,-62 C8,-68 26,-66 38,-56 C37,-62 35,-68 32,-72Z" fill="${HC}" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/><path d="M-34,-40 C-36,-20 -32,4 -30,30 M-20,-66 C2,-74 18,-72 30,-66" stroke="${HS}" stroke-width="2.6" fill="none"/>`;
  if(o.hair==='cap')s+=`<path d="M-30,-44 C-34,-70 -10,-84 12,-80 C30,-76 38,-62 36,-48 C10,-52 -10,-50 -30,-44Z" fill="#e2e6f0" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/><path d="M30,-52 C44,-52 56,-48 60,-42 C48,-40 36,-42 28,-44Z" fill="#e2e6f0" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
  if(o.hair==='pony')s+=`<path d="M-27,-16 C-42,-38 -36,-72 -6,-80 C16,-86 34,-74 37,-56 C20,-64 4,-62 -6,-54 C-14,-44 -16,-30 -27,-16Z" fill="${WH}" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/>`;
  if(o.hair==='veil')s+=`<path d="M-30,-58 C-24,-84 22,-90 38,-60 C24,-72 -6,-72 -30,-58Z" fill="${WH}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
  if(o.beard)s+=`<path d="M-25,-16 C-18,-2 -6,4 8,3 C22,2 32,-12 37,-30 C42,-10 36,14 20,28 C10,36 -6,36 -15,26 C-23,16 -27,0 -25,-16Z" fill="${HC}" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/><path d="M-12,12 C-6,22 4,26 14,22 M22,8 C26,2 30,-6 32,-14" stroke="${HS}" stroke-width="2.4" fill="none"/>`;
  return s;}
function armSVG(side,g){const cls=side==='L'?'L':'R';
  return `<g class="arm${cls}" transform="translate(${side==='L'?-42:42},-222)"><g class="fore${cls}" transform="translate(0,74)"><path d="M-12,-4 L-11,62 Q0,70 11,62 L12,-4Z" fill="${g.f}" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/><path d="M${side==='L'?-11:4},0 L${side==='L'?-4:11},0 L${side==='L'?-4:10},62 L${side==='L'?-10:4},64Z" fill="${g.s}" opacity=".7"/><ellipse cx="0" cy="74" rx="11" ry="13" fill="${g.hand}" stroke="${INK}" stroke-width="4.5"/></g><path d="M-13,0 A13,13 0 0 1 13,0 C14,30 13,58 11,80 Q0,86 -11,80 C-13,58 -14,30 -13,0Z" fill="${g.f}" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/><path d="M${side==='L'?-13:5},-4 C${side==='L'?-15:6},30 ${side==='L'?-13:6},60 ${side==='L'?-11:5},80 L${side==='L'?-5:12},80 C${side==='L'?-6:14},58 ${side==='L'?-7:14},28 ${side==='L'?-6:13},-6Z" fill="${g.s}" opacity=".7"/></g>`;}
function bodySVG(o){let s='';const k=o.robe;
  const shadow=`<ellipse cx="0" cy="2" rx="78" ry="11" fill="rgba(30,20,40,.22)"/>`;
  s+=shadow;
  if(k==='cassock'){const g=GAR.cassock;
    s+=`<ellipse cx="-24" cy="-4" rx="20" ry="9" fill="#24212a" stroke="${INK}" stroke-width="4"/><ellipse cx="24" cy="-4" rx="20" ry="9" fill="#24212a" stroke="${INK}" stroke-width="4"/>`;
    const d='M-46,-222 C-44,-240 -24,-250 0,-250 C24,-250 44,-240 46,-222 C52,-170 58,-100 66,-8 Q0,4 -66,-8 C-58,-100 -52,-170 -46,-222Z';
    s+=`<path d="${d}" fill="${g.f}" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/>`;
    s+=`<path d="M18,-240 C26,-180 30,-90 32,-4 Q52,-4 66,-8 C58,-100 52,-190 46,-236Z" fill="${g.s}"/>`;
    s+=`<path d="M-38,-226 C-44,-170 -48,-90 -54,-12" stroke="${g.hi}" stroke-width="9" fill="none" opacity=".8" stroke-linecap="round"/>`;
    s+=`<path d="M-18,-130 C-22,-90 -26,-50 -30,-8 M12,-120 C14,-80 12,-40 14,-6 M40,-100 C44,-60 48,-30 52,-8" stroke="${g.fo}" stroke-width="3" fill="none"/>`;
    for(let y=-232;y<-20;y+=15)s+=`<circle cx="4" cy="${y}" r="2.3" fill="#8d879a"/>`;
    s+=`<path d="M-48,-152 Q0,-146 48,-152 L49,-140 Q0,-134 -49,-140Z" fill="#2a2632" stroke="${INK}" stroke-width="3"/>`;
    s+=`<path d="M-18,-246 Q0,-252 20,-246 L18,-236 Q0,-240 -18,-236Z" fill="#2a2632" stroke="${INK}" stroke-width="3"/><rect x="2" y="-247" width="12" height="9" rx="1.5" fill="#fff" stroke="${INK}" stroke-width="2"/>`;
    s+=`<g transform="translate(-20,-196)"><path d="M-14,-40 Q0,-10 0,-2 Q0,-10 14,-40" stroke="#8d879a" stroke-width="2" fill="none"/><path d="M0,-4 V22 M-8,4 H8" stroke="#f1d27a" stroke-width="5" stroke-linecap="round"/><path d="M0,-4 V22 M-8,4 H8" stroke="${INK}" stroke-width="1.5" stroke-linecap="round" opacity=".5"/></g>`;
  } else if(k==='robe'||k==='dress'||k==='habit'){const g=k==='habit'?GAR.habit:GAR.white;
    s+=`<ellipse cx="-24" cy="-4" rx="18" ry="8" fill="${WH}" stroke="${INK}" stroke-width="4"/><ellipse cx="24" cy="-4" rx="18" ry="8" fill="${WH}" stroke="${INK}" stroke-width="4"/>`;
    s+=`<path d="M-46,-222 C-44,-240 -24,-250 0,-250 C24,-250 44,-240 46,-222 C54,-170 62,-90 72,-8 Q0,6 -72,-8 C-62,-90 -54,-170 -46,-222Z" fill="${g.f}" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/>`;
    s+=`<path d="M18,-240 C26,-180 32,-90 34,-2 Q54,-2 72,-8 C62,-90 56,-180 48,-236Z" fill="${g.s}"/>`;
    s+=`<path d="M-20,-130 C-26,-90 -30,-50 -36,-6 M10,-120 C12,-80 10,-40 12,-2 M-46,-80 C-50,-50 -54,-30 -58,-8" stroke="${g.fo}" stroke-width="3" fill="none"/>`;
    if(k==='habit')s+=`<path d="M-22,-238 L-20,-30 L22,-30 L22,-238Z" fill="${g.hi}" stroke="${INK}" stroke-width="3.5"/><path d="M-48,-150 Q0,-142 48,-150" stroke="#f3e8d0" stroke-width="7" fill="none"/><path d="M-48,-150 Q0,-142 48,-150 M-10,-146 L-14,-90 M-6,-146 L0,-96" stroke="${INK}" stroke-width="2.5" fill="none"/>`;
    else s+=`<path d="M-48,-152 Q0,-144 48,-152" stroke="${SH}" stroke-width="8" fill="none"/><path d="M-48,-156 Q0,-148 48,-156 M-48,-148 Q0,-140 48,-148" stroke="${INK}" stroke-width="2.5" fill="none"/>`;
    if(o.mantle)s+=`<path d="M-50,-234 C-20,-222 26,-176 54,-128 L64,-40 C40,-100 6,-150 -52,-176Z" fill="#ebe6ee" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/><path d="M-30,-196 C0,-170 30,-130 50,-90" stroke="${FO}" stroke-width="3" fill="none"/><path d="M40,-130 C50,-100 56,-70 60,-44" stroke="${SH}" stroke-width="9" fill="none" opacity=".8"/>`;
    s+=`<path d="M-16,-246 Q0,-236 18,-246" stroke="${INK}" stroke-width="3.5" fill="none"/>`;
  } else if(k==='tunic'){const g=GAR.white;
    for(const x of [-22,22])s+=`<path d="M${x-11},-86 L${x-10},-8 L${x+10},-8 L${x+11},-86Z" fill="${WH}" stroke="${INK}" stroke-width="4.5"/><ellipse cx="${x+4}" cy="-5" rx="16" ry="8" fill="${WH}" stroke="${INK}" stroke-width="4"/>`;
    s+=`<path d="M-46,-222 C-44,-240 -24,-250 0,-250 C24,-250 44,-240 46,-222 C52,-170 56,-130 62,-78 Q0,-66 -62,-78 C-56,-130 -52,-170 -46,-222Z" fill="${WH}" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/><path d="M18,-240 C26,-190 30,-130 32,-72 Q50,-74 62,-78 C56,-130 52,-190 46,-236Z" fill="${SH}"/><path d="M-20,-140 C-24,-110 -28,-90 -30,-74 M10,-130 C12,-110 12,-90 12,-70" stroke="${FO}" stroke-width="3" fill="none"/><path d="M-48,-150 Q0,-142 48,-150" stroke="${INK}" stroke-width="5" fill="none"/>`;
    if(o.mantle)s+=`<path d="M-50,-234 C-20,-222 20,-186 50,-150 L48,-130 C20,-160 -10,-186 -52,-196Z" fill="#ebe6ee" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
  } else if(k==='hoodie'){const g=GAR.hoodie;
    for(const x of [-22,22])s+=`<path d="M${x-14},-120 L${x-12},-10 L${x+12},-10 L${x+14},-120Z" fill="#c9cfdd" stroke="${INK}" stroke-width="4.5"/><path d="M${x+4},-118 L${x+5},-10 L${x+12},-10 L${x+14},-118Z" fill="#aab1c3"/><path d="M${x-14},-10 Q${x-14},-22 ${x+2},-22 Q${x+22},-20 ${x+24},-8 Q${x+24},2 ${x+4},2 L${x-12},2 Q${x-16},2 ${x-14},-10Z" fill="#fff" stroke="${INK}" stroke-width="4"/>`;
    s+=`<path d="M-30,-246 C-40,-262 -20,-270 0,-264 C20,-270 40,-262 30,-246Z" fill="${g.s}" stroke="${INK}" stroke-width="4"/>`;
    s+=`<path d="M-48,-222 C-46,-240 -24,-250 0,-250 C24,-250 46,-240 48,-222 C54,-190 56,-150 54,-112 Q0,-104 -54,-112 C-56,-150 -54,-190 -48,-222Z" fill="${g.f}" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/><path d="M20,-240 C26,-200 28,-150 28,-108 Q44,-108 54,-112 C56,-150 54,-200 48,-236Z" fill="${g.s}"/><path d="M-26,-160 L22,-160 L26,-128 L-30,-128Z" fill="none" stroke="${g.fo}" stroke-width="3"/><path d="M-6,-244 L-8,-200 M8,-244 L10,-204" stroke="${g.fo}" stroke-width="2.5"/>`;
  }
  return s;}
// figure: returns svg string. origin at feet. o.dir=1 faces right, -1 faces left.
function fig(o){const g=GAR[o.robe==='cassock'?'cassock':o.robe==='habit'?'habit':o.robe==='hoodie'?'hoodie':'white'];
  const flip=o.dir===-1?' scale(-1,1)':'';
  const body=bodySVG(o);
  const head=`<g class="head" transform="translate(0,-240)"><rect x="-9" y="-16" width="18" height="20" fill="${WH}" stroke="${INK}" stroke-width="4"/><g transform="translate(0,-4) scale(1.22)">${headSVG(o)}</g></g>`;
  const arms=armSVG('L',g)+armSVG('R',g);
  const prop=o.prop||'';
  return svg(380*(o.k||1),440*(o.k||1),'-190 -420 380 440',`<g filter="url(#rough)" transform="${flip.trim()}">${o.backProp||''}${body}${head}${arms}${prop}</g>`);
}
// ---------- PROPS ----------
function qmark(sz,fill='#fff'){return svg(sz*0.7,sz,`0 0 70 100`,`<text x="35" y="84" text-anchor="middle" font-family="Mont" font-weight="900" font-size="96" fill="${fill}" stroke="${INK}" stroke-width="7" paint-order="stroke" stroke-linejoin="round">?</text>`);}
function bubble(w,h,inner,tail='l'){const tx=tail==='l'?w*0.22:w*0.78;return `<div style="position:relative;width:${w}px;height:${h+30}px">${svg(w,h+30,`0 0 ${w} ${h+30}`,`<g filter="url(#rough)"><path d="M${tx-18},${h-4} L${tx+(tail==='l'?-24:24)},${h+26} L${tx+18},${h-4}Z" fill="#fff" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><rect x="4" y="4" width="${w-8}" height="${h-8}" rx="${h/2.6}" fill="#fff" stroke="${INK}" stroke-width="5"/><path d="M${tx-14},${h-8} L${tx+14},${h-8}" stroke="#fff" stroke-width="8"/></g>`)}<div style="position:absolute;left:0;top:0;width:${w}px;height:${h}px;display:flex;align-items:center;justify-content:center">${inner}</div></div>`;}
function dove(sc=1,wing='up',glow=false){const wingD=wing==='up'?`<path d="M-14,-2 C-26,-44 -14,-86 28,-104 C18,-78 30,-46 22,-4Z" fill="${WH}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M-6,-30 C0,-56 10,-76 22,-92 M4,-14 C10,-40 20,-58 26,-72" stroke="${FO}" stroke-width="3" fill="none"/>`
    :`<path d="M-14,4 C-30,34 -18,66 20,84 C14,58 24,32 22,6Z" fill="${SH}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M-4,20 C0,42 8,58 18,70" stroke="${FO}" stroke-width="3" fill="none"/>`;
  const back=wing==='up'?`<path d="M0,-4 C4,-36 26,-62 56,-70 C40,-50 42,-28 34,-6Z" fill="${SH}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`:`<path d="M0,2 C10,26 30,40 50,44 C40,28 40,16 34,4Z" fill="${SH}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`;
  const gl=glow?`<circle cx="0" cy="0" r="150" fill="url(#dglow)"/>`:'';
  return svg(300*sc,260*sc,'-150 -130 300 260',`<defs><radialGradient id="dglow"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".45" stop-color="#fff6c8" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>${gl}<g filter="url(#rough)">${back}<path d="M-76,8 C-46,-12 18,-16 50,-8 C62,-26 86,-26 92,-10 C96,0 90,8 80,10 C70,26 20,34 -30,26 L-86,40 L-94,24 L-102,22Z" fill="${WH}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M90,-12 L108,-6 L90,0Z" fill="#f2c14e" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/><path d="M-60,22 C-20,26 30,24 70,12" stroke="${SH}" stroke-width="7" fill="none"/>${wingD}</g>`);}
function bible(sc=1){return svg(420*sc,280*sc,'-210 -150 420 280',`<g filter="url(#rough)"><path d="M-200,-90 Q-100,-120 0,-96 Q100,-120 200,-90 L200,110 Q100,86 0,112 Q-100,86 -200,110Z" fill="#9b3d3a" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M-186,-104 Q-96,-132 0,-108 L0,98 Q-96,74 -186,96Z" fill="#fbf7ef" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M186,-104 Q96,-132 0,-108 L0,98 Q96,74 186,96Z" fill="#efe8dc" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>${[...Array(8)].map((_,i)=>`<path d="M-160,${-80+i*20} Q-90,${-100+i*20} -24,${-84+i*20}" stroke="#c9bfb2" stroke-width="5" stroke-linecap="round" fill="none"/><path d="M24,${-84+i*20} Q90,${-100+i*20} 160,${-80+i*20}" stroke="#c9bfb2" stroke-width="5" stroke-linecap="round" fill="none"/>`).join('')}<path d="M-6,-108 L-6,140 L6,128 L10,142 L10,-104" fill="#d9a441" stroke="${INK}" stroke-width="3"/></g>`);}
function banner(sc=1){return svg(300*sc,470*sc,'-150 -40 300 470',`<g filter="url(#rough)"><path d="M-140,0 H140" stroke="#c9902f" stroke-width="12" stroke-linecap="round"/><path d="M-140,0 H140" stroke="${INK}" stroke-width="3" opacity=".6"/><circle cx="-142" cy="0" r="13" fill="#f2c14e" stroke="${INK}" stroke-width="4"/><circle cx="142" cy="0" r="13" fill="#f2c14e" stroke="${INK}" stroke-width="4"/><path d="M0,-30 L0,0" stroke="${INK}" stroke-width="4"/><path d="M-110,6 H110 V360 L0,420 L-110,360Z" fill="#fbf8f2" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M60,6 H110 V360 L60,388Z" fill="#e7e1e9"/><path d="M-94,22 H94 V350 L0,400 L-94,350Z" fill="none" stroke="#e1b14a" stroke-width="6"/>${[...Array(5)].map((_,i)=>`<path d="M${-80+i*40},360 v${i===2?60:40}" stroke="#e1b14a" stroke-width="5"/>`).join('')}</g>`);}
function scroll(sc=1){return svg(420*sc,250*sc,'-210 -125 420 250',`<g filter="url(#rough)"><rect x="-170" y="-90" width="340" height="180" fill="#fbf4e2" stroke="${INK}" stroke-width="5"/><path d="M-170,-90 H170 V90 H-170Z" fill="none"/><rect x="-198" y="-104" width="34" height="208" rx="17" fill="#e8d3a6" stroke="${INK}" stroke-width="5"/><rect x="164" y="-104" width="34" height="208" rx="17" fill="#e8d3a6" stroke="${INK}" stroke-width="5"/><path d="M-120,4 C-90,-14 -60,18 -30,0 S30,-12 60,4 S100,10 120,-4" stroke="#c98a1f" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M60,-40 h0" /></g>`);}
function progress(w){return svg(w+40,90,`-20 -45 ${w+40} 90`,`<g filter="url(#rough)"><rect x="0" y="-16" width="${w}" height="32" rx="16" fill="rgba(255,255,255,.45)" stroke="${INK}" stroke-width="5"/><rect class="pfill" x="0" y="-16" width="${w*0.12}" height="32" rx="16" fill="#fff" stroke="${INK}" stroke-width="5"/><circle class="phead" cx="${w*0.12}" cy="0" r="24" fill="#fff" stroke="${INK}" stroke-width="5"/></g>`);}
function flag(){return svg(90,120,'-20 -110 90 120',`<g filter="url(#rough)"><path d="M0,0 V-104" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M2,-102 H62 L48,-82 L62,-62 H2Z" fill="#f2c14e" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M14,-94 h10 v8 h-10z M34,-86 h10 v8 h-10z M14,-78 h10 v8 h-10z" fill="${INK}" opacity=".8"/></g>`);}
function heart(sc=1){return svg(220*sc,200*sc,'-110 -100 220 200',`<g filter="url(#rough)"><path d="M0,80 C-60,30 -96,0 -96,-38 C-96,-72 -66,-90 -40,-90 C-20,-90 -6,-78 0,-62 C6,-78 20,-90 40,-90 C66,-90 96,-72 96,-38 C96,0 60,30 0,80Z" fill="#ff8fa6" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M-60,-50 C-58,-66 -46,-74 -34,-72" stroke="#fff" stroke-width="10" stroke-linecap="round" fill="none" opacity=".8"/></g>`);}
function battery(sc=1){return svg(240*sc,150*sc,'-120 -75 240 150',`<g filter="url(#rough)"><rect x="-100" y="-56" width="186" height="112" rx="18" fill="#fff" stroke="${INK}" stroke-width="6"/><rect x="86" y="-22" width="20" height="44" rx="6" fill="#fff" stroke="${INK}" stroke-width="6"/><rect x="-84" y="-40" width="110" height="80" rx="8" fill="#8fe388"/><path d="M8,-46 L-28,6 L-2,6 L-14,46 L26,-10 L0,-10Z" fill="#ffd84a" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/></g>`);}
function forceIcon(sc=1){return svg(240*sc,220*sc,'-120 -110 240 220',`<g filter="url(#rough)"><path d="M-96,-40 C-40,-80 40,-70 70,-30 C90,0 60,30 20,20 C-10,12 -6,-16 20,-14" stroke="#fff" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M-96,-40 C-40,-80 40,-70 70,-30 C90,0 60,30 20,20 C-10,12 -6,-16 20,-14" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round" opacity=".7"/><path d="M-100,20 C-60,0 -20,20 -10,50 M-90,64 C-50,50 0,70 40,60" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M-100,20 C-60,0 -20,20 -10,50 M-90,64 C-50,50 0,70 40,60" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round" opacity=".7"/><path d="M60,-90 L24,-10 L52,-10 L34,80 L96,-24 L66,-24 L86,-90Z" fill="#ffd84a" stroke="${INK}" stroke-width="5.5" stroke-linejoin="round"/></g>`);}
function crossX(sz){return svg(sz,sz,`-100 -100 200 200`,`<g filter="url(#rough)"><path d="M-80,-80 L80,80 M80,-80 L-80,80" stroke="${INK}" stroke-width="40" stroke-linecap="round"/><path d="M-80,-80 L80,80 M80,-80 L-80,80" stroke="#ef4b4b" stroke-width="26" stroke-linecap="round"/></g>`);}
function check(sz){return svg(sz,sz,'-60 -60 120 120',`<g filter="url(#rough)"><circle r="54" fill="#fff" stroke="${INK}" stroke-width="5"/><path d="M-26,2 L-6,22 L28,-20" stroke="#3fb56b" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`);}
function nameTag(w,h){return svg(w+20,h+20,`-10 -10 ${w+20} ${h+20}`,`<g filter="url(#rough)"><rect x="0" y="0" width="${w}" height="${h}" rx="22" fill="#fffaf0" stroke="${INK}" stroke-width="6"/><rect x="14" y="14" width="${w-28}" height="${h-28}" rx="14" fill="none" stroke="#e2b04a" stroke-width="5"/><circle cx="${w/2}" cy="-2" r="12" fill="#e2b04a" stroke="${INK}" stroke-width="4"/></g>`);}
function sparkle(sz,c='#fff'){return svg(sz,sz,'-50 -50 100 100',`<path d="M0,-46 C6,-10 10,-6 46,0 C10,6 6,10 0,46 C-6,10 -10,6 -46,0 C-10,-6 -6,-10 0,-46Z" fill="${c}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`);}
function flower(sc,c){return svg(70*sc,110*sc,'-35 -100 70 110',`<g filter="url(#rough)"><path d="M0,0 C-4,-30 4,-50 0,-70" stroke="#4f9a4a" stroke-width="5" fill="none"/><path d="M0,-30 C-14,-40 -24,-36 -26,-28 C-16,-24 -6,-26 0,-30Z" fill="#7cc86e" stroke="${INK}" stroke-width="3"/>${[0,72,144,216,288].map(a=>`<ellipse cx="0" cy="-14" rx="9" ry="14" transform="translate(0,-74) rotate(${a})" fill="${c}" stroke="${INK}" stroke-width="3"/>`).join('')}<circle cx="0" cy="-74" r="8" fill="#ffd84a" stroke="${INK}" stroke-width="3"/></g>`);}
function sunburst(sz,c='#fff',op=.35){return svg(sz,sz,'-100 -100 200 200',[...Array(16)].map((_,i)=>{const a=i/16*Math.PI*2,b=a+0.11;return `<path d="M0,0 L${Math.cos(a)*100},${Math.sin(a)*100} L${Math.cos(b)*100},${Math.sin(b)*100}Z" fill="${c}" opacity="${op}"/>`;}).join('')+`<circle r="40" fill="${c}" opacity="${op}" filter="url(#bl6)"/>`);}
// Trinity diagram node
function node(r,inner,fill='#fff'){return svg(2*r+20,2*r+20,`${-r-10} ${-r-10} ${2*r+20} ${2*r+20}`,`<g filter="url(#rough)"><circle r="${r}" fill="${fill}" stroke="${INK}" stroke-width="6"/>${inner}</g>`);}
const T_TXT=(t,sz,fill=INK)=>`<text y="${sz*0.36}" text-anchor="middle" font-family="Mont" font-weight="900" font-size="${sz}" fill="${fill}">${t}</text>`;
function crossIcon(sc=1){return `<g transform="scale(${sc})"><path d="M0,-44 V48 M-30,-14 H30" stroke="${INK}" stroke-width="22" stroke-linecap="round"/><path d="M0,-44 V48 M-30,-14 H30" stroke="#e2b04a" stroke-width="11" stroke-linecap="round"/></g>`;}
function line(x1,y1,x2,y2,w=12,c='#fff'){const minx=Math.min(x1,x2)-20,miny=Math.min(y1,y2)-20,W=Math.abs(x2-x1)+40,H=Math.abs(y2-y1)+40;
  return svg(W,H,`${minx} ${miny} ${W} ${H}`,`<path class="dr" d="M${x1},${y1} L${x2},${y2}" stroke="${INK}" stroke-width="${w+9}" stroke-linecap="round"/><path class="dr" d="M${x1},${y1} L${x2},${y2}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`);}
// vertical colour strips (comparison panels)
function strip(w,h,hue,seed){ /* w may exceed the visible panel */const r=rng(seed);let s=`<defs><linearGradient id="st${seed}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${hsl(hue,60,66)}"/><stop offset="1" stop-color="${hsl(hue,55,52)}"/></linearGradient></defs><rect x="0" y="0" width="${w}" height="${h}" fill="url(#st${seed})"/>`;
  for(let i=0;i<4;i++)s+=cloud(r()*w,80+r()*200,140+r()*80,hsl(hue,70,82),.55);
  const f=wave(seed,20,h*0.78);let pts=[];for(let x=-20;x<=w+20;x+=20)pts.push([x,f(x)]);s+=`<path d="${smooth(pts)} L${w+20},${h} L-20,${h}Z" fill="${hsl(hue,50,44)}" stroke="${hsl(hue,50,32)}" stroke-width="3"/>`;
  return svg(w,h,`0 0 ${w} ${h}`,s);}

function handShapes(){return ['<rect x="-24" y="-56" width="48" height="72" rx="18"/>','<rect x="-23" y="0" width="11" height="40" rx="5.5"/>','<rect x="-11.5" y="0" width="11" height="48" rx="5.5"/>','<rect x="0" y="0" width="11" height="46" rx="5.5"/>','<rect x="11.5" y="0" width="11" height="36" rx="5.5"/>','<rect x="-6" y="-12" width="12" height="40" rx="6" transform="translate(-24,-26) rotate(42)"/>'];}
function handSVG(){const H=handShapes();return `<g stroke="${INK}" stroke-width="9" stroke-linejoin="round" fill="${INK}">${H.join('')}</g><g fill="${WH}">${H.join('')}</g><path d="M-12,4 V30 M-0.5,4 V34 M11,4 V30" stroke="${FO}" stroke-width="2.5"/><path d="M10,-50 C16,-30 16,-10 12,6" stroke="${SH}" stroke-width="9" fill="none" opacity=".8"/>`;}
function handCloud(sc=1){return svg(400*sc,380*sc,'-200 -170 400 380',`<defs><radialGradient id="hcg"><stop offset="0" stop-color="#fff8d6" stop-opacity=".95"/><stop offset="1" stop-color="#fff8d6" stop-opacity="0"/></radialGradient></defs><circle cx="0" cy="60" r="160" fill="url(#hcg)"/>${[...Array(9)].map((_,i)=>{const a=(i-4)*0.3;return `<path d="M0,40 L${Math.sin(a)*200-9},${40+Math.cos(a)*200} L${Math.sin(a)*200+9},${40+Math.cos(a)*200}Z" fill="#fff" opacity=".5"/>`;}).join('')}<g filter="url(#rough)"><g transform="translate(0,-10) rotate(-12) scale(1.25)">${handSVG()}</g>${cloud(-60,-96,220,WH,1,[INK,4.5])}${cloud(80,-104,200,WH,1,[INK,4.5])}${cloud(-60,-90,170,'#ece7f0',1)}${cloud(80,-98,150,'#ece7f0',1)}</g>`);}
function miniHand(sc=1){return `<g transform="scale(${sc})"><g transform="translate(0,6) rotate(-12) scale(.62)">${handSVG()}</g>${cloud(0,-34,96,WH,1,[INK,4])}</g>`;}
