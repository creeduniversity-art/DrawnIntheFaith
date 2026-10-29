# Catholic YouTube channel: animation project rules

## The channel
Catholic explainer videos for young people with short attention spans. The narrator character is "Father", a priest in a black cassock with a white clerical collar.

## Non-negotiables
- **Sync:** visuals must match the narration at all times. Use the word timings in `script/word_timings_first_60s.json` (seconds); an element appears on the word it illustrates, never before it is spoken or after it is finished.
- **Facts:** every on-screen text must be factually correct and traceable to Scripture, the Catechism or the Vatican. Do not invent quotes or dates.
- **No blank screen:** every second is a full illustrated scene with something moving.
- **Layout:** no overlapping elements, nothing cut off the edge, and items in a row lined up on the same baseline. A cross-out sits exactly on the thing it crosses out.
- **Text:** keep on-screen text minimal. Pictures do the explaining.
- **Copying:** do not copy the reference channel's logo, mascot or branding. Match the *art style*, not their content.

## Style target
Everything is in `reference/`: `style_reference.mov` and the stills in `reference/frames/`. The burned-in captions and YouTube buttons in those frames are NOT part of the style; ignore them.

**Characters:**
- White/light-grey, faceless "mask" heads (no eyes or mouth).
- Thick dark outlines and soft grey shading.
- Robes and tunics with folds.
- Expressive poses, carried by the body instead of faces.

**Backgrounds:**
- Painterly and hand-drawn with outlines.
- Each scene is tinted mostly ONE hue (soft green, pink, teal, warm red).
- Layered hills, foliage, clouds and cities, with depth-of-field blur on far layers.

**Text:**
- Big bold white titles with a soft shadow (e.g. Montserrat ExtraBold).
- Simple white bar charts and arrows.

**Motion:**
- Slow camera pushes and pans with parallax.
- Quick whip-pan/motion-blur transitions.
- Elements sliding or popping in.
- Vertical coloured "strip" panels for comparisons.
- Swarms of question marks for confusion.

**Our palette:** bright and hopeful, never dark or dystopian. Use soft greens, sky blues, warm golds and pinks.

## Tech already set up (in `engine/`)
- `index.html`: a frame-accurate HTML/JS animation engine. Scenes and elements are timed in seconds, with camera keyframes, transitions and `render(t)`.
- `render.py`: renders frames with Playwright/Chromium and pipes them to ffmpeg (1080p, 30 fps).
  - Usage: `python3 render.py <firstFrame> <lastFrame> 30 out.mp4`
- `preview.py`: saves PNG stills at chosen times.
  - Usage: `python3 preview.py 3.0 10.5 22`
- The engine expects `T.js` (word timings, copy from `script/word_timings.js`), an art file and `scenes.js`. You may rewrite the engine if you have a better approach.

## Workflow
1. Show stills before rendering any video.
2. Render a short test before the full minute.
3. Mux with `audio/holy_spirit_first_60s.mp3`.
