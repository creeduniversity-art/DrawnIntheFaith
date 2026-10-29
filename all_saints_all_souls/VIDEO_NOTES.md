# All Saints and All Souls: chibi-style video

Final file: `output/All Saints and All Souls - Father.mp4` (1920×1080, 30 fps, 6:26, narration muxed). It is too large for git, so download it from the session.

## Style
- **Same look as the approved Holy Spirit video.** Chibi characters with faces, expressions and talking mouths. Painterly single-hue backgrounds with parallax, white Montserrat titles, whip transitions, colour strips and question-mark swarms.
- **Characters with faces:** the project CLAUDE.md still says "faceless". This video uses faces because the owner approved that style after the Holy Spirit sample.
- **New for this video:**
  - Skin tones.
  - New outfits: papal mitres (Gregory III and IV), a helmet for Judas Maccabeus, Dominican and Carmelite habits (Dominic, Thérèse), Benedictine monks (Odilo), and a halo-and-cape saint costume for Halloween.
  - New settings: a heaven of outlined clouds, and a warm golden-hour cemetery that is never spooky.
- **Sync:** every element appears on its word: the word timestamp + 0.25 s. The narration's timestamps run 0–0.47 s ahead of the audible word (median 0.22 s).

## The 42 beats
All 42 storyboard beats are kept at their storyboard timestamps. The previous version's text was trimmed wherever a picture says it.

## Facts and sources on screen
| On screen | Source |
|---|---|
| Three states of the Church; pilgrims, purified, in glory | CCC 954 |
| Bond not broken by death | CCC 955 |
| Canonization: "solemnly proclaims… heroic virtue… fidelity to God's grace"; models and intercessors | CCC 828 |
| "a great multitude which no man could number…" (read at Mass on All Saints' Day) | Revelation 7:9 |
| Worship belongs to God alone | (narration; no citation shown) |
| Saints "so closely united to Christ… do not stop interceding for us"; St Dominic's and St Thérèse's words | CCC 956, which quotes both |
| St Dominic 1221; St Thérèse 1897 (years of their deaths) | CCC 956 notes |
| Universal call to holiness | CCC 2013 |
| Purification after death | CCC 1030 |
| "entirely different from the punishment of the damned" | CCC 1031 |
| "…made atonement for the dead, that they might be delivered from their sin." | 2 Maccabees 12:46 |
| Mass, almsgiving, penance, indulgences | CCC 1032 |
| Our prayer "capable not only of helping them, but also of making their intercession for us effective" | CCC 958 |
| Plenary indulgence for the souls in purgatory, Nov 1–8 (cemetery visit); Nov 2 church visit with Our Father and Creed; the four conditions; partial if not all conditions | Apostolic Penitentiary, Enchiridion of Indulgences, grant 29 |
| Nov 1, 2026 is a Sunday; Nov 2 is a Monday | Calendar |
| Gregory III (700s, chapel in St Peter's); Gregory IV (~100 years later, extended the feast to the whole Church) | Storyboard / narration |
| St Odilo of Cluny, around the year 1000 | Storyboard / narration |
| Eternal rest prayer | Traditional prayer |

## Rebuilding
- `cd engine`, then `node preview.js <times…>` for stills.
- `node render.js 0 11584 30 out.mp4 4` for the video, then mux with `audio/all_saints_all_souls_narration.mp3`.
- Engine, art and characters are shared with the Holy Spirit project. `props2.js` holds this video's props, and `scenes.js` holds the timeline.
