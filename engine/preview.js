// Usage: node preview.js 3.0 10.5 22   -> saves pv/t003.0.png ... (1920x1080)
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
(async()=>{const D=__dirname;fs.mkdirSync(D+'/pv',{recursive:true});
  const b=await chromium.launch();const pg=await b.newPage({viewport:{width:1280,height:720},deviceScaleFactor:1.5});
  const errs=[];pg.on('pageerror',e=>errs.push(String(e)));pg.on('console',m=>{if(m.type()==='error')errs.push(m.text());});
  await pg.goto('file://'+path.join(D,'index.html'));await pg.evaluate(()=>document.fonts.ready);await pg.waitForTimeout(300);
  for(const t of process.argv.slice(2)){await pg.evaluate(`render(${t})`);const f=D+`/pv/t${Number(t).toFixed(2).padStart(5,'0')}.png`;await pg.screenshot({path:f});console.log(f);}
  if(errs.length)console.log('ERRORS',errs);await b.close();})();
