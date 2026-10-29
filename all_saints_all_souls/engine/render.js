// Usage: node render.js <firstFrame> <lastFrame> <fps> <out.mp4> [workers]
// Renders frames [first,last) at 1920x1080 in parallel workers, then concatenates.
const {chromium}=require('playwright');const path=require('path');const {spawn,execFileSync}=require('child_process');const fs=require('fs');
const [f0,f1,fps]=process.argv.slice(2,5).map(Number);const out=path.resolve(process.argv[5]);const N=Number(process.argv[6]||4);
async function part(a,b,file){const ff=spawn('ffmpeg',['-v','error','-y','-f','image2pipe','-framerate',String(fps),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','medium','-crf','16','-pix_fmt','yuv420p','-r',String(fps),file],{stdio:['pipe','inherit','inherit']});
  const br=await chromium.launch({args:['--disable-gpu']});const pg=await br.newPage({viewport:{width:1280,height:720},deviceScaleFactor:1.5});
  await pg.goto('file://'+path.join(__dirname,'index.html'));await pg.evaluate(()=>document.fonts.ready);await pg.waitForTimeout(400);
  const t0=Date.now();
  for(let f=a;f<b;f++){await pg.evaluate(`render(${f/fps})`);const buf=await pg.screenshot({type:'jpeg',quality:95});
    if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));
    if((f-a)%150===0)console.log(file,f,((Date.now()-t0)/1000).toFixed(0)+'s');}
  await br.close();ff.stdin.end();await new Promise(r=>ff.on('close',r));}
(async()=>{const tmp=path.join(__dirname,'parts');fs.mkdirSync(tmp,{recursive:true});const step=Math.ceil((f1-f0)/N);const files=[];const jobs=[];
  for(let i=0;i<N;i++){const a=f0+i*step,b=Math.min(f1,a+step);if(a>=b)break;const fl=path.join(tmp,`p${i}.mp4`);files.push(fl);jobs.push(part(a,b,fl));}
  await Promise.all(jobs);fs.writeFileSync(tmp+'/list.txt',files.map(f=>`file '${f}'`).join('\n'));
  execFileSync('ffmpeg',['-v','error','-y','-f','concat','-safe','0','-i',tmp+'/list.txt','-c','copy',out]);console.log('done',out);})();
