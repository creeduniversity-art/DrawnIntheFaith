# Catholic YouTube channel: animation project rules

## This video
"All Saints and All Souls" (6 min 26 s).
- The narration is finished: `audio/all_saints_all_souls_narration.mp3`.
- Redraw the whole video in the SAME art style as our Holy Spirit video (the "Bible Animations"-style look). If the Holy Spirit project folder is available, reuse its engine, characters and backgrounds rather than starting over.

## The channel
Catholic explainer videos for young people with short attention spans. The narrator character is "Father", a priest in a black cassock with a white clerical collar.

## Non-negotiables
- **Sync:** visuals must match the narration at all times. Use `script/word_timings.json` (seconds); an element appears on the word it illustrates, never before it is spoken or after it is finished.
- **Facts:** every on-screen text must be factually correct and traceable to Scripture, the Catechism or the Vatican. Keep the citations from the storyboard (Catechism 828, 954, 955, 956, 958, 1030, 1031, 1032, 2013; Revelation 7:9; 2 Maccabees 12:46). Do not invent quotes or dates.
- **Dates:** November 1, 2026 is a Sunday. The plenary indulgence for the souls in purgatory runs November 1–8.
- **No blank screen:** every second is a full illustrated scene with something moving.
- **Layout:** no overlapping elements, nothing cut off, and rows lined up on one baseline. A cross-out sits exactly on what it crosses out.
- **Text:** keep on-screen text minimal. Pictures do the explaining.
- **Copying:** do not copy the reference channel's logo, mascot or branding.

## Style
`reference/style_frames/` holds stills of the target style; ignore the captions and YouTube buttons burned into them.
- **Characters:** white/light-grey faceless characters with thick dark outlines and soft grey shading.
- **Backgrounds:** painterly, each tinted mostly one hue.
- **Text:** big bold white titles.
- **Motion:** slow camera pushes and pans with parallax, and whip-pan transitions.
- **Our palette:** bright and hopeful, never dark. A cemetery should feel peaceful and warm, not spooky.

## Story
`STORYBOARD.md` lists all 42 beats with timestamps, the exact narration and the on-screen text from our previous version.
- `reference/storyboard_previous_version.mp4` is that previous version.
- Keep the beats; change the look.

## Tech (in `engine/`)
- `index.html`: an HTML/JS animation engine.
- `render.py`: renders 1080p/30 fps with Playwright and ffmpeg.
  - Usage: `python3 render.py <firstFrame> <lastFrame> 30 out.mp4`
  - Render in chunks and join them; for 6:26 that is 11,586 frames.
- `preview.py`: saves stills.
  - Usage: `python3 preview.py 3.0 10.5`
- You may rewrite these.

## Workflow
1. Show stills before rendering video.
2. Render the first 60 s for approval, then the rest.
3. Mux with the narration.
4. Final file: `All Saints and All Souls - Father.mp4`.
