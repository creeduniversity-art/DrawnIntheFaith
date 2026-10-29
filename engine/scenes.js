// Holy Spirit sample: first 60 seconds. Every timed element uses W(sentence, word) from T.js.
const GY=650; // feet baseline for standing characters
const F=(o,x,s,extra={})=>Object.assign({html:fig(o),x,y:extra.y??GY,anchor:'b',z:10,s,breathe:1,poses:[[0,o.pose||{}]]},extra);
// kinetic title: lines of words, each word revealed at its own time
function TXT(lines,times,size,x,y,extra={}){let k=0;const html=`<div class="tt" style="font-size:${size}px;${extra.style||''}">`+lines.map(l=>l.split(' ').map(w=>`<span class="wd">${w}</span>`).join(' ')).join('<br>')+`</div>`;
  const n=lines.join(' ').split(' ').length;const wt=[...Array(n)].map((_,i)=>times[Math.min(i,times.length-1)]);
  return Object.assign({html,x,y,z:20,wt,at:times[0]-0.01,a:'none'},extra);}
const REF=(t,x,y,at)=>({html:`<div class="ref">${t}</div>`,x,y,z:20,at,a:'fade'});
const Q=(x,y,sz,at,extra={})=>Object.assign({html:qmark(sz),x,y,z:15,at,float:6,sway:6},extra);
const LBL=(t,x,y,at,size=34)=>({html:`<div class="lbl" style="font-size:${size}px">${t}</div>`,x,y,z:20,at,a:'rise'});
const BG=(c)=>({html:`<div style="width:1500px;height:900px;background:${c}"></div>`,x:640,y:360,depth:0,z:0});
const STRIP=(i,hue,seed,at)=>({html:`<div style="transform:skewX(-5deg)">${strip(i===1?420:720,800,hue,seed)}</div>`,x:i===0?63:i===2?1217:640,y:360,z:1,at,a:'slideD',d:.45});

