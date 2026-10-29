// Holy Spirit: full video (≈4.5 min). Every timed element uses W(sentence, word[, occurrence]) from T.js.
const GY=650; // feet baseline
// ---------- cast ----------
const FATHER={robe:'cassock',c1:'#33303b',hair:'father',hc:'#3b3138'};
const PAUL={robe:'robe',c1:'#efe6d6',c2:'#b5473b',hair:'paul',hc:'#8d7b6c',beard:'long'};
const JESUS={robe:'robe',c1:'#fbf8f2',c2:'#c8463d',belt:'#e2b04a',hair:'jesus',hc:'#7a5236',beard:'short',halo:true};
const PETER={robe:'tunic',c1:'#5b7fb8',c2:'#e08b3c',hair:'peter',hc:'#a9a4ad',beard:'curly'};
const MARY={robe:'dress',c1:'#f3efe6',hair:'veil',hc:'#4f7cc4',halo:true};
const B1={robe:'dress',c1:'#e9dcc4',hair:'veil',hc:'#6f8fc0'};
const B2={robe:'tunic',c1:'#d8c3a0',c2:'#7c9a5a',hair:'teen',hc:'#5a3f2c',beard:'short'};
const B3={robe:'tunic',c1:'#c9b48f',c2:'#8a5a8a',hair:'girl',hc:'#3f3434'};
const TEEN={robe:'hoodie',c1:'#4fb3a9',c2:'#3d968d',c3:'#5b7bb5',hair:'teen',hc:'#6b4a33'};
const GIRL={robe:'hoodie',c1:'#f08aa6',c2:'#d76f8c',c3:'#7a8fc4',hair:'girl',hc:'#9a6a3e'};
const TEEN3={robe:'hoodie',c1:'#f2b84b',c2:'#d99a2e',c3:'#5b7bb5',hair:'teen',hc:'#2e2a2a'};
const MONK={robe:'habit',c1:'#8a6a4c',hair:'monk',hc:'#6b4a33'};
const MEDI={robe:'dress',c1:'#b0546b',hair:'veil',hc:'#f3efe6'};
const SERVANT={robe:'dress',c1:'#c98e6a',hair:'scarf',hc:'#e9d3a6'};
const BISHOP={robe:'robe',c1:'#fbf8f2',c2:'#c8463d',belt:'#e2b04a',hair:'monk',hc:'#9a94a1',hat:HAT_MITRE};
const MOM={robe:'dress',c1:'#7fb0d8',hair:'girl',hc:'#5a3f2c'};
const DAD={robe:'hoodie',c1:'#7d93c9',c2:'#6478ad',c3:'#4a5a7a',hair:'teen',hc:'#3f3434',beard:'short'};
const KID={robe:'hoodie',c1:'#ffd36b',c2:'#e8b94a',c3:'#7a8fc4',hair:'teen',hc:'#9a6a3e'};
const APOS=[{robe:'tunic',c1:'#d9a066',c2:'#8a5a8a',hair:'teen',hc:'#5a3f2c',beard:'short'},{robe:'tunic',c1:'#8fb9d8',c2:'#c8463d',hair:'jesus',hc:'#3f3434',beard:'short',halo:false},{robe:'tunic',c1:'#b9d68f',c2:'#e08b3c',hair:'paul',hc:'#8d7b6c',beard:'long'},{robe:'tunic',c1:'#e6b7c9',c2:'#5b7fb8',hair:'teen',hc:'#2e2a2a'}];
const F=(eyes,brows,mouth,talk)=>({eyes,brows,mouth,talk});
const PZ=(l,r,tilt=0)=>{const A=typeof l==='string'?ARMS[l]:l,B=typeof r==='string'?ARMS[r]:r;return {lU:A.a,lF:A.b,rU:B.a,rF:B.b,tilt};};
// character element: o = outfit + {faces, armL, armR, holdL, holdR}; k = scale; ex.p = [[t,l,r,tilt],...]; ex.fc = [[t,faceIndex]]
function CH(o,x,k,ex={}){const base=PZ(o.armL||'down',o.armR||'down',o.tilt||0);
  const poses=[[0,base],...(ex.p||[]).map(([t,l,r,tilt])=>[t,{...PZ(l,r,tilt??0),d:.35}])];
  const e=Object.assign({html:chibi(o),x,y:(ex.feet??GY)+30*k,anchor:'b',z:10,s:k,breathe:1,poses},ex);delete e.p;return e;}
// ---------- text & UI helpers ----------
function TXT(lines,times,size,x,y,extra={}){const html=`<div class="tt" style="font-size:${size}px;${extra.style||''}">`+lines.map(l=>l.split(' ').map(w=>`<span class="wd">${w}</span>`).join(' ')).join('<br>')+`</div>`;
  const n=lines.join(' ').split(' ').length;const wt=[...Array(n)].map((_,i)=>times[Math.min(i,times.length-1)]);
  return Object.assign({html,x,y,z:20,wt,at:times[0]-0.01,a:'none'},extra);}
const REF=(t,x,y,at)=>({html:`<div class="ref">${t}</div>`,x,y,z:21,at,a:'fade'});
const PILL=(t,x,y,at,size=30,ex={})=>Object.assign({html:`<div class="pill" style="font-size:${size}px">${t}</div>`,x,y,z:22,at,a:'pop'},ex);
const Q=(x,y,sz,at,extra={})=>Object.assign({html:qmark(sz),x,y,z:15,at,float:6,sway:6},extra);
const LBL=(t,x,y,at,size=34)=>({html:`<div class="lbl" style="font-size:${size}px">${t}</div>`,x,y,z:20,at,a:'rise'});
const BG=(c)=>({html:`<div style="width:1500px;height:900px;background:${c}"></div>`,x:640,y:360,depth:0,z:0});
const STRIP=(i,n,hue,seed,at)=>{const W=1280/n;let l=i*W+3.5,r=(i+1)*W-3.5;if(i===0)l=-300;if(i===n-1)r=1580;return {html:`<div style="transform:skewX(-5deg)">${strip(r-l,800,hue,seed)}</div>`,x:(l+r)/2,y:360,z:1,at,a:'slideD',d:.45};};
const FX=(html,x,y,at,ex={})=>Object.assign({html,x,y,z:14,at,a:'pop'},ex);
const DOVE=(x,y,s,at,ex={})=>Object.assign({frames:[dove(s,'up',!!ex.glow),dove(s,'down',!!ex.glow)],html:'',x,y,z:13,at,a:'pop',fps:5,float:6},ex);
const BAR=(x,h,at,label,ex={})=>[{html:`<div style="width:110px;height:${h}px;background:#fff;border:5px solid ${CI};border-bottom:none;border-radius:12px 12px 0 0"></div>`,x,y:600,anchor:'b',z:12,at,a:'wipeU',d:.7},{html:`<div class="lbl" style="font-size:26px">${label}</div>`,x,y:630,z:20,at,a:'rise'}];
const COUNT=(x,y,size,from,to,at,d,fmt,ex={})=>Object.assign({html:`<div class="tt cnt" style="font-size:${size}px">${fmt(from)}</div>`,x,y,z:20,at,a:'pop',tick:(t,e)=>{const q=eOut(clamp((t-at)/d));const v=Math.round(from+(to-from)*q);if(e._v!==v){e._v=v;e.inn.querySelector('.cnt').textContent=fmt(v);}}},ex);
const GIFTS=[['WISDOM',()=>globe(.5)],['UNDERSTANDING',()=>bulb(.42)],['COUNSEL',()=>signpost(.3)],['FORTITUDE',()=>shield(.4)],['KNOWLEDGE',()=>magnifier(.42)],['PIETY',()=>heartIcon(.5)],['FEAR OF THE LORD',()=>sparkle(56,'#fff3a8')]];
function giftRow(cur,at){return GIFTS.map(([n,ic],i)=>({html:`<div style="width:92px;height:92px;border-radius:50%;background:#fff;border:5px solid ${CI};display:flex;align-items:center;justify-content:center;opacity:${i<=cur?1:.38}">${ic()}</div>`,x:240+i*133,y:648,z:18,at:i===cur?at:undefined,a:i===cur?'stamp':undefined,pulse:i===cur?.03:0}));}
const ACTSTAG=(t,at)=>({html:`<div class="pill">${t}</div>`,x:130,y:62,z:30,at,a:'slideL',depth:0});

