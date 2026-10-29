// Usage: node shot.js page.html out.png [width height]  -> screenshot of a static page
const {chromium}=require('playwright');const path=require('path');
(async()=>{const [pg0,out,w,h]=process.argv.slice(2);const b=await chromium.launch();const p=await b.newPage({viewport:{width:+(w||1920),height:+(h||1080)}});
 const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 await p.goto('file://'+path.resolve(pg0));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(400);await p.screenshot({path:out});if(errs.length)console.log(errs);await b.close();})();
