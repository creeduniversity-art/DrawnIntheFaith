import sys, asyncio, subprocess, time
from playwright.async_api import async_playwright
import os; D=os.path.dirname(os.path.abspath(__file__))+'/'
f0,f1,fps,out=int(sys.argv[1]),int(sys.argv[2]),int(sys.argv[3]),sys.argv[4]
async def main():
    ff=subprocess.Popen(['ffmpeg','-v','error','-y','-f','image2pipe','-framerate',str(fps),'-c:v','mjpeg','-i','-',
        '-c:v','libx264','-preset','veryfast','-crf','18','-pix_fmt','yuv420p','-r',str(fps),out],stdin=subprocess.PIPE)
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--disable-gpu'])
        pg=await b.new_page(viewport={'width':1280,'height':720},device_scale_factor=1.5)
        await pg.goto('file://'+D+'index.html'); await pg.wait_for_timeout(600)
        t0=time.time()
        for f in range(f0,f1):
            await pg.evaluate(f"render({f/fps})")
            buf=await pg.screenshot(type='jpeg',quality=93)
            ff.stdin.write(buf)
            if (f-f0)%600==0: print(out,f,f'{time.time()-t0:.0f}s',flush=True)
        await b.close()
    ff.stdin.close(); ff.wait()
    print('done',out,f'{time.time()-t0:.0f}s',flush=True)
asyncio.run(main())