const SCENES=[
// ===================== INTRO =====================
// 0.0 "In the Bible..."
{t0:0,cam:[{at:0.4,d:1.2,z:1.18,y:380}],els:[...land({h:42,s:62,seed:21,sun:[640,40],rays:true,mountains:false,hy1:520,hy2:590,gy:660,clouds:6}),
  {html:sunburst(700,'#fff',.25),x:640,y:390,z:6,at:W(0,'bible'),a:'grow',spin:6},
  {html:bible(1.15),x:640,y:400,z:10,at:W(0,'bible'),float:4},
]},
// "...Saint Paul once met a group of believers and asked them a simple question"
{t0:W(0,'paul')-0.05,trans:'zoom',cam0:{x:600},cam:[{at:1.3,d:3.5,x:680}],els:[...land({h:158,s:36,seed:3,city:{x0:640,x1:1350,type:'ancient',temple:1020},trees:6,cypress:true,bushes:4,sun:[1000,0],clearX:[640,300]}),
  ACTSTAG('Acts 19',W(0,'paul')+0.4),
  CH({...PAUL,holdL:P_SCROLL,faces:[F('dot','up','smile')]},150,1.4,{move:{at:W(0,'paul'),d:1.4,x:370,ease:'lin'},walk:7,walkUntil:W(0,'paul')+1.4,p:[[W(0,'asked'),'down','point']]}),
  CH({...B1,faces:[F('dot','','smile'),F('dot','up','o')],dir:-1},800,1.2,{at:W(0,'group'),a:'rise',fc:[[W(0,'question'),1]]}),
  CH({...B2,faces:[F('dot','','smile'),F('side','think','flat')],dir:-1},950,1.25,{at:W(0,'group')+0.12,a:'rise',fc:[[W(0,'question'),1]]}),
  CH({...B3,faces:[F('happy','','smile'),F('dot','up','o')],dir:-1},1095,1.15,{at:W(0,'group')+0.24,a:'rise',fc:[[W(0,'question'),1]]}),
  {html:bubble(130,110,qmark(80)),x:470,y:215,z:20,at:W(0,'simple'),float:4},
]},
// "Did you receive the Holy Spirit?"
{t0:W(1,'did')-0.1,trans:'whip',cam:[{at:W(1,'did'),d:2,z:1.05}],els:[...land({h:158,s:36,seed:4,city:{x0:900,x1:1400,type:'ancient'},trees:5,cypress:true,bushes:4,sun:[300,0],clearX:[300,220]}),
  CH({...PAUL,holdL:P_SCROLL,faces:[F('dot','up','smile')]},300,1.75,{feet:670,talk:[[W(1,'did')-0.3,W(1,'spirit')+0.3]],p:[[W(1,'did'),'down','forward'],[W(1,'holy'),'down','point']]}),
  TXT(['Did you receive','the Holy Spirit?'],[W(1,'did'),W(1,'you'),W(1,'receive'),W(1,'the'),W(1,'holy'),W(1,'spirit')],70,860,290),
  REF('ACTS 19:2',860,420,W(1,'spirit')+0.2),
]},
// "And they answered: 'we have never even heard that there is a Holy Spirit.'"
{t0:W(2,'and')-0.05,trans:'whip',cam:[{at:W(3,'heard'),d:1.6,z:1.05,y:380}],els:[...land({h:150,s:36,seed:5,trees:6,cypress:true,bushes:4,city:{x0:-100,x1:300,type:'ancient'}}),
  CH({...B1,faces:[F('dot','','smile'),F('wide','worried','wavy')]},370,1.3,{talk:[[W(3,'we')-0.2,W(3,'spirit')+0.3]],fc:[[W(3,'heard'),1]],p:[[W(3,'heard'),'shrug','shrug',-6]]}),
  CH({...B2,faces:[F('dot','','smile'),F('side','think','flat')]},640,1.35,{fc:[[W(3,'heard')+0.1,1]],p:[[W(3,'heard')+0.1,'down','chin',6]]}),
  CH({...B3,faces:[F('dot','','smile'),F('dot','worried','o')],dir:-1},910,1.25,{fc:[[W(3,'heard')+0.2,1]],p:[[W(3,'heard')+0.2,'shrug','shrug',-5]]}),
  TXT(['“We have never even heard','that there is a Holy Spirit.”'],[W(3,'we'),W(3,'have'),W(3,'never'),W(3,'even'),W(3,'heard'),W(3,'that'),W(3,'there'),W(3,'is'),W(3,'a'),W(3,'holy'),W(3,'spirit')],54,640,140),
  REF('ACTS 19:2',640,236,W(3,'spirit')+0.2),
  Q(170,430,110,W(3,'heard')),Q(1110,430,120,W(3,'heard')+0.1),Q(250,300,70,W(3,'heard')+0.2),Q(1030,300,80,W(3,'heard')+0.3),Q(100,300,60,W(3,'heard')+0.4),Q(1180,300,66,W(3,'heard')+0.5),
]},
// "Honestly? A lot of Catholics today could say the same thing."
{t0:W(4,'honestly')-0.05,trans:'whip',dir:-1,cam0:{x:620},cam:[{at:W(5,'catholics'),d:2.5,x:680}],els:[...land({h:205,s:48,seed:6,city:{x0:450,x1:900,type:'modern'},church:[1180,1],trees:5,bushes:4,clearX:[330,200]}),
  CH({...FATHER,faces:[F('dot','up','smile'),F('dot','','smile')]},320,1.55,{at:W(4,'honestly'),a:'pop',talk:true,p:[[W(4,'honestly'),'shrug','shrug',-6],[W(5,'catholics'),'down','point',4]],fc:[[W(5,'catholics'),1]]}),
  CH({...TEEN,holdR:P_PHONE,faces:[F('side','','flat'),F('dot','worried','wavy')],dir:-1},760,1.15,{at:W(5,'catholics'),a:'rise',p:[[0,'down','forward']],fc:[[W(5,'same'),1]]}),
  CH({...GIRL,faces:[F('dot','','smile'),F('dot','worried','o')],dir:-1},905,1.1,{at:W(5,'catholics')+0.12,a:'rise',fc:[[W(5,'same')+0.1,1]],p:[[W(5,'same')+0.1,'shrug','shrug']]}),
  CH({...TEEN3,faces:[F('dot','','smile'),F('side','think','flat')],dir:-1},1050,1.15,{at:W(5,'catholics')+0.24,a:'rise',fc:[[W(5,'same')+0.2,1]],p:[[W(5,'same')+0.2,'down','chin']]}),
  Q(760,262,70,W(5,'same')),Q(905,272,66,W(5,'same')+0.1),Q(1050,258,72,W(5,'same')+0.2),
]},
// "We know God the Father. We know Jesus. But the Holy Spirit? For most people, he is kind of a mystery."
{t0:W(6,'god')-0.1,trans:'whip',cam:[{at:W(9,'people'),d:1.6,x:1067,z:1.28}],drift:0.02,els:[BG('#fff'),
  STRIP(0,3,42,31,W(6,'god')-0.1),STRIP(1,3,335,32,W(6,'god')),STRIP(2,3,205,33,W(6,'god')+0.1),
  {html:handCloud(.85),x:213,y:300,z:10,at:W(6,'god'),a:'drop',float:4},
  {html:check(70),x:213,y:500,z:12,at:W(6,'father'),a:'stamp'},
  LBL('GOD THE FATHER',213,605,W(6,'god'),30),
  CH({...JESUS,armL:'out',armR:'out',faces:[F('happy','','smile')]},640,1.1,{feet:470,at:W(7,'jesus'),a:'rise'}),
  {html:check(70),x:640,y:530,z:12,at:W(7,'jesus')+0.25,a:'stamp'},
  LBL('JESUS',640,605,W(7,'jesus'),30),
  Q(1067,320,210,W(8,'holy'),{a:'pop',float:5,sway:4}),
  LBL('HOLY SPIRIT',1067,605,W(8,'holy'),30),
  Q(930,175,52,W(9,'most')),Q(1200,165,58,W(9,'most')+0.12),Q(925,470,56,W(9,'most')+0.24),Q(1205,455,50,W(9,'most')+0.36),Q(955,320,44,W(9,'most')+0.48),Q(1180,315,46,W(9,'most')+0.6),
  {html:`<div style="filter:blur(10px)">${svg(520,160,'-260 -80 520 160',cloud(-60,30,300,'#fff',.85)+cloud(120,40,260,'#fff',.8))}</div>`,x:1067,y:520,z:14,at:W(9,'mystery'),a:'slideR',d:.8},
]},
// "A dove on a banner. A name at the end of the Sign of the Cross."
{t0:W(10,'dove')-0.1,trans:'whip',cam:[{at:W(11,'name'),d:0.7,x:1240}],drift:0.03,els:[...interior(345,42),
  {html:banner(1),x:420,y:330,z:8,at:W(10,'banner'),a:'wipeD',d:.6,sway:1.2},
  {frames:[dove(.62,'up'),dove(.62,'down')],html:'',x:820,y:140,z:12,at:W(10,'dove'),a:'fade',d:.2,fps:7,frUntil:W(10,'banner')+0.4,move:{at:W(10,'dove'),d:0.6,x:420,y:290},float:3},
  TXT(['In the name of the Father,'],[W(11,'name')+0.55],44,1060,250),
  TXT(['and of the Son,'],[W(11,'name')+0.7],44,1060,318),
  TXT(['and of the Holy Spirit.'],[W(11,'end')+0.3],54,1060,400,{style:'color:#ffe28a'}),
  CH({...FATHER,faces:[F('closed','','smile')],dir:-1},1640,1.55,{p:[[W(11,'name'),{a:150,b:-150},'down'],[W(11,'end'),'chest','down'],[W(11,'sign'),{a:30,b:-140},'down']]}),
  {html:svg(130,170,'-65 -85 130 170',`<path class="dr" d="M0,-70 V70 M-48,-22 H48" stroke="${INK}" stroke-width="22" stroke-linecap="round" fill="none"/><path class="dr" d="M0,-70 V70 M-48,-22 H48" stroke="#ffe28a" stroke-width="12" stroke-linecap="round" fill="none"/>`),x:1460,y:200,z:12,at:W(11,'sign'),a:'none',drawD:.7,float:4},
  {html:sunburst(300,'#fff',.3),x:1460,y:200,z:11,at:W(11,'sign'),a:'grow',spin:12},
]},
// "So today, let's fix that."
{t0:W(12,'so')-0.05,trans:'whip',els:[...land({h:118,s:44,seed:7,trees:7,bushes:4,clearX:[640,500]}),
  CH({...FATHER,faces:[F('dot','up','smile'),F('dot','bold','grin')]},400,1.6,{talk:true,p:[[W(12,'today'),'down','raise'],[W(12,'fix'),'hip','point']],fc:[[W(12,'fix'),1]]}),
  Q(870,300,190,W(12,'so')-0.05,{a:'none',out:W(12,'fix')}),
  {html:sunburst(560,'#fff',.35),x:870,y:300,z:12,at:W(12,'fix'),a:'grow',spin:14},
  {html:svg(150,210,'0 0 70 100',`<text x="35" y="84" text-anchor="middle" font-family="Mont" font-weight="900" font-size="96" fill="#ffe28a" stroke="${INK}" stroke-width="7" paint-order="stroke" stroke-linejoin="round">!</text>`),x:870,y:300,z:15,at:W(12,'fix'),a:'stamp',float:5},
  {html:sparkle(60),x:760,y:190,z:16,at:W(12,'fix')+0.1,a:'pop',pulse:.1},{html:sparkle(44),x:990,y:200,z:16,at:W(12,'fix')+0.2,a:'pop',pulse:.1},{html:sparkle(50),x:1000,y:420,z:16,at:W(12,'fix')+0.3,a:'pop',pulse:.1},
]},
// "Who is the Holy Spirit, and what does he actually do in your life?"
{t0:W(13,'who')-0.1,trans:'whipV',els:[...land({h:196,s:46,seed:9,mountains:false,clouds:11,cloudBand:420,hy1:540,hy2:600,gy:665,trees:6,bushes:4,clearX:[640,260]}),
  DOVE(-100,120,.4,W(13,'who'),{a:'none',fps:6,move:{at:W(13,'who'),d:4,x:1400,y:90,ease:'lin'}}),
  TXT(['WHO IS THE','HOLY SPIRIT?'],[W(13,'who'),W(13,'is'),W(13,'the'),W(13,'holy'),W(13,'spirit')],108,640,230),
  ...[[TEEN,0],[GIRL,0.12],[TEEN3,0.24]].map(([o,d],i)=>CH({...o,faces:[F('dot','','smile')],dir:-1},1420+i*120,.75,{feet:700,at:W(13,'what')+d,a:'none',move:{at:W(13,'what')+d,d:1.6,x:910+i*120,ease:'lin'},walk:6,walkUntil:W(13,'what')+1.6+d})),
  TXT(['& WHAT DOES HE DO IN YOUR LIFE?'],[W(13,'what'),W(13,'does'),W(13,'he'),W(13,'do'),W(13,'in'),W(13,'your'),W(13,'life')],46,640,440,{style:'color:#fff8d8'}),
]},
// "And stay to the end..."
{t0:W(14,'stay')-0.1,trans:'whip',els:[...land({h:40,s:60,seed:12,trees:4,bushes:4,sun:[900,20],clearX:[260,180]}),
  CH({...FATHER,faces:[F('dot','up','grin')]},250,1.5,{talk:true,p:[[0,'hip','point']]}),
  {html:progress(660),x:790,y:330,z:12,at:W(14,'stay'),a:'pop',tick:(t,e)=>{const q=eInOut(clamp((t-W(14,'end')+0.25)/0.8));const w=660*(0.12+0.88*q);e.inn.querySelector('.pfill').setAttribute('width',w);e.inn.querySelector('.phead').setAttribute('cx',w);}},
  {html:flag(),x:1140,y:262,z:13,at:W(14,'end'),a:'drop'},
]},
// "...a one-line prayer that the Church has prayed for centuries, and it might be the most powerful thing you learn today."
{t0:W(14,'oneline')-0.1,trans:'whip',cam:[{at:W(14,'powerful'),d:1.4,z:1.06,y:340}],els:[...land({h:22,s:58,seed:13,sun:[640,60],rays:true,mountains:true,trees:3,bushes:4,clearX:[640,600]}),
  {html:sunburst(620,'#fff8d0',.5),x:640,y:230,z:9,at:W(14,'powerful'),a:'grow',spin:10},
  {html:scroll(.95),x:640,y:230,z:12,at:W(14,'oneline'),a:'pop',float:4},
  PILL('1 LINE',640,398,W(14,'prayer'),28),
  {html:svg(240,340,'-120 -320 240 340',church(0,0,1,22,58)),x:230,y:640,anchor:'b',z:8,at:W(14,'church'),a:'rise'},
  CH({...MONK,armL:'pray',armR:'pray',tilt:8,faces:[F('closed','','smile')],dir:-1},830,.95,{feet:632,at:W(14,'centuries'),a:'rise'}),
  CH({...MEDI,armL:'pray',armR:'pray',tilt:8,faces:[F('closed','','smile')],dir:-1},975,.95,{feet:632,at:W(14,'centuries')+0.18,a:'rise'}),
  CH({...GIRL,armL:'pray',armR:'pray',tilt:8,faces:[F('closed','','smile')],dir:-1},1120,.92,{feet:632,at:W(14,'centuries')+0.36,a:'rise'}),
  {html:sparkle(46),x:430,y:150,z:14,at:W(14,'powerful')+0.1,a:'pop',pulse:.12},{html:sparkle(36),x:860,y:120,z:14,at:W(14,'powerful')+0.25,a:'pop',pulse:.12},{html:sparkle(40),x:870,y:330,z:14,at:W(14,'powerful')+0.4,a:'pop',pulse:.12},
]},
// ===================== PART 1: WHO IS HE =====================
{t0:W(15,'first')-0.1,trans:'whipV',els:[...land({h:172,s:42,seed:14,trees:5,cypress:true,bushes:4}),
  PILL('PART 1',640,170,W(15,'first'),40),
  TXT(['WHO IS HE?'],[W(15,'who'),W(15,'is'),W(15,'he')],150,640,350),
]},
// "The Holy Spirit is..."
{t0:W(16,'the')-0.1,trans:'whip',cam:[{at:W(16,'the'),d:1.5,z:1.08}],els:[...land({h:332,s:50,seed:15,sun:[640,300],rays:true,mountains:false,hy1:540,hy2:600,gy:665,clouds:8,trees:5,bushes:4,clearX:[640,300]}),
  DOVE(-200,330,1.1,W(16,'the'),{glow:true,a:'none',move:{at:W(16,'the'),d:1.1,x:640,y:320},float:8}),
]},
// "...not a force. Not a feeling. Not an energy."
{t0:W(16,'not')-0.1,trans:'whip',drift:0.02,els:[BG('#fff'),
  STRIP(0,3,172,41,W(16,'not')-0.1),STRIP(1,3,335,42,W(16,'not')),STRIP(2,3,45,43,W(16,'not')+0.1),
  {html:forceIcon(1.1),x:213,y:320,z:10,at:W(16,'force'),a:'pop',float:4},LBL('FORCE',213,560,W(16,'force')),
  {html:crossX(230),x:213,y:320,z:14,at:W(16,'force')+0.35,a:'stamp'},
  {html:heart(1.1),x:640,y:320,z:10,at:W(17,'feeling'),a:'pop',pulse:.04},LBL('FEELING',640,560,W(17,'feeling')),
  {html:crossX(230),x:640,y:320,z:14,at:W(17,'feeling')+0.35,a:'stamp'},
  {html:battery(1.1),x:1067,y:320,z:10,at:W(18,'energy'),a:'pop',float:4},LBL('ENERGY',1067,560,W(18,'energy')),
  {html:crossX(230),x:1067,y:320,z:14,at:W(18,'energy')+0.35,a:'stamp'},
]},
// "He is a person."
{t0:W(19,'he')-0.1,trans:'zoom',els:[...land({h:46,s:64,seed:16,sun:[640,260],rays:true,mountains:false,hy1:560,hy2:620,gy:680,clouds:8,trees:6,bushes:4,clearX:[640,380]}),
  DOVE(640,270,1.05,W(19,'he'),{glow:true,fps:3}),
  TXT(['HE IS A PERSON'],[W(19,'he'),W(19,'is'),W(19,'a'),W(19,'person')],104,640,560),
]},
// "The third person of the Trinity. Fully God, just like the Father and the Son."
{t0:W(20,'the')-0.1,trans:'whip',drift:0.025,els:[...land({h:338,s:42,seed:17,mountains:false,clouds:9,cloudBand:500,hy1:600,hy2:650,gy:690}),
  {html:line(392,175,888,175),x:640,y:175,z:6,at:W(20,'trinity'),a:'none',drawD:.5},
  {html:line(374,232,596,518),x:485,y:375,z:6,at:W(20,'trinity')+0.1,a:'none',drawD:.5},
  {html:line(906,232,684,518),x:795,y:375,z:6,at:W(20,'trinity')+0.2,a:'none',drawD:.5},
  {html:line(640,503,640,456,10,'#ffe28a'),x:640,y:479.5,z:7,at:W(21,'god'),a:'none',drawD:.4},
  {html:line(390,214,573,332,10,'#ffe28a'),x:481.5,y:273,z:7,at:W(21,'father'),a:'none',drawD:.4},
  {html:line(890,214,707,332,10,'#ffe28a'),x:798.5,y:273,z:7,at:W(21,'son'),a:'none',drawD:.4},
  {html:node(64,miniHand(.9)),x:330,y:175,z:10,at:W(20,'the')+0.05,a:'pop'},LBL('FATHER',330,276,W(20,'the')+0.05,28),
  {html:node(64,crossIcon(.95)),x:950,y:175,z:10,at:W(20,'the')+0.2,a:'pop'},LBL('SON',950,276,W(20,'the')+0.2,28),
  {html:node(64,`<g transform="translate(-6,4)">`+dove(.36).replace(/<svg[^>]*>/,'<g transform="translate(-54,-47)"><svg width="108" height="94" viewBox="-150 -130 300 260" overflow="visible">').replace(/<\/svg>$/,'</svg></g>')+`</g>`),x:640,y:575,z:10,at:W(20,'third'),a:'pop'},
  LBL('HOLY SPIRIT',640,676,W(20,'third'),28),
  {html:`<div class="pill" style="font-size:30px;background:#ffcf4d;color:#25212b">3</div>`,x:748,y:540,z:12,at:W(20,'third')+0.2,a:'stamp'},
  {html:node(72,T_TXT('GOD',34),'#ffe28a'),x:640,y:376,z:10,at:W(21,'god'),a:'pop',pulse:.02},
]},
// "The Creed calls him 'the Lord, the giver of life.'"
{t0:W(22,'the')-0.1,trans:'whip',els:[...land({h:105,s:46,seed:18,sun:[900,40],trees:4,bushes:2,mountains:true,clearX:[300,200]}),
  CH({...FATHER,holdR:P_BIBLE,faces:[F('dot','up','smile')]},290,1.55,{talk:true,p:[[0,'down','chest'],[W(22,'creed'),'hip','forward']]}),
  REF('NICENE CREED',840,170,W(22,'creed')),
  TXT(['“the Lord,','the giver of life.”'],[W(22,'the',1)-0.05,W(22,'lord'),W(22,'the',2),W(22,'giver'),W(22,'of'),W(22,'life')],66,840,300),
  ...[[500,1.5,'#ff9fb6'],[600,1.2,'#ffd84a'],[700,1.6,'#fff'],[810,1.3,'#ff9fb6'],[915,1.55,'#ffd84a'],[1020,1.2,'#fff'],[1120,1.6,'#ff9fb6'],[1215,1.3,'#ffd84a']].map(([x,s,c],i)=>({html:flower(s,c),x,y:705,anchor:'b',z:12,at:W(22,'life')+i*0.05,a:'grow',sway:3})),
]},
// "And Jesus gave him a special name. He called him the Counselor."
{t0:W(23,'and')-0.1,trans:'whip',cam:[{at:W(23,'jesus'),d:4,z:1.05,x:650}],els:[...land({h:38,s:62,seed:19,sun:[860,60],rays:true,trees:4,bushes:4,clearX:[340,200]}),
  CH({...JESUS,faces:[F('dot','','smile'),F('happy','','smile')]},330,1.6,{at:W(23,'jesus'),a:'rise',p:[[0,'out','out'],[W(23,'name'),'down','point']],fc:[[W(24,'counselor'),1]]}),
  {html:nameTag(560,160),x:870,y:330,z:10,at:W(23,'name'),a:'pop'},
  {html:svg(120,30,'0 0 120 30','<circle cx="20" cy="15" r="10" fill="#cfc4b4"/><circle cx="60" cy="15" r="10" fill="#cfc4b4"/><circle cx="100" cy="15" r="10" fill="#cfc4b4"/>'),x:870,y:330,z:11,at:W(23,'name')+0.15,a:'fade',out:W(24,'counselor')-0.05,outA:'fade'},
  {html:`<div style="font-family:Mont;font-weight:900;font-size:54px;color:${INK};white-space:nowrap">THE COUNSELOR</div>`,x:870,y:330,z:12,at:W(24,'counselor'),a:'stamp'},
  REF('JOHN 14:26',870,458,W(24,'counselor')+0.25),
  {html:sparkle(56),x:560,y:220,z:14,at:W(24,'counselor')+0.15,a:'pop',pulse:.12},{html:sparkle(44),x:1190,y:230,z:14,at:W(24,'counselor')+0.25,a:'pop',pulse:.12},
]},
// "Someone who stands by your side, helps you, and speaks up for you."
{t0:W(25,'someone')-0.1,trans:'whip',els:[...land({h:160,s:44,seed:22,trees:5,bushes:4,clearX:[640,420]}),
  CH({...GIRL,holdL:P_ROCK,holdR:'',faces:[F('dot','worried','wavy'),F('happy','','smile'),F('dot','up','grin')]},560,1.6,{p:[[0,{a:30,b:-100},{a:30,b:-100}],[W(25,'helps'),'down','down'],[W(25,'speaks'),'down','down']],fc:[[W(25,'side'),1],[W(25,'speaks'),2]]}),
  {html:`<div style="line-height:0">${svg(110,90,'-55 -45 110 90',P_ROCK.replace('translate(0,40)','translate(0,0)'))}</div>`,x:545,y:420,z:14,at:W(25,'helps'),a:'none',move:{at:W(25,'helps'),d:.8,x:820,y:170},out:W(25,'helps')+0.8,outA:'fade'},
  DOVE(1300,160,.62,W(25,'stands'),{a:'none',glow:true,move:{at:W(25,'stands'),d:.9,x:820,y:300}}),
  {html:sunburst(320,'#fff',.35),x:820,y:300,z:9,at:W(25,'side'),a:'grow',spin:10},
  {html:bubble(120,100,heartIcon(.5)),x:930,y:180,z:16,at:W(25,'speaks'),a:'pop',float:4},
  {html:sparkle(40),x:420,y:330,z:16,at:W(25,'helps'),a:'pop',pulse:.1},
]},
// "Jesus said: 'the Counselor, the Holy Spirit, whom the Father will send in my name, he will teach you all things.'"
{t0:W(26,'jesus')-0.1,trans:'whip',els:[...land({h:40,s:62,seed:23,sun:[300,40],rays:true,trees:3,bushes:4,clearX:[260,200]}),
  CH({...JESUS,faces:[F('dot','','smile')]},250,1.6,{talk:[[W(27,'the')-0.3,W(27,'things')+0.3]],p:[[0,'down','forward'],[W(27,'send'),'out','out'],[W(27,'teach'),'down','raise']]}),
  TXT(['“the Counselor, the Holy Spirit,'],[W(27,'the'),W(27,'counselor'),W(27,'the',1),W(27,'holy'),W(27,'spirit')],46,800,190),
  TXT(['whom the Father will send in my name,'],[W(27,'whom'),W(27,'the',2),W(27,'father'),W(27,'will'),W(27,'send'),W(27,'in'),W(27,'my'),W(27,'name')],40,800,262),
  TXT(['he will teach you all things.”'],[W(27,'he'),W(27,'will',1),W(27,'teach'),W(27,'you'),W(27,'all'),W(27,'things')],52,800,340,{style:'color:#fff8d8'}),
  REF('JOHN 14:26',800,430,W(27,'things')),
  DOVE(800,560,.5,W(27,'spirit'),{glow:true}),
]},
// ===================== PETER =====================
// "Now, want to see what the Holy Spirit can do to a person? Look at Saint Peter."
{t0:W(28,'now')-0.1,trans:'whipV',els:[...land({h:205,s:46,seed:24,trees:4,bushes:4,clearX:[640,500]}),
  CH({...FATHER,faces:[F('dot','up','grin')]},300,1.6,{talk:true,p:[[0,'hip','wave'],[W(28,'person'),'hip','point'],[W(29,'look'),'hip','point']]}),
  {html:spotlight(),x:850,y:390,z:6,at:W(28,'person'),a:'fade',d:.4},
  CH({...PETER,faces:[F('dot','','smile')]},850,1.5,{feet:665,at:W(29,'peter'),a:'drop'}),
  PILL('SAINT PETER',850,170,W(29,'peter'),34),
]},
// "On the night before Jesus died, Peter was so scared that he denied even knowing Jesus. Three times. The first time, to a servant girl."
{t0:W(30,'on')-0.1,trans:'whip',cam:[{at:W(30,'scared'),d:1.5,z:1.08,x:600}],els:[...courtyard(),
  {html:stars(1200,200,10),x:640,y:110,z:2,at:W(30,'night'),a:'fade',d:.8,depth:.2},
  {html:campfire(1.1),x:430,y:560,z:8,at:W(30,'night'),a:'grow'},
  CH({...PETER,faces:[F('dot','','flat'),F('wide','worried','wavy'),F('wide','worried','scream')]},640,1.55,{p:[[0,'forward','forward'],[W(30,'denied'),{a:60,b:60},{a:60,b:60}],[W(32,'girl'),'raise','raise']],fc:[[W(30,'scared'),1],[W(32,'girl'),2]],front:sweat(56,-206,1.2)}),
  {html:bubble(130,104,crossX(70)),x:520,y:200,z:16,at:W(30,'denied'),a:'pop',out:W(31,'three')-0.05},
  {html:`<div class="tt" style="font-size:110px">×3</div>`,x:1010,y:150,z:17,at:W(31,'three'),a:'stamp'},
  CH({...SERVANT,faces:[F('dot','angry','o')],dir:-1},1010,1.35,{at:W(32,'servant'),a:'rise',talk:[[W(32,'servant'),W(32,'girl')+0.6]],p:[[0,'down','point']]}),
  {html:svg(60,60,'0 0 60 60',`<text x="30" y="50" text-anchor="middle" font-family="Mont" font-weight="900" font-size="54" fill="#fff" stroke="${INK}" stroke-width="6" paint-order="stroke">!</text>`),x:880,y:250,z:17,at:W(32,'girl'),a:'stamp'},
]},
// "Fifty days after Easter, the apostles were gathered together."
{t0:W(33,'fifty')-0.1,trans:'whip',els:[...land({h:45,s:66,seed:25,sun:[640,120],rays:true,mountains:false,hy1:540,hy2:600,gy:665,trees:4,bushes:4,clearX:[640,300]}),
  {html:calendarCard(),x:640,y:330,z:12,at:W(33,'fifty'),a:'pop',tick:(t,e)=>{const v=Math.max(1,Math.round(50*eOut(clamp((t-W(33,'fifty'))/0.9))));if(e._v!==v){e._v=v;e.inn.querySelector('.num').textContent=v;}}},
  TXT(['DAYS AFTER EASTER'],[W(33,'days')],56,640,555),
]},
{t0:W(33,'apostles')-0.15,trans:'whip',cam:[{at:W(34,'suddenly'),d:.15,x:648},{at:W(34,'suddenly')+0.15,d:.15,x:632},{at:W(34,'suddenly')+0.3,d:.2,x:640}],els:[...interior(38,55,1800,640),
  ...[[APOS[0],230,1.15],[APOS[1],395,1.2],[MARY,560,1.15],[PETER,725,1.25],[APOS[2],890,1.2],[APOS[3],1055,1.15]].map(([o,x,k],i)=>CH({...o,faces:[F('dot','','smile'),F('wide','up','o')],dir:i<3?1:-1},x,k,{feet:640,at:W(33,'apostles')+i*0.07,a:'rise',fc:[[W(34,'suddenly')+i*0.04,1]],p:[[W(34,'suddenly')+i*0.04,'shrug','shrug',i%2?6:-6]]})),
  ACTSTAG('Acts 2',W(34,'acts')),
  {html:wind(1100,150),x:640,y:290,z:18,at:W(34,'sound'),a:'wipe',d:.6,move:{at:W(34,'sound'),d:3,x:760,ease:'lin'}},
  TXT(['“like the rush of a mighty wind”'],[W(34,'like'),W(34,'the',1),W(34,'rush'),W(34,'of',1),W(34,'a',1),W(34,'mighty'),W(34,'wind')],58,640,140),
  REF('ACTS 2:2',640,215,W(34,'wind')),
]},
// "Tongues as of fire rested on each of them. 'And they were all filled with the Holy Spirit.'"
{t0:W(35,'tongues')-0.1,trans:'whip',cam:[{at:W(36,'filled'),d:2,z:1.06}],els:[...interior(38,55,1800,640),
  {html:sunburst(1100,'#fff6c8',.38),x:640,y:300,z:3,at:W(36,'filled'),a:'grow',spin:6},
  ...[[APOS[0],230,1.15],[APOS[1],395,1.2],[MARY,560,1.15],[PETER,725,1.25],[APOS[2],890,1.2],[APOS[3],1055,1.15]].flatMap(([o,x,k],i)=>[
    CH({...o,faces:[F('wide','up','o'),F('happy','','grin')],dir:i<3?1:-1},x,k,{feet:640,fc:[[W(36,'filled')+i*0.05,1]],p:[[W(36,'filled')+i*0.05,'raise','raise']]}),
    {html:svg(70,90,'-35 -60 70 90',flameSVG(0,0,1)),x,y:640-k*262,z:16,at:(i<3?W(35,'fire'):W(35,'rested'))+i*0.1,a:'drop',pulse:.06}]),
  TXT(['“And they were all filled with the Holy Spirit.”'],[W(36,'and'),W(36,'they'),W(36,'were'),W(36,'all'),W(36,'filled'),W(36,'with'),W(36,'the'),W(36,'holy'),W(36,'spirit')],46,640,110),
  REF('ACTS 2:4',640,170,W(36,'spirit')),
]},
// "That day is called Pentecost."
{t0:W(37,'that')-0.1,trans:'zoom',els:[...land({h:8,s:62,seed:26,sun:[640,300],rays:true,mountains:false,hy1:560,hy2:620,gy:680,clouds:7,trees:6,bushes:4,clearX:[640,400]}),
  {html:svg(170,220,'-85 -110 170 220',flameSVG(0,40,2.6)),x:640,y:190,z:10,at:W(37,'day'),a:'grow',pulse:.05},
  TXT(['PENTECOST'],[W(37,'pentecost')],150,640,420),
  DOVE(1080,170,.45,W(37,'called'),{glow:true}),DOVE(200,180,.4,W(37,'called')+0.2,{glow:true,dir:-1}),
]},
// "And watch what happens to Peter."
{t0:W(38,'and')-0.1,trans:'whip',cam:[{at:W(38,'peter'),d:1.5,z:1.1,y:330}],els:[...room(30,50,{windows:[260,1020]}),
  CH({...PETER,faces:[F('dot','bold','smile')],front:flameSVG(0,-252,1)},640,1.75,{feet:660,p:[[0,'hip','hip'],[W(38,'peter'),'hip','raise']]}),
  {html:sparkle(46),x:470,y:220,z:16,at:W(38,'peter'),a:'pop',pulse:.12},{html:sparkle(36),x:820,y:200,z:16,at:W(38,'peter')+0.15,a:'pop',pulse:.12},
]},
// "The same man who was too scared to admit he knew Jesus walks out into the street and preaches to a huge crowd. In public. With total courage."
{t0:W(39,'the')-0.1,trans:'whip',cam:[{at:W(40,'public'),d:1.2,z:.92,y:380},{at:W(41,'courage'),d:1,z:1.02,x:560}],els:[...land({h:28,s:55,seed:27,city:{x0:-300,x1:1600,type:'ancient',temple:900},mountains:false,hy1:470,hy2:560,gy:640,trees:2,clearX:[500,300]}),
  {html:`<div style="width:240px;height:210px;border-radius:50%;background:#fff;border:5px solid ${CI};overflow:hidden;position:relative">${'<div style="position:absolute;left:8px;top:-34px">'+chibi({...PETER,eyes:'wide',brows:'worried',mouth:'scream',armL:'forward',armR:'forward',k:.75})+'</div>'}</div>`,x:880,y:200,z:16,at:W(39,'scared'),a:'pop',out:W(39,'walks')-0.1},
  {html:svg(60,60,'-30 -30 60 60','<circle cx="0" cy="0" r="12" fill="#fff" stroke="'+CI+'" stroke-width="4"/>'),x:760,y:330,z:16,at:W(39,'scared')+0.05,a:'pop',out:W(39,'walks')-0.1},
  {html:sunburst(700,'#fff',.3),x:430,y:350,z:5,at:W(41,'courage'),a:'grow',spin:8},
  CH({...PETER,faces:[F('dot','bold','smile'),F('dot','bold','shout')],front:flameSVG(0,-252,1)},170,1.5,{feet:620,move:{at:W(39,'walks'),d:1.3,x:430,ease:'lin'},walk:7,walkUntil:W(39,'walks')+1.3,fc:[[W(39,'preaches'),1]],talk:[[W(39,'preaches'),W(41,'courage')+0.6]],p:[[W(39,'preaches'),'raise','out']]}),
  ...[0,1,2,3,4,5].map(i=>({html:crowdChibi(i,'happy','down'),x:700+i*95,y:663,anchor:'b',s:.78,z:12,at:W(39,'huge')+i*0.06,a:'rise'})),
  ...[0,1,2,3,4,5,6].map(i=>({html:crowdChibi(i+2,'happy','up'),x:655+i*87,y:727,anchor:'b',s:.9,z:14,at:W(39,'crowd')+i*0.05,a:'rise'})),
  {html:sparkle(50),x:330,y:170,z:16,at:W(41,'courage')+0.1,a:'pop',pulse:.12},{html:sparkle(40),x:560,y:200,z:16,at:W(41,'courage')+0.25,a:'pop',pulse:.12},
]},
// "And the Bible says about three thousand people were baptized that day."
{t0:W(42,'and')-0.1,trans:'whipV',els:[...land({h:196,s:50,seed:28,mountains:false,hy1:560,hy2:620,gy:680,clouds:8,trees:4,clearX:[640,600]}),
  COUNT(640,170,140,0,3000,W(42,'three'),1.2,v=>(v>=1000?Math.floor(v/1000)+','+String(v%1000).padStart(3,'0'):String(v))),
  PILL('ABOUT',640,70,W(42,'about'),30),
  {html:bible(.42),x:170,y:130,z:16,at:W(42,'bible'),a:'pop',float:4},
  REF('ACTS 2:41',640,265,W(42,'baptized')),
  {html:waterDrops(),x:640,y:330,z:15,at:W(42,'baptized'),a:'drop'},
  ...[...Array(24)].map((_,i)=>{const row=Math.floor(i/8),col=i%8;return {html:crowdChibi(i,'happy',row===2?'up':'down'),x:150+col*140+(row%2)*60,y:520+row*90,anchor:'b',s:.55+row*.08,z:10+row,at:W(42,'people')+((col*3+row)%10)*0.06,a:'rise'};}),
]},
// "Same Peter. Different power. That is the Holy Spirit."
{t0:W(43,'same')-0.1,trans:'whip',els:[BG('#fff'),STRIP(0,2,345,51,W(43,'same')-0.1),STRIP(1,2,44,52,W(43,'same')),
  CH({...PETER,faces:[F('wide','worried','wavy')],front:sweat(56,-206,1.2)},320,1.6,{feet:600,at:W(43,'same'),a:'rise',p:[[0,'forward','forward']]}),
  LBL('SAME PETER',320,650,W(43,'peter'),34),
  {html:sunburst(560,'#fff',.35),x:960,y:330,z:5,at:W(44,'power'),a:'grow',spin:10},
  CH({...PETER,faces:[F('dot','bold','shout')],front:flameSVG(0,-252,1)},960,1.6,{feet:600,at:W(44,'different'),a:'rise',p:[[0,'raise','out']],talk:true}),
  LBL('DIFFERENT POWER',960,650,W(44,'power'),34),
  DOVE(640,140,.6,W(45,'holy'),{glow:true,z:20}),
]},
// ===================== THE SPIRIT GIVEN TO YOU =====================
// "And here is the thing. That same Spirit was given to you."
{t0:W(46,'and')-0.1,trans:'whip',cam:[{at:W(47,'given'),d:1.2,z:1.12,y:330}],els:[...land({h:150,s:42,seed:29,trees:5,bushes:4,clearX:[640,300]}),
  CH({...FATHER,faces:[F('dot','up','smile'),F('dot','bold','grin')]},640,1.9,{talk:true,p:[[W(46,'here'),'hip','raise'],[W(47,'you'),'hip','forward']],fc:[[W(47,'you'),1]]}),
  DOVE(1100,140,.5,W(47,'spirit'),{glow:true,a:'none',move:{at:W(47,'spirit'),d:1.4,x:900,y:240,s:1.8}}),
]},
// "At Baptism, and in a special way at Confirmation."
{t0:W(48,'at')-0.1,trans:'whip',els:[...interior(205,45,1800,640),
  {html:font(1),x:640,y:560,z:9,at:W(48,'baptism'),a:'rise'},
  CH({...FATHER,holdR:P_SHELL,faces:[F('happy','','smile')]},450,1.45,{feet:640,p:[[0,'down',{a:115,b:-25}]]}),
  CH({...MOM,faces:[F('happy','','smile')],dir:-1},860,1.35,{feet:640,p:[[0,'forward','forward']]}),
  {html:svg(120,80,'-60 -40 120 80',`<ellipse cx="0" cy="0" rx="52" ry="26" fill="#fff" stroke="${CI}" stroke-width="4"/><circle cx="-34" cy="-4" r="22" fill="${SKIN}" stroke="${CI}" stroke-width="4"/><path d="M-40,-6 Q-34,0 -28,-6" stroke="${CI}" stroke-width="3" fill="none"/>`),x:760,y:470,z:13},
  {html:waterDrops(),x:640,y:420,z:15,at:W(48,'baptism')+0.2,a:'drop',float:6},
  PILL('BAPTISM',640,120,W(48,'baptism'),40),
]},
{t0:W(48,'confirmation')-0.12,trans:'whip',els:[...interior(10,48,1800,640),
  DOVE(640,140,.55,W(48,'confirmation'),{glow:true}),
  CH({...BISHOP,faces:[F('happy','','smile')]},470,1.5,{feet:640,p:[[0,'down',{a:84,b:-14}]]}),
  CH({...TEEN,faces:[F('closed','','smile')],dir:-1},800,1.35,{feet:640,p:[[0,'pray','pray',-6]]}),
  PILL('CONFIRMATION',640,90,W(48,'confirmation'),40),
]},
// "Saint Paul says it like this: 'Do you not know that your body is a temple of the Holy Spirit within you?'"
{t0:W(49,'saint')-0.1,trans:'whip',els:[...room(30,48,{windows:[250]}),
  {html:desk(1.2),x:820,y:560,z:11},
  {html:quillPaper(.9),x:820,y:470,z:12,tick:(t,e)=>{}},
  CH({...PAUL,holdR:P_QUILL,faces:[F('dot','','smile'),F('happy','','smile')]},560,1.5,{feet:640,p:[[0,'down',{a:70,b:-60}]],fc:[[W(49,'this'),1]]}),
  ACTSTAG('Saint Paul',W(49,'paul')),
]},
{t0:W(50,'do')-0.1,trans:'whip',cam:[{at:W(50,'temple'),d:1.5,z:1.05}],els:[...land({h:205,s:46,seed:30,sun:[640,330],rays:true,mountains:false,hy1:560,hy2:620,gy:680,trees:4,bushes:4,clearX:[640,350]}),
  TXT(['“Do you not know that your body','is a temple of the Holy Spirit within you?”'],[W(50,'do'),W(50,'you'),W(50,'not'),W(50,'know'),W(50,'that'),W(50,'your'),W(50,'body'),W(50,'is'),W(50,'a'),W(50,'temple'),W(50,'of'),W(50,'the'),W(50,'holy'),W(50,'spirit'),W(50,'within'),W(50,'you',1)],44,640,95),
  REF('1 CORINTHIANS 6:19',640,170,W(50,'you',1)),
  {html:templeOutline(.95),x:640,y:440,z:8,at:W(50,'temple'),a:'none',drawD:1},
  CH({...TEEN,faces:[F('dot','up','smile'),F('wide','up','o')]},640,1.3,{feet:635,fc:[[W(50,'temple'),1]],p:[[W(50,'body'),'out','out']]}),
]},
// "A temple. God lives in you. Not just near you. In you."
{t0:W(51,'a')-0.1,trans:'zoom',els:[...land({h:45,s:64,seed:31,sun:[640,300],rays:true,mountains:false,hy1:560,hy2:620,gy:680,trees:4,bushes:4,clearX:[640,350]}),
  {html:templeOutline(.95),x:640,y:440,z:8},
  {html:sunburst(520,'#fff',.4),x:640,y:440,z:7,at:W(51,'temple'),a:'grow',spin:8},
  CH({...TEEN,faces:[F('happy','','smile'),F('dot','up','smile')]},640,1.3,{feet:635,p:[[0,'out','out'],[W(53,'near'),'down','down'],[W(54,'in'),'chest','chest']],fc:[[W(53,'near'),1],[W(54,'in'),0]]}),
  {html:heartIcon(.45,'#ffd84a'),x:640,y:578,z:14,at:W(52,'lives'),a:'grow',pulse:.08},
  DOVE(880,330,.45,W(53,'near'),{glow:true,a:'pop',move:{at:W(54,'in'),d:.6,x:640,y:570,s:.4},out:W(54,'you')+0.5,outA:'fade'}),
  PILL('NEAR',880,230,W(53,'near'),28,{out:W(54,'in')}),
  PILL('IN',640,250,W(54,'in'),40),
]},
// ===================== PART 2: WHAT DOES HE DO =====================
{t0:W(55,'so')-0.1,trans:'whipV',els:[...land({h:120,s:42,seed:32,trees:5,cypress:true,bushes:4}),
  PILL('PART 2',640,130,W(55,'so'),40),
  TXT(['WHAT DOES HE','ACTUALLY DO?'],[W(55,'what'),W(55,'does'),W(55,'he'),W(55,'actually'),W(55,'do')],104,640,330),
]},
{t0:W(56,'the')-0.1,trans:'whip',drift:0.02,els:[BG('#fff'),STRIP(0,2,215,61,W(56,'the')-0.1),STRIP(1,2,110,62,W(56,'the')),
  {html:`<div style="background:#fff;border:5px solid ${CI};border-radius:50%;width:150px;height:150px;overflow:hidden;line-height:0">${svg(150,150,'-75 -150 150 150',church(0,-8,.42,30,40))}</div>`,x:640,y:130,z:20,at:W(56,'church'),a:'drop'},
  PILL('2',640,330,W(56,'two'),48,{style:''}),
  {html:giftBox('#ffcf4d',1.3),x:320,y:390,z:10,at:W(57,'gifts'),a:'pop',float:5},LBL('GIFTS',320,600,W(57,'gifts'),44),
  {html:basket(1.1),x:960,y:400,z:10,at:W(57,'fruits'),a:'pop',float:5},LBL('FRUITS',960,600,W(57,'fruits'),44),
]},
// "First, the gifts. The Catechism lists seven gifts of the Holy Spirit."
{t0:W(58,'first')-0.1,trans:'whip',els:[...land({h:215,s:48,seed:33,trees:4,bushes:4,clearX:[640,400]}),
  {html:giftBox('#ffcf4d',1.5),x:300,y:420,z:10,at:W(58,'gifts'),a:'pop',float:4},
  {html:sunburst(400,'#fff',.4),x:300,y:400,z:8,at:W(58,'gifts'),a:'grow',spin:10},
  {html:bookCCC(.95,'CCC 1831'),x:1000,y:360,z:10,at:W(59,'catechism'),a:'drop'},
  {html:`<div class="tt" style="font-size:150px;color:#ffe28a">7</div>`,x:650,y:220,z:20,at:W(59,'seven'),a:'stamp'},
  TXT(['GIFTS'],[W(59,'gifts')],60,650,340),
]},
// "Think of them like tools he puts in your hands."
{t0:W(60,'think')-0.1,trans:'whip',els:[...room(200,40,{windows:[300,980]}),
  CH({...TEEN,faces:[F('dot','up','o'),F('happy','','grin')]},640,1.55,{feet:640,p:[[0,'down','down'],[W(60,'hands'),'forward','forward']],fc:[[W(60,'hands'),1]]}),
  {html:toolbox(true,.72),x:640,y:585,z:14,at:W(60,'tools'),a:'drop'},
  {html:sparkle(44),x:470,y:300,z:16,at:W(60,'hands'),a:'pop',pulse:.1},{html:sparkle(36),x:820,y:280,z:16,at:W(60,'hands')+0.12,a:'pop',pulse:.1},
]},
// --- the seven gifts ---
{t0:W(61,'wisdom')-0.1,trans:'whip',els:[...land({h:200,s:48,seed:34,trees:4,bushes:4,clearX:[640,500]}),...giftRow(0,W(61,'wisdom')),
  TXT(['WISDOM'],[W(61,'wisdom')],84,640,100),
  CH({...TEEN,faces:[F('dot','up','smile'),F('happy','','smile')]},470,1.3,{feet:560,p:[[0,'down','forward']],fc:[[W(61,'god'),1]]}),
  {html:globe(1.3),x:800,y:330,z:11,at:W(61,'see'),a:'pop',spin:8},
  {html:sunburst(380,'#fff',.35),x:800,y:330,z:9,at:W(61,'god'),a:'grow',spin:10},
]},
{t0:W(62,'understanding')-0.1,trans:'whip',els:[...land({h:48,s:62,seed:35,trees:4,bushes:4,clearX:[640,500]}),...giftRow(1,W(62,'understanding')),
  TXT(['UNDERSTANDING'],[W(62,'understanding')],84,640,100),
  CH({...GIRL,holdR:P_BIBLE,faces:[F('dot','','smile'),F('wide','up','grin')]},560,1.3,{feet:560,p:[[0,'down','chest']],fc:[[W(62,'grasp'),1]]}),
  {html:bulb(1),x:780,y:250,z:12,at:W(62,'grasp'),a:'stamp',pulse:.05},
]},
{t0:W(63,'counsel')-0.1,trans:'whip',els:[...land({h:150,s:44,seed:36,trees:4,bushes:4,clearX:[640,500]}),...giftRow(2,W(63,'counsel')),
  TXT(['COUNSEL'],[W(63,'counsel')],84,640,100),
  {html:signpost(1),x:820,y:420,z:9,at:W(63,'counsel'),a:'rise'},
  CH({...TEEN3,faces:[F('side','think','flat'),F('happy','','grin')]},500,1.3,{feet:560,p:[[0,'down','chin'],[W(63,'good'),'down','point']],fc:[[W(63,'good'),1]]}),
  {html:check(70),x:930,y:320,z:14,at:W(63,'decisions'),a:'stamp'},
]},
{t0:W(64,'fortitude')-0.1,trans:'whip',els:[...land({h:20,s:58,seed:37,trees:4,bushes:4,clearX:[640,500]}),...giftRow(3,W(64,'fortitude')),
  TXT(['FORTITUDE'],[W(64,'fortitude')],84,640,100),
  {html:wind(440,200),x:1020,y:380,z:13,at:W(64,'fortitude'),a:'wipe',d:.6,move:{at:W(64,'fortitude'),d:4,x:990,ease:'lin'}},
  CH({...GIRL,faces:[F('dot','worried','wavy'),F('dot','bold','grin')]},560,1.35,{feet:560,p:[[0,'forward','forward'],[W(64,'courage'),'hip','raise']],fc:[[W(64,'courage'),1]]}),
  {html:shield(1),x:690,y:420,z:14,at:W(64,'courage'),a:'stamp'},
]},
{t0:W(65,'knowledge')-0.1,trans:'whip',els:[...land({h:120,s:50,seed:38,trees:4,bushes:4,sun:[1000,60],clearX:[640,500]}),...giftRow(4,W(65,'knowledge')),
  TXT(['KNOWLEDGE'],[W(65,'knowledge')],84,640,100),
  CH({...TEEN,holdR:'',faces:[F('dot','up','o'),F('happy','','smile')]},460,1.3,{feet:560,p:[[0,'down','forward']],fc:[[W(65,'creation'),1]]}),
  {html:flower(2.4,'#ff9fb6'),x:800,y:560,anchor:'b',z:10,at:W(65,'know'),a:'grow',sway:3},
  {html:magnifier(1),x:760,y:380,z:13,at:W(65,'god'),a:'pop',float:5},
  {html:sparkle(40),x:930,y:220,z:14,at:W(65,'creation'),a:'pop',pulse:.1},{html:sparkle(30),x:1010,y:330,z:14,at:W(65,'creation')+0.15,a:'pop',pulse:.1},
]},
{t0:W(66,'piety')-0.1,trans:'whip',els:[...land({h:340,s:44,seed:39,trees:4,bushes:4,clearX:[640,500]}),...giftRow(5,W(66,'piety')),
  TXT(['PIETY'],[W(66,'piety')],84,640,100),
  CH({...DAD,faces:[F('happy','','smile')],dir:-1},720,1.45,{feet:560,p:[[0,'forward','forward']]}),
  CH({...KID,faces:[F('happy','','grin')]},560,.95,{feet:560,at:W(66,'child'),a:'rise',p:[[0,'raise','raise']]}),
  {html:heartIcon(.7),x:640,y:220,z:14,at:W(66,'loves'),a:'stamp',pulse:.06},
  {html:svg(140,140,'-70 -70 140 140',`<path d="M-30,30 C-40,-10 -10,-40 0,-50 C10,-40 40,-10 30,30Z" fill="#fff" opacity=".0"/>`),x:440,y:240,z:1,at:W(66,'love')},
]},
{t0:W(67,'and')-0.1,trans:'whip',cam:[{at:W(68,'amazed'),d:1.5,z:1.06}],els:[...land({h:225,s:52,seed:40,sun:[640,140],rays:true,mountains:true,trees:4,bushes:4,clearX:[640,500]}),...giftRow(6,W(67,'fear')),
  TXT(['FEAR OF THE LORD'],[W(67,'fear')],76,640,100),
  {html:stars(900,200,12),x:640,y:250,z:4,at:W(67,'lord'),a:'fade'},
  CH({...TEEN3,faces:[F('dot','up','smile'),F('wide','worried','scream'),F('wide','up','o'),F('happy','','smile')]},640,1.35,{feet:560,fc:[[W(68,'scared'),1],[W(68,'amazed'),2],[W(68,'never'),3]],p:[[W(68,'scared'),'forward','forward'],[W(68,'amazed'),'raise','raise'],[W(68,'never'),'chest','chest']]}),
  {html:crossBadge(),x:800,y:250,z:16,at:W(68,'scared'),a:'stamp',out:W(68,'but')},
  {html:sunburst(560,'#fff',.4),x:640,y:330,z:5,at:W(68,'amazed'),a:'grow',spin:8},
  {html:sparkle(50),x:460,y:220,z:16,at:W(68,'amazed'),a:'pop',pulse:.1},{html:sparkle(40),x:820,y:210,z:16,at:W(68,'amazed')+0.12,a:'pop',pulse:.1},
  {html:heartIcon(.6),x:640,y:420,z:15,at:W(68,'lose'),a:'pop',pulse:.06},
]},
// "Those are the gifts."
{t0:W(69,'those')-0.1,trans:'whipV',els:[...land({h:215,s:48,seed:33,trees:4,bushes:4,clearX:[640,600]}),
  ...GIFTS.map(([n,ic],i)=>({html:`<div style="display:flex;flex-direction:column;align-items:center;gap:10px"><div style="width:130px;height:130px;border-radius:50%;background:#fff;border:5px solid ${CI};display:flex;align-items:center;justify-content:center">${ic()}</div><div class="lbl" style="font-size:${n.length>12?15:19}px;transform:none">${n}</div></div>`,x:160+i*160,y:350,z:12,at:W(69,'those')+i*0.06,a:'pop',float:3})),
  TXT(['7 GIFTS'],[W(69,'gifts')],84,640,130),
]},
// ===================== FRUITS =====================
// "Then there are the fruits. Fruits are what grow in your life when you let the Spirit work."
{t0:W(70,'then')-0.1,trans:'whip',els:[...land({h:105,s:48,seed:42,trees:3,bushes:4,sun:[1000,60],clearX:[700,450]}),
  {html:basket(1),x:640,y:300,z:12,at:W(70,'fruits'),a:'pop',out:W(71,'fruits')-0.05},
  {html:tree2(1),x:820,y:640,anchor:'b',z:8,at:W(71,'grow'),a:'grow',d:.8},
  CH({...GIRL,faces:[F('dot','up','smile'),F('happy','','grin')]},430,1.45,{feet:640,at:W(71,'fruits'),a:'rise',p:[[W(71,'grow'),'down','point']],fc:[[W(71,'work'),1]]}),
  ...[[740,250,'apple'],[880,200,'orange'],[960,330,'pear'],[700,380,'plum'],[860,420,'cherry'],[1010,220,'peach']].map(([x,y,k],i)=>({html:fruitIcon(k,.9),x,y,z:10,at:W(71,'life')+i*0.12,a:'pop',float:3})),
  DOVE(1200,140,.45,W(71,'spirit'),{glow:true,a:'none',move:{at:W(71,'spirit'),d:.8,x:930,y:130}}),
]},
// "The Church's tradition lists twelve. Charity, joy, peace, patience, kindness, goodness, generosity, gentleness, faithfulness, modesty, self-control, chastity."
{t0:W(72,'the')-0.1,trans:'whip',drift:0,els:[...land({h:110,s:50,seed:43,mountains:false,hy1:560,hy2:620,gy:680,clouds:8}),
  TXT(['12 FRUITS'],[W(72,'twelve')],76,640,82),
  REF('CCC 1832',640,140,W(72,'tradition')),
  ...[['CHARITY','apple'],['JOY','orange'],['PEACE','pear'],['PATIENCE','grape'],['KINDNESS','cherry'],['GOODNESS','lemon'],['GENEROSITY','plum'],['GENTLENESS','peach'],['FAITHFULNESS','straw'],['MODESTY','pom'],['SELF-CONTROL','fig'],['CHASTITY','olive']].map(([n,k],i)=>{const words=['charity','joy','peace','patience','kindness','goodness','generosity','gentleness','faithfulness','modesty','selfcontrol','chastity'];const col=i%4,row=Math.floor(i/4);
    return {html:`<div style="display:flex;align-items:center;gap:10px;width:276px;height:104px;background:rgba(255,255,255,.9);border:5px solid ${CI};border-radius:20px;padding:0 12px;box-sizing:border-box">${fruitIcon(k,.95)}<span style="font-family:Mont;font-weight:900;font-size:${n.length<=6?26:n.length<=8?23:n.length<=10?20:18}px;color:${CI};white-space:nowrap;line-height:1">${n}</span></div>`,x:200+col*293,y:240+row*130,z:12,at:W(73,words[i]),a:'pop'};}),
]},
// "Here is a simple test. When you see more of those in your life, the Holy Spirit is working."
{t0:W(74,'here')-0.1,trans:'whip',els:[...land({h:150,s:46,seed:44,trees:3,bushes:4,clearX:[700,500]}),
  {html:`<div style="line-height:0">${pv(220,280,`<rect x="-90" y="-110" width="180" height="230" rx="14" fill="#c98a52" ${SW}/><rect x="-74" y="-90" width="148" height="196" rx="6" fill="#fff" ${SW}/><rect x="-36" y="-124" width="72" height="30" rx="8" fill="#9aa0b0" ${SW}/>${[0,1,2].map(i=>`<rect x="-56" y="${-60+i*52}" width="26" height="26" rx="4" fill="none" stroke="${CI}" stroke-width="4"/><path d="M-18,${-47+i*52} H54" stroke="#c9bfb2" stroke-width="7" stroke-linecap="round"/>`).join('')}`,'-110 -140 220 280')}</div>`,x:230,y:330,z:10,at:W(74,'test'),a:'drop'},
  ...BAR(560,160,W(75,'more'),'JOY'),...BAR(740,230,W(75,'more')+0.15,'PEACE'),...BAR(920,300,W(75,'more')+0.3,'PATIENCE'),
  {html:svg(180,120,'-90 -60 180 120',`<path d="M-70,40 L60,-30" stroke="${CI}" stroke-width="22" stroke-linecap="round"/><path d="M-70,40 L60,-30" stroke="#fff" stroke-width="12" stroke-linecap="round"/><path d="M30,-50 L76,-38 L52,4" fill="#fff" stroke="${CI}" stroke-width="5" stroke-linejoin="round"/>`),x:1090,y:230,z:13,at:W(75,'life'),a:'pop'},
  DOVE(1110,110,.45,W(75,'working'),{glow:true}),
]},
// "Just like you can tell a tree by its fruit."
{t0:W(76,'just')-0.1,trans:'whip',els:[...land({h:95,s:48,seed:45,trees:2,bushes:4,sun:[300,60],clearX:[700,450]}),
  {html:tree2(1.05),x:800,y:640,anchor:'b',z:8,at:W(76,'tree'),a:'grow',d:.6},
  ...[[700,230,'apple'],[830,170,'apple'],[920,270,'apple'],[690,360,'apple'],[960,380,'apple']].map(([x,y,k],i)=>({html:fruitIcon(k,.85),x,y,z:10,at:W(76,'tree')+0.3+i*0.06,a:'pop'})),
  {html:fruitIcon('apple',.9),x:830,y:330,z:12,at:W(76,'fruit'),a:'pop',move:{at:W(76,'fruit')+0.2,d:.5,x:520,y:470}},
  CH({...TEEN,faces:[F('dot','up','o'),F('happy','','grin')]},470,1.4,{feet:640,p:[[W(76,'fruit'),'forward','forward']],fc:[[W(76,'fruit')+0.6,1]]}),
]},
// ===================== PRAYER =====================
// "And one more thing he does, maybe the most comforting of all. He helps you pray."
{t0:W(77,'and')-0.1,trans:'whipV',els:[...room(340,40,{windows:[260,1020],curtain:200}),
  PILL('ONE MORE THING',640,90,W(77,'one'),34),
  {html:heartIcon(.9),x:880,y:280,z:12,at:W(77,'comforting'),a:'pop',pulse:.06},
  CH({...GIRL,faces:[F('dot','','smile'),F('closed','','smile')]},560,1.5,{feet:640,p:[[W(78,'pray'),'pray','pray',8]],fc:[[W(78,'pray'),1]]}),
  DOVE(820,250,.5,W(78,'pray'),{glow:true}),
]},
// "Ever felt like you don't know what to say to God?"
{t0:W(79,'ever')-0.1,trans:'whip',els:[...room(260,36,{windows:[300,980]}),
  CH({...TEEN,faces:[F('closed','','flat'),F('dot','worried','wavy')]},560,1.5,{feet:640,p:[[0,'pray','pray',6],[W(79,'know'),'shrug','shrug',-6]],fc:[[W(79,'know'),1]]}),
  {html:bubble(170,120,svg(120,30,'0 0 120 30','<circle cx="20" cy="15" r="10" fill="#cfc4b4"/><circle cx="60" cy="15" r="10" fill="#cfc4b4"/><circle cx="100" cy="15" r="10" fill="#cfc4b4"/>')),x:820,y:200,z:16,at:W(79,'say'),a:'pop',float:4},
  Q(960,330,70,W(79,'god')),Q(380,250,60,W(79,'god')+0.12),
]},
// "Saint Paul gets it. He wrote:"
{t0:W(80,'saint')-0.1,trans:'whip',els:[...room(30,48,{windows:[250]}),
  {html:desk(1.2),x:820,y:560,z:11},{html:quillPaper(.9),x:820,y:470,z:12},
  CH({...PAUL,holdR:P_QUILL,faces:[F('happy','','smile'),F('dot','','smile')]},560,1.5,{feet:640,p:[[0,'down','raise'],[W(81,'wrote'),'down',{a:70,b:-60}]],fc:[[W(81,'wrote'),1]]}),
  {html:check(60),x:430,y:220,z:14,at:W(80,'gets'),a:'stamp'},
]},
// Romans 8:26
{t0:W(82,'the')-0.1,trans:'whip',els:[...land({h:250,s:40,seed:46,sun:[640,240],rays:true,mountains:false,hy1:560,hy2:620,gy:680,trees:4,bushes:4,clearX:[640,300]}),
  TXT(['“The Spirit helps us in our weakness;'],[W(82,'the'),W(82,'spirit'),W(82,'helps'),W(82,'us'),W(82,'in'),W(82,'our'),W(82,'weakness')],46,640,95,{out:W(82,'but')-0.1,outA:'fade'}),
  TXT(['for we do not know how to pray as we ought,'],[W(82,'for'),W(82,'we'),W(82,'do'),W(82,'not'),W(82,'know'),W(82,'how'),W(82,'to'),W(82,'pray'),W(82,'as'),W(82,'we',1),W(82,'ought')],40,640,160,{out:W(82,'but')-0.1,outA:'fade'}),
  TXT(['but the Spirit himself intercedes for us'],[W(82,'but'),W(82,'the',1),W(82,'spirit',1),W(82,'himself'),W(82,'intercedes'),W(82,'for',1),W(82,'us',1)],44,640,95),
  TXT(['with sighs too deep for words.”'],[W(82,'with'),W(82,'sighs'),W(82,'too'),W(82,'deep'),W(82,'for',2),W(82,'words')],48,640,160,{style:'color:#fff8d8'}),
  REF('ROMANS 8:26',640,225,W(82,'weakness')),
  CH({...GIRL,faces:[F('dot','worried','wavy'),F('closed','','smile')]},640,1.4,{feet:640,p:[[0,'pray','pray',6]],fc:[[W(82,'intercedes'),1]]}),
  DOVE(820,320,.5,W(82,'intercedes'),{glow:true}),
  {html:swirls(),x:760,y:420,z:9,at:W(82,'sighs'),a:'fade',float:8},
]},
// "So even when you have no words, he is praying in you."
{t0:W(83,'so')-0.1,trans:'whip',els:[...room(250,36,{windows:[640]}),
  CH({...TEEN,faces:[F('closed','','flat'),F('closed','','smile')]},640,1.55,{feet:640,p:[[0,'pray','pray',8]],fc:[[W(83,'praying'),1]]}),
  {html:bubble(150,110,svg(70,70,'-35 -35 70 70',`<circle r="26" fill="none" stroke="#cfc4b4" stroke-width="7"/><path d="M-18,18 L18,-18" stroke="#cfc4b4" stroke-width="7"/>`)),x:860,y:220,z:16,at:W(83,'words'),a:'pop',out:W(83,'praying')},
  {html:heartIcon(.55,'#ffd84a'),x:640,y:520,z:14,at:W(83,'praying'),a:'grow',pulse:.08},
  {html:sunburst(420,'#fff',.4),x:640,y:500,z:8,at:W(83,'praying'),a:'grow',spin:10},
  DOVE(400,300,.5,W(83,'he'),{glow:true}),
]},
// ===================== THE PRAYER =====================
// "Okay. The prayer I promised. It is short, and the Church has prayed it for centuries."
{t0:W(84,'okay')-0.1,trans:'whipV',els:[...land({h:22,s:58,seed:47,sun:[640,60],rays:true,trees:3,bushes:4,clearX:[640,600]}),
  CH({...FATHER,faces:[F('dot','up','grin')]},230,1.5,{talk:true,p:[[0,'hip','wave'],[W(85,'prayer'),'hip','point']]}),
  {html:scroll(.85),x:640,y:220,z:12,at:W(85,'prayer'),a:'pop',float:4},
  PILL('SHORT',640,370,W(86,'short'),28),
  CH({...MONK,armL:'pray',armR:'pray',tilt:8,faces:[F('closed','','smile')],dir:-1},830,.95,{feet:632,at:W(86,'centuries'),a:'rise'}),
  CH({...MEDI,armL:'pray',armR:'pray',tilt:8,faces:[F('closed','','smile')],dir:-1},975,.95,{feet:632,at:W(86,'centuries')+0.15,a:'rise'}),
  CH({...GIRL,armL:'pray',armR:'pray',tilt:8,faces:[F('closed','','smile')],dir:-1},1120,.92,{feet:632,at:W(86,'centuries')+0.3,a:'rise'}),
]},
// "The Catechism quotes it."
{t0:W(87,'the')-0.1,trans:'whip',els:[...land({h:215,s:48,seed:48,trees:4,bushes:4,clearX:[640,400]}),
  {html:bookCCC(1.2,'CCC 2671'),x:640,y:360,z:10,at:W(87,'catechism'),a:'drop'},
  {html:sunburst(500,'#fff',.35),x:640,y:360,z:6,at:W(87,'quotes'),a:'grow',spin:8},
]},
// "Come, Holy Spirit, fill the hearts of your faithful and enkindle in them the fire of your love."
{t0:W(88,'come')-0.1,trans:'zoom',cam:[{at:W(88,'come'),d:6,z:1.06}],els:[...land({h:12,s:62,seed:49,sun:[640,330],rays:true,mountains:false,hy1:580,hy2:630,gy:690,clouds:7}),
  DOVE(640,105,.55,W(88,'come'),{glow:true}),
  TXT(['Come, Holy Spirit,'],[W(88,'come'),W(88,'holy'),W(88,'spirit')],78,640,215),
  TXT(['fill the hearts of your faithful'],[W(88,'fill'),W(88,'the'),W(88,'hearts'),W(88,'of'),W(88,'your'),W(88,'faithful')],52,640,300),
  TXT(['and enkindle in them'],[W(88,'and'),W(88,'enkindle'),W(88,'in'),W(88,'them')],52,640,372),
  TXT(['the fire of your love.'],[W(88,'the',1),W(88,'fire'),W(88,'of',1),W(88,'your',1),W(88,'love')],64,640,450,{style:'color:#ffe28a'}),
  REF('CCC 2671',640,525,W(88,'love')),
  ...[[180,400],[1100,380],[240,560],[1040,560]].map(([x,y],i)=>({html:heartIcon(.45),x,y,z:12,at:W(88,'hearts')+i*0.1,a:'pop',float:6})),
  {html:svg(170,220,'-85 -110 170 220',flameSVG(0,40,1.6)),x:640,y:610,z:12,at:W(88,'fire'),a:'grow',pulse:.06},
]},
// "That's it. Before a test. Before a hard conversation. When you wake up. When you don't know what to do. Come, Holy Spirit."
{t0:W(89,'thats')-0.1,trans:'whip',els:[BG('#f4ede2'),
  CH({...FATHER,faces:[F('happy','','grin')]},640,1.5,{feet:600,talk:true,p:[[0,'hip','raise']],out:W(90,'before')+0.05,outA:'pop'}),
  ...[[0,W(90,'before')+0.25,48],[1,W(91,'conversation'),200],[2,W(92,'wake'),340],[3,W(93,'know'),120]].map(([i,at,hue])=>{const x=330+(i%2)*620,y=190+Math.floor(i/2)*330;
    const ins=[`<div style="position:absolute;left:300px;top:240px;line-height:0;transform:translate(-50%,-100%)">${desk(.9)}</div><div style="position:absolute;left:200px;top:250px;line-height:0;transform:translate(-50%,-100%)">${chibi({...TEEN,eyes:'closed',mouth:'smile',armL:'pray',armR:'pray',k:.8})}</div><div style="position:absolute;left:430px;top:80px;line-height:0;transform:translate(-50%,-50%) rotate(8deg)">${testPaper(.6)}</div>`,
      `<div style="position:absolute;left:190px;top:270px;line-height:0;transform:translate(-50%,-100%)">${chibi({...GIRL,eyes:'dot',brows:'worried',mouth:'wavy',armL:'down',armR:'down',k:.85})}</div><div style="position:absolute;left:400px;top:270px;line-height:0;transform:translate(-50%,-100%)">${chibi({...TEEN3,eyes:'dot',brows:'angry',mouth:'flat',armL:'hip',armR:'hip',dir:-1,k:.85})}</div><div style="position:absolute;left:300px;top:60px;line-height:0;transform:translate(-50%,-50%)">${bubble(110,80,qmark(44))}</div>`,
      `<div style="position:absolute;left:180px;top:270px;line-height:0;transform:translate(-50%,-100%)">${chibi({...TEEN,eyes:'closed',mouth:'o',armL:'raise',armR:'raise',k:.85})}</div><div style="position:absolute;left:400px;top:150px;line-height:0;transform:translate(-50%,-50%) rotate(-10deg)">${alarmClock(.75)}</div>`,
      `<div style="position:absolute;left:380px;top:270px;line-height:0;transform:translate(-50%,-100%)">${signpost(.62)}</div><div style="position:absolute;left:180px;top:270px;line-height:0;transform:translate(-50%,-100%)">${chibi({...GIRL,eyes:'side',brows:'think',mouth:'flat',armL:'down',armR:'chin',k:.85})}</div><div style="position:absolute;left:300px;top:40px;line-height:0;transform:translate(-50%,-50%)">${qmark(50)}</div>`][i];
    return {html:`<div style="position:relative;width:590px;height:300px;border:5px solid ${CI};border-radius:20px;overflow:hidden;background:linear-gradient(${hsl(hue,60,82)},${hsl(hue,50,64)})"><div style="position:absolute;left:0;right:0;bottom:0;height:60px;background:${hsl(hue,45,52)};border-top:4px solid ${CI}"></div>${ins}</div>`,x,y,z:10,at:at-0.25,a:'pop'};}),
  {html:`<div class="tt" style="font-size:72px;background:rgba(37,33,43,.0)">Come, Holy Spirit.</div>`,x:640,y:360,z:30,at:W(94,'come'),a:'stamp'},
  {html:`<div style="width:1300px;height:740px;background:rgba(255,248,220,.55)"></div>`,x:640,y:360,z:25,at:W(94,'come'),a:'fade'},
  DOVE(640,250,.5,W(94,'holy'),{glow:true,z:31}),
]},
// ===================== CHALLENGE =====================
// "So here is your challenge."
{t0:W(95,'so')-0.1,trans:'whipV',els:[...land({h:28,s:60,seed:50,trees:4,bushes:4,clearX:[640,500]}),
  PILL('YOUR CHALLENGE',780,190,W(95,'challenge'),44),
  CH({...FATHER,faces:[F('dot','bold','grin')]},330,1.6,{talk:true,p:[[0,'hip','forward'],[W(95,'challenge'),'hip','point']]}),
]},
// "Every morning this week, before you check your phone, pray those words."
{t0:W(96,'every')-0.1,trans:'whip',els:[...room(48,50,{windows:[200,1080],curtain:200}),
  ...['M','T','W','T','F','S','S'].map((d,i)=>({html:`<div style="width:86px;height:86px;border-radius:16px;background:#fff;border:5px solid ${CI};display:flex;align-items:center;justify-content:center;font-family:Mont;font-weight:900;font-size:36px;color:${CI}">${d}</div>`,x:250+i*130,y:90,z:20,at:W(96,'morning')+i*0.06,a:'pop'})),
  {html:alarmClock(.6),x:220,y:420,z:12,at:W(96,'morning'),a:'pop',sway:6},
  CH({...TEEN,faces:[F('closed','','o'),F('dot','up','o'),F('closed','','smile')]},640,1.5,{feet:640,p:[[0,'raise','raise'],[W(96,'phone'),'down','forward'],[W(96,'pray'),'pray','pray',6]],fc:[[W(96,'check'),1],[W(96,'pray'),2]]}),
  {html:phoneBig(.6),x:900,y:420,z:13,at:W(96,'phone'),a:'pop',sway:8,out:W(96,'pray'),outA:'fade'},
  {html:crossBadge(),x:900,y:420,z:15,at:W(96,'pray'),a:'stamp',out:W(96,'words')+0.4},
  DOVE(880,240,.45,W(96,'words'),{glow:true}),
]},
// "And then watch for the fruits. Watch for more peace, more patience, more courage."
{t0:W(97,'and')-0.1,trans:'whip',els:[...land({h:110,s:48,seed:51,trees:3,bushes:4,clearX:[700,500]}),
  CH({...GIRL,holdR:P_BINOC,faces:[F('closed','','smile'),F('happy','','grin')]},250,1.45,{feet:640,p:[[W(97,'watch'),'down','chin']],fc:[[W(98,'courage'),1]]}),
  ...BAR(600,170,W(98,'peace'),'PEACE'),...BAR(800,250,W(98,'patience'),'PATIENCE'),...BAR(1000,330,W(98,'courage'),'COURAGE'),
  {html:fruitIcon('pear',.9),x:600,y:395,z:13,at:W(98,'peace'),a:'pop'},{html:fruitIcon('grape',.9),x:800,y:315,z:13,at:W(98,'patience'),a:'pop'},{html:shield(.5),x:1000,y:235,z:13,at:W(98,'courage'),a:'pop'},
]},
// "The Holy Spirit is not forgotten by God. Don't let him be forgotten by you."
{t0:W(99,'the')-0.1,trans:'whipV',els:[...land({h:205,s:50,seed:52,sun:[640,200],rays:true,mountains:false,hy1:560,hy2:620,gy:680,trees:5,bushes:4,clearX:[640,300]}),
  DOVE(640,230,.9,W(99,'holy'),{glow:true,move:{at:W(100,'you'),d:.7,x:640,y:450,s:.45},out:W(100,'you')+0.75,outA:'fade'}),
  CH({...TEEN,faces:[F('dot','up','o'),F('happy','','grin')]},640,1.45,{feet:650,at:W(100,'dont'),a:'rise',p:[[W(100,'dont'),'out','out'],[W(100,'you'),'chest','chest']],fc:[[W(100,'you'),1]]}),
  {html:heartIcon(.55,'#ffd84a'),x:640,y:520,z:14,at:W(100,'you')+0.6,a:'grow',pulse:.08},
]},
// "And if this helped, share it with a friend who is getting confirmed, or who just needs some courage."
{t0:W(101,'and')-0.1,trans:'whip',els:[...land({h:150,s:46,seed:53,city:{x0:400,x1:900,type:'modern'},trees:4,bushes:4,clearX:[640,500]}),
  CH({...TEEN,holdR:P_PHONE,faces:[F('dot','','smile'),F('happy','','grin')]},300,1.45,{feet:640,p:[[0,'down','forward']],fc:[[W(101,'share'),1]]}),
  {html:shareIcon(.9),x:470,y:270,z:14,at:W(101,'share'),a:'pop',move:{at:W(101,'share')+0.3,d:.8,x:900,y:250}},
  CH({...GIRL,faces:[F('dot','','smile'),F('happy','','grin'),F('dot','bold','grin')],dir:-1},960,1.4,{feet:640,at:W(101,'friend'),a:'rise',fc:[[W(101,'confirmed'),1],[W(101,'courage'),2]],p:[[W(101,'courage'),'hip','raise']]}),
  DOVE(1110,230,.4,W(101,'confirmed'),{glow:true}),
  {html:shield(.5),x:810,y:420,z:14,at:W(101,'courage'),a:'stamp'},
]},
// "Subscribe, and I will see you in the next one."
{t0:W(102,'subscribe')-0.1,trans:'whipV',els:[...land({h:205,s:48,seed:54,church:[1100,1],trees:5,bushes:4,clearX:[640,500]}),
  CH({...FATHER,faces:[F('happy','','grin')]},400,1.7,{talk:true,p:[[0,'down','wave']]}),
  {html:subscribeBtn(),x:860,y:300,z:20,at:W(102,'subscribe'),a:'stamp'},
  {html:sparkle(46),x:1050,y:220,z:21,at:W(102,'subscribe')+0.2,a:'pop',pulse:.1},
  DOVE(860,470,.45,W(102,'see'),{glow:true}),
]},
];