const SCENES=[
// 1 "In the Bible..." - open Bible in golden light
{t0:0,cam:[{at:0.4,d:1.2,z:1.18,y:380}],els:[...land({h:42,s:62,seed:21,sun:[640,40],rays:true,mountains:false,hy1:520,hy2:590,gy:660,clouds:6}),
  {html:sunburst(700,'#fff',.25),x:640,y:390,z:6,at:W(0,'bible'),a:'grow',spin:6},
  {html:bible(1.15),x:640,y:400,z:10,at:W(0,'bible'),float:4},
]},
// 2 "...Saint Paul once met a group of believers and asked them a simple question"
{t0:W(0,'paul')-0.05,trans:'zoom',cam0:{x:600},cam:[{at:1.3,d:3.5,x:690}],els:[...land({h:158,s:36,seed:3,city:{x0:640,x1:1350,type:'ancient',temple:1020},trees:6,cypress:true,bushes:4,sun:[1000,0],clearX:[640,300]}),
  {html:`<div class="pill">Acts 19</div>`,x:150,y:64,z:30,at:W(0,'paul')+0.4,a:'slideL',depth:0},
  F({robe:'robe',hair:'short2',beard:true,mantle:true,dir:1,hc:'#9a94a1',hs:'#6a6472'},150,1,{move:{at:W(0,'paul'),d:1.4,x:370,ease:'lin'},walk:6,walkUntil:W(0,'paul')+1.4,
    poses:[[0,{lU:14,rU:14,lF:-10,rF:-10}],[W(0,'asked'),{rU:70,rF:30,tilt:4}]]}),
  F({robe:'dress',hair:'veil',dir:-1},820,.9,{at:W(0,'group'),a:'rise',poses:[[0,{lU:8,rU:8,lF:-40,rF:-40}]]}),
  F({robe:'tunic',hair:'short2',beard:true,mantle:true,hc:'#5e4a3a',hs:'#3e3027',dir:-1},960,.95,{at:W(0,'group')+0.12,a:'rise',poses:[[0,{lU:10,rU:10}]]}),
  F({robe:'tunic',hair:'long',dir:-1},1100,.88,{at:W(0,'group')+0.24,a:'rise',poses:[[0,{lU:12,rU:12,rF:-30}]]}),
  {html:bubble(130,110,qmark(80)),x:500,y:205,z:20,at:W(0,'simple'),float:4},
]},
// 3 "Did you receive the Holy Spirit?"
{t0:W(1,'did')-0.1,trans:'whip',cam0:{x:640},cam:[{at:W(1,'did'),d:2,z:1.05}],els:[...land({h:158,s:36,seed:4,city:{x0:900,x1:1400,type:'ancient'},trees:5,cypress:true,bushes:4,sun:[300,0],clearX:[300,200]}),
  F({robe:'robe',hair:'short2',beard:true,mantle:true,dir:1,hc:'#9a94a1',hs:'#6a6472'},280,1.18,{y:690,poses:[[0,{lU:12,rU:55,rF:70,tilt:4}],[W(1,'holy'),{rU:75,rF:40}]]}),
  TXT(['Did you receive','the Holy Spirit?'],[W(1,'did'),W(1,'you'),W(1,'receive'),W(1,'the'),W(1,'holy'),W(1,'spirit')],70,860,290),
  REF('ACTS 19:2',860,420,W(1,'spirit')+0.2),
]},
// 4 "And they answered: 'we have never even heard that there is a Holy Spirit.'"
{t0:W(2,'and')-0.05,trans:'whip',cam:[{at:W(3,'heard'),d:1.6,z:1.05,y:380}],els:[...land({h:150,s:36,seed:5,trees:6,cypress:true,bushes:4,city:{x0:-100,x1:300,type:'ancient'}}),
  F({robe:'dress',hair:'veil',dir:1},380,.95,{poses:[[0,{lU:8,rU:8,lF:-40,rF:-40}],[W(3,'heard'),{lU:5,lF:125,rU:5,rF:125,tilt:-8}]]}),
  F({robe:'tunic',hair:'short2',beard:true,mantle:true,hc:'#5e4a3a',hs:'#3e3027',dir:1},640,1,{poses:[[0,{lU:10,rU:10}],[W(3,'heard')+0.1,{lU:5,lF:125,rU:5,rF:125,tilt:8}]]}),
  F({robe:'tunic',hair:'long',dir:-1,hc:'#3f3434',hs:'#241d1d'},900,.93,{poses:[[0,{lU:12,rU:12}],[W(3,'heard')+0.2,{lU:5,lF:125,rU:5,rF:125,tilt:-6}]]}),
  TXT(['“We have never even heard','that there is a Holy Spirit.”'],[W(3,'we'),W(3,'have'),W(3,'never'),W(3,'even'),W(3,'heard'),W(3,'that'),W(3,'there'),W(3,'is'),W(3,'a'),W(3,'holy'),W(3,'spirit')],54,640,152),
  REF('ACTS 19:2',640,246,W(3,'spirit')+0.2),
  Q(190,440,110,W(3,'heard')),Q(1090,430,120,W(3,'heard')+0.1),Q(300,315,72,W(3,'heard')+0.2),Q(980,315,80,W(3,'heard')+0.3),Q(120,320,64,W(3,'heard')+0.4),Q(1170,310,70,W(3,'heard')+0.5),
]},
// 5 "Honestly? A lot of Catholics today could say the same thing."
{t0:W(4,'honestly')-0.05,trans:'whip',dir:-1,cam0:{x:620},cam:[{at:W(5,'catholics'),d:2.5,x:680}],els:[...land({h:205,s:48,seed:6,city:{x0:450,x1:900,type:'modern'},church:[1180,1],trees:5,bushes:4,clearX:[330,180]}),
  F({robe:'cassock',hair:'short',dir:1},330,1.05,{at:W(4,'honestly'),a:'pop',poses:[[0,{lU:30,lF:75,rU:30,rF:75,tilt:-6}],[W(5,'catholics'),{lU:10,lF:0,rU:78,rF:6,tilt:4}]]}),
  F({robe:'hoodie',hair:'cap',dir:-1},770,.85,{at:W(5,'catholics'),a:'rise',poses:[[0,{lU:10,rU:10,lF:-70}]]}),
  F({robe:'hoodie',hair:'pony',dir:-1},910,.8,{at:W(5,'catholics')+0.12,a:'rise',poses:[[0,{lU:8,rU:8}]]}),
  F({robe:'hoodie',hair:'short2',dir:-1},1050,.88,{at:W(5,'catholics')+0.24,a:'rise',poses:[[0,{lU:10,rU:10,rF:-60}]]}),
  Q(770,285,74,W(5,'same')),Q(910,300,70,W(5,'same')+0.1),Q(1050,272,76,W(5,'same')+0.2),
]},
// 6 "We know God the Father. We know Jesus. But the Holy Spirit? For most people, he is kind of a mystery."
{t0:W(6,'god')-0.1,trans:'whip',cam:[{at:W(9,'people'),d:1.6,x:1067,z:1.28}],drift:0.02,els:[BG('#fff'),
  STRIP(0,42,31,W(6,'god')-0.1),STRIP(1,335,32,W(6,'god')),STRIP(2,205,33,W(6,'god')+0.1),
  {html:handCloud(.85),x:213,y:300,z:10,at:W(6,'god'),a:'drop',float:4},
  {html:check(70),x:213,y:500,z:12,at:W(6,'father'),a:'stamp'},
  LBL('GOD THE FATHER',213,605,W(6,'god'),30),
  F({robe:'robe',hair:'long',beard:true,mantle:true,dir:1,pose:{lU:30,lF:20,rU:30,rF:20}},640,.78,{y:470,at:W(7,'jesus'),a:'rise'}),
  {html:check(70),x:640,y:530,z:12,at:W(7,'jesus')+0.25,a:'stamp'},
  LBL('JESUS',640,605,W(7,'jesus'),30),
  Q(1067,320,210,W(8,'holy'),{a:'pop',float:5,sway:4}),
  LBL('HOLY SPIRIT',1067,605,W(8,'holy'),30),
  Q(930,175,52,W(9,'most')),Q(1200,165,58,W(9,'most')+0.12),Q(925,470,56,W(9,'most')+0.24),Q(1205,455,50,W(9,'most')+0.36),Q(955,320,44,W(9,'most')+0.48),Q(1180,315,46,W(9,'most')+0.6),
  {html:`<div style="filter:blur(10px)">${svg(520,160,'-260 -80 520 160',cloud(-60,30,300,'#fff',.85)+cloud(120,40,260,'#fff',.8))}</div>`,x:1067,y:520,z:14,at:W(9,'mystery'),a:'slideR',d:.8},
]},
// 7 "A dove on a banner. A name at the end of the Sign of the Cross."
{t0:W(10,'dove')-0.1,trans:'whip',cam:[{at:W(11,'name'),d:0.7,x:1240}],drift:0.03,els:[...interior(345,42),
  {html:banner(1),x:420,y:330,z:8,at:W(10,'banner'),a:'wipeD',d:.6,sway:1.2},
  {frames:[dove(.62,'up'),dove(.62,'down')],html:'',x:820,y:140,z:12,at:W(10,'dove'),a:'fade',d:.2,fps:7,frUntil:W(10,'banner')+0.4,move:{at:W(10,'dove'),d:0.6,x:420,y:290},float:3},
  TXT(['In the name of the Father,'],[W(11,'name')+0.55],44,1060,250,{style:'color:#fff'}),
  TXT(['and of the Son,'],[W(11,'name')+0.7],44,1060,318),
  TXT(['and of the Holy Spirit.'],[W(11,'end')+0.3],54,1060,400,{style:'color:#ffe28a'}),
  F({robe:'cassock',hair:'short',dir:-1},1640,1.05,{poses:[[0,{lU:10,rU:10}],[W(11,'name'),{rU:16,rF:-128,tilt:-8,d:.4}],[W(11,'end'),{rU:6,rF:-158,d:.35}],[W(11,'sign'),{rU:30,rF:-118,d:.35}]]}),
  {html:svg(130,170,'-65 -85 130 170',`<path class="dr" d="M0,-70 V70 M-48,-22 H48" stroke="${INK}" stroke-width="22" stroke-linecap="round" fill="none"/><path class="dr" d="M0,-70 V70 M-48,-22 H48" stroke="#ffe28a" stroke-width="12" stroke-linecap="round" fill="none"/>`),x:1460,y:200,z:12,at:W(11,'sign'),a:'none',drawD:.7,float:4},
  {html:sunburst(300,'#fff',.3),x:1460,y:200,z:11,at:W(11,'sign'),a:'grow',spin:12},
]},
// 8 "So today, let's fix that."
{t0:W(12,'so')-0.05,trans:'whip',els:[...land({h:118,s:44,seed:7,trees:7,bushes:4,clearX:[640,500]}),
  F({robe:'cassock',hair:'short',dir:1},400,1.05,{poses:[[0,{lU:10,rU:10}],[W(12,'today'),{rU:150,rF:-10,tilt:-4}],[W(12,'fix'),{rU:80,rF:4,tilt:4}]]}),
  Q(870,300,190,W(12,'so')-0.05,{a:'none',out:W(12,'fix')}),
  {html:sunburst(560,'#fff',.35),x:870,y:300,z:12,at:W(12,'fix'),a:'grow',spin:14},
  {html:svg(150,210,'0 0 70 100',`<text x="35" y="84" text-anchor="middle" font-family="Mont" font-weight="900" font-size="96" fill="#ffe28a" stroke="${INK}" stroke-width="7" paint-order="stroke" stroke-linejoin="round">!</text>`),x:870,y:300,z:15,at:W(12,'fix'),a:'stamp',float:5},
  {html:sparkle(60),x:760,y:190,z:16,at:W(12,'fix')+0.1,a:'pop',pulse:.1},{html:sparkle(44),x:990,y:200,z:16,at:W(12,'fix')+0.2,a:'pop',pulse:.1},{html:sparkle(50),x:1000,y:420,z:16,at:W(12,'fix')+0.3,a:'pop',pulse:.1},
]},
// 9 "Who is the Holy Spirit, and what does he actually do in your life?"
{t0:W(13,'who')-0.1,trans:'whipV',els:[...land({h:196,s:46,seed:9,mountains:false,clouds:11,cloudBand:420,hy1:540,hy2:600,gy:665,trees:6,bushes:4,clearX:[640,260]}),
  {frames:[dove(.4,'up'),dove(.4,'down')],html:'',x:-100,y:120,z:6,at:W(13,'who'),a:'none',fps:6,move:{at:W(13,'who'),d:4,x:1400,y:90,ease:'lin'}},
  TXT(['WHO IS THE','HOLY SPIRIT?'],[W(13,'who'),W(13,'is'),W(13,'the'),W(13,'holy'),W(13,'spirit')],108,640,230),
  ...[['cap',0],['pony',0.12],['short2',0.24]].map(([h,d],i)=>F({robe:'hoodie',hair:h,dir:-1,pose:{lU:14,rU:14}},1420+i*110,.48,{y:712,at:W(13,'what')+d,a:'none',move:{at:W(13,'what')+d,d:1.6,x:930+i*110,ease:'lin'},walk:5,walkUntil:W(13,'what')+1.6+d})),
  TXT(['& WHAT DOES HE DO IN YOUR LIFE?'],[W(13,'what'),W(13,'does'),W(13,'he'),W(13,'do'),W(13,'in'),W(13,'your'),W(13,'life')],46,640,440,{style:'color:#fff8d8'}),
]},
// 10 "And stay to the end..."
{t0:W(14,'stay')-0.1,trans:'whip',els:[...land({h:40,s:60,seed:12,trees:4,bushes:4,sun:[900,20],clearX:[260,180]}),
  F({robe:'cassock',hair:'short',dir:1},250,1,{poses:[[0,{lU:10,rU:108,rF:4,tilt:-4}]]}),
  {html:progress(660),x:770,y:330,z:12,at:W(14,'stay'),a:'pop',tick:(t,e)=>{const q=eInOut(clamp((t-W(14,'end')+0.25)/0.8));const w=660*(0.12+0.88*q);e.inn.querySelector('.pfill').setAttribute('width',w);e.inn.querySelector('.phead').setAttribute('cx',w);}},
  {html:flag(),x:1120,y:262,z:13,at:W(14,'end'),a:'drop'},
]},
// 11 "...a one-line prayer that the Church has prayed for centuries, and it might be the most powerful thing you learn today."
{t0:W(14,'oneline')-0.1,trans:'whip',cam:[{at:W(14,'powerful'),d:1.4,z:1.06,y:340}],els:[...land({h:22,s:58,seed:13,sun:[640,60],rays:true,mountains:true,trees:3,bushes:4,clearX:[640,600]}),
  {html:sunburst(620,'#fff8d0',.5),x:640,y:230,z:9,at:W(14,'powerful'),a:'grow',spin:10},
  {html:scroll(.95),x:640,y:230,z:12,at:W(14,'oneline'),a:'pop',float:4},
  {html:`<div class="pill" style="font-size:28px">1 LINE</div>`,x:640,y:398,z:13,at:W(14,'prayer'),a:'pop'},
  {html:svg(240,340,'-120 -320 240 340',church(0,0,1,22,58)),x:230,y:640,anchor:'b',z:8,at:W(14,'church'),a:'rise'},
  F({robe:'habit',hair:'hood',dir:-1,pose:{lU:10,lF:-122,rU:10,rF:-122,tilt:14}},830,.62,{y:632,at:W(14,'centuries'),a:'rise'}),
  F({robe:'dress',hair:'veil',dir:-1,pose:{lU:10,lF:-122,rU:10,rF:-122,tilt:14}},970,.62,{y:632,at:W(14,'centuries')+0.18,a:'rise'}),
  F({robe:'hoodie',hair:'pony',dir:-1,pose:{lU:10,lF:-122,rU:10,rF:-122,tilt:14}},1110,.6,{y:632,at:W(14,'centuries')+0.36,a:'rise'}),
  {html:sparkle(46),x:430,y:150,z:14,at:W(14,'powerful')+0.1,a:'pop',pulse:.12},{html:sparkle(36),x:860,y:120,z:14,at:W(14,'powerful')+0.25,a:'pop',pulse:.12},{html:sparkle(40),x:870,y:330,z:14,at:W(14,'powerful')+0.4,a:'pop',pulse:.12},
]},
// 12 "First, who is he?"
{t0:W(15,'first')-0.1,trans:'whipV',els:[...land({h:172,s:42,seed:14,trees:5,cypress:true,bushes:4}),
  {html:`<div class="pill" style="font-size:40px;padding:12px 30px 14px">PART 1</div>`,x:640,y:170,z:20,at:W(15,'first'),a:'pop'},
  TXT(['WHO IS HE?'],[W(15,'who'),W(15,'is'),W(15,'he')],150,640,350),
]},
// 13 "The Holy Spirit is..."
{t0:W(16,'the')-0.1,trans:'whip',cam:[{at:W(16,'the'),d:1.5,z:1.08}],els:[...land({h:332,s:50,seed:15,sun:[640,300],rays:true,mountains:false,hy1:540,hy2:600,gy:665,clouds:8,trees:5,bushes:4,clearX:[640,300]}),
  {frames:[dove(1.1,'up',true),dove(1.1,'down',true)],html:'',x:-200,y:330,z:12,at:W(16,'the'),a:'none',fps:5,move:{at:W(16,'the'),d:1.1,x:640,y:320},float:8},
]},
// 14 "...not a force. Not a feeling. Not an energy."
{t0:W(16,'not')-0.1,trans:'whip',drift:0.02,els:[BG('#fff'),
  STRIP(0,172,41,W(16,'not')-0.1),STRIP(1,335,42,W(16,'not')),STRIP(2,45,43,W(16,'not')+0.1),
  {html:forceIcon(1.1),x:213,y:320,z:10,at:W(16,'force'),a:'pop',float:4},LBL('FORCE',213,560,W(16,'force')),
  {html:crossX(230),x:213,y:320,z:14,at:W(16,'force')+0.35,a:'stamp'},
  {html:heart(1.1),x:640,y:320,z:10,at:W(17,'feeling'),a:'pop',pulse:.04},LBL('FEELING',640,560,W(17,'feeling')),
  {html:crossX(230),x:640,y:320,z:14,at:W(17,'feeling')+0.35,a:'stamp'},
  {html:battery(1.1),x:1067,y:320,z:10,at:W(18,'energy'),a:'pop',float:4},LBL('ENERGY',1067,560,W(18,'energy')),
  {html:crossX(230),x:1067,y:320,z:14,at:W(18,'energy')+0.35,a:'stamp'},
]},
// 15 "He is a person."
{t0:W(19,'he')-0.1,trans:'zoom',els:[...land({h:46,s:64,seed:16,sun:[640,260],rays:true,mountains:false,hy1:560,hy2:620,gy:680,clouds:8,trees:6,bushes:4,clearX:[640,380]}),
  {frames:[dove(1.05,'up',true),dove(1.05,'down',true)],html:'',x:640,y:270,z:12,at:W(19,'he'),a:'pop',fps:3,float:6},
  TXT(['HE IS A PERSON'],[W(19,'he'),W(19,'is'),W(19,'a'),W(19,'person')],104,640,560),
]},
// 16 "The third person of the Trinity. Fully God, just like the Father and the Son."
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
// 17 "The Creed calls him 'the Lord, the giver of life.'"
{t0:W(22,'the')-0.1,trans:'whip',els:[...land({h:105,s:46,seed:18,sun:[900,40],trees:4,bushes:2,mountains:true,clearX:[300,200]}),
  F({robe:'cassock',hair:'short',dir:1},300,1.02,{poses:[[0,{lU:14,lF:-72,rU:14,rF:-72,tilt:12}]]}),
  {html:bible(.36),x:300,y:470,z:12,at:W(22,'creed'),a:'pop'},
  REF('NICENE CREED',840,170,W(22,'creed')),
  TXT(['“the Lord,','the giver of life.”'],[W(22,'the',1)-0.05,W(22,'lord'),W(22,'the',2),W(22,'giver'),W(22,'of'),W(22,'life')],66,840,300),
  ...[[500,1.5,'#ff9fb6'],[600,1.2,'#ffd84a'],[700,1.6,'#fff'],[810,1.3,'#ff9fb6'],[915,1.55,'#ffd84a'],[1020,1.2,'#fff'],[1120,1.6,'#ff9fb6'],[1215,1.3,'#ffd84a']].map(([x,s,c],i)=>({html:flower(s,c),x,y:705,anchor:'b',z:12,at:W(22,'life')+i*0.05,a:'grow',sway:3})),
]},
// 18 "And Jesus gave him a special name. He called him the Counselor."
{t0:W(23,'and')-0.1,trans:'whip',cam:[{at:W(23,'jesus'),d:4,z:1.06,x:660}],els:[...land({h:38,s:62,seed:19,sun:[860,60],rays:true,trees:4,bushes:4,clearX:[360,200]}),
  F({robe:'robe',hair:'long',beard:true,mantle:true,dir:1},360,1.05,{at:W(23,'jesus'),a:'rise',poses:[[0,{lU:24,lF:20,rU:24,rF:20}],[W(23,'name'),{rU:72,rF:16,tilt:4}]]}),
  {html:nameTag(560,160),x:870,y:330,z:10,at:W(23,'name'),a:'pop'},
  {html:svg(120,30,'0 0 120 30','<circle cx="20" cy="15" r="10" fill="#cfc4b4"/><circle cx="60" cy="15" r="10" fill="#cfc4b4"/><circle cx="100" cy="15" r="10" fill="#cfc4b4"/>'),x:870,y:330,z:11,at:W(23,'name')+0.15,a:'fade',out:W(24,'counselor')-0.05,outA:'fade'},
  {html:`<div style="font-family:Mont;font-weight:900;font-size:54px;color:${INK};white-space:nowrap">THE COUNSELOR</div>`,x:870,y:330,z:12,at:W(24,'counselor'),a:'stamp'},
  REF('JOHN 14:26',870,458,W(24,'counselor')+0.25),
  {html:sparkle(56),x:560,y:220,z:14,at:W(24,'counselor')+0.15,a:'pop',pulse:.12},{html:sparkle(44),x:1200,y:230,z:14,at:W(24,'counselor')+0.25,a:'pop',pulse:.12},{html:sparkle(40),x:1190,y:440,z:14,at:W(24,'counselor')+0.35,a:'pop',pulse:.12},
]},
];
