# combine preview stills into 2x2 labelled contact sheets (pv/sheet_N.png)
import sys,glob
from PIL import Image,ImageDraw,ImageFont
fs=sorted(glob.glob('pv/t*.png'))
font=ImageFont.truetype('/usr/share/fonts/opentype/inter/Inter-Bold.otf',28)
for k in range(0,len(fs),4):
    S=Image.new('RGB',(1920,1080),'black')
    for j,f in enumerate(fs[k:k+4]):
        im=Image.open(f).convert('RGB').resize((956,538));S.paste(im,((j%2)*964,(j//2)*542))
        d=ImageDraw.Draw(S);d.rectangle([(j%2)*964,(j//2)*542,(j%2)*964+130,(j//2)*542+40],fill='black');d.text(((j%2)*964+8,(j//2)*542+4),f[4:-4]+'s',fill='yellow',font=font)
    S.save(f'pv/sheet_{k//4}.png');print(f'pv/sheet_{k//4}.png')
