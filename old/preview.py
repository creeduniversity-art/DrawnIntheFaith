import sys, asyncio
from playwright.async_api import async_playwright
import os; D=os.path.dirname(os.path.abspath(__file__))+'/'
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':1280,'height':720})
        errs=[]; pg.on('pageerror',lambda e:errs.append(str(e))); pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else None)
        await pg.goto('file://'+D+'index.html'); await pg.wait_for_timeout(500)
        for t in sys.argv[1:]:
            await pg.evaluate(f"render({t})"); await pg.screenshot(path=D+f'pv/t{float(t):05.1f}.png')
        print(errs); await b.close()
asyncio.run(main())
