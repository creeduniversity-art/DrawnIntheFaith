# Holy Spirit: full video (chibi style)

Output: `output/holy_spirit_full.mp4`: 1920×1080, 30 fps, 4:29.8, narration `audio/holy_spirit_full.mp3`.

## Look
- **Characters:** the chibi redesign approved on the character sheet (`output/character_sheet.png`). Round faces with dot eyes, expressive mouths and brows, thick outlines, soft shading and detailed costumes.
- **Animation:** posed arms that move on cue, expression changes on key words, blinking, and mouths that flap on the audio's word timings when a character is speaking.
- **Backgrounds, titles and transitions:** the same as the approved 60 s sample. Painterly single-hue backgrounds with parallax, white Montserrat titles, whip pans, colour strips and question-mark swarms.
- **Sync:** every element appears on its word: the word timestamp + 0.25 s. Across the whole narration, the timestamps run ~0.1–0.4 s ahead of the audible word.

## Shot list (≈60 scenes)
| Time | Narration | On screen |
|---|---|---|
| 0–25 | Acts 19 question; "a lot of Catholics…"; "We know the Father… Jesus… the Holy Spirit?"; dove on a banner; Sign of the Cross | Bible → Paul and the believers in Ephesus → their quote with a "?" swarm → Father and confused teens → three colour strips → church interior with banner, dove and Sign of the Cross text |
| 25–40 | "let's fix that"; title; "stay to the end… one-line prayer" | "?" turns into "!"; WHO IS THE HOLY SPIRIT?; progress bar to a finish flag; scroll, church and people at prayer through the centuries |
| 40–60 | Part 1: not a force/feeling/energy; a person; the Trinity; the Creed; the Counselor | X'd colour strips; dove; Trinity diagram; Father with a book and flowers on "giver of life"; Jesus and the "THE COUNSELOR" name tag |
| 60–71 | "stands by your side, helps you, speaks up for you"; John 14:26 | Dove arrives beside a worried girl and lifts her heavy rock away, with a heart speech bubble; Jesus speaks the quote |
| 71–84 | Peter's denial | Spotlight on Saint Peter; evening courtyard with a fire; "×3"; servant girl points |
| 84–101 | Pentecost | "50 DAYS AFTER EASTER" calendar; apostles and Mary in the upper room; wind; tongues of fire land on each head; Acts 2:2 and 2:4 quotes; PENTECOST title |
| 101–120 | Peter preaches; about 3,000 baptized; "Same Peter. Different power." | Bold Peter with a flame; a memory bubble of scared Peter; he preaches to a crowd; counter to 3,000; scared vs bold strips |
| 120–138 | Given to you; Baptism, Confirmation; 1 Cor 6:19; "God lives in you" | Father points at the viewer; baptism at the font; bishop in a mitre anointing at Confirmation; Paul writing; temple outline around a teen; dove flies from "near" to "in" |
| 138–178 | Part 2: gifts and fruits; the seven gifts | Gift box and basket; CCC 1831 and "7"; toolbox in his hands; one vignette per gift with a progress row of 7 icons; recap of all 7 |
| 178–205 | Fruits; the twelve; the test; tree and fruit | A tree grows fruit; 12 fruit cards popping in on their words (CCC 1832); bar chart; apple drops into his hands |
| 205–227 | He helps you pray; Romans 8:26 | Girl praying; boy with an empty "…" bubble; Paul writing; the Romans quote in two parts with dove and sighs; heart glow "praying in you" |
| 227–247 | The prayer | Father and the scroll; prayer through the centuries; CCC 2671; "Come, Holy Spirit…" kinetic prayer with hearts and flame; 4-panel comic (test, hard talk, waking up, crossroads) → "Come, Holy Spirit." |
| 247–270 | Challenge, fruits, outro | YOUR CHALLENGE; 7-day row, alarm, phone → prays; binoculars and bar chart (peace, patience, courage); dove flies into his heart; share with a friend; Father waves with a SUBSCRIBE button |

## Sources for on-screen text and facts
- Acts 19:2 (both quotes; the first is shortened exactly as narrated).
- Sign of the Cross: Mt 28:19; CCC 2157.
- Not a force/feeling/energy; third Person; fully God: CCC 253–255, 685.
- "the Lord, the giver of life": Nicene Creed.
- "Counselor" / "he will teach you all things": John 14:26 (RSV-CE).
- Peter's three denials; the first to a servant girl: Mk 14:66–72; Lk 22:56–57; Jn 18:17.
- Pentecost fifty days after Easter: CCC 731. Mary with the apostles: Acts 1:14.
- "like the rush of a mighty wind": Acts 2:2. Tongues as of fire: Acts 2:3. "And they were all filled with the Holy Spirit": Acts 2:4.
- Peter preaches; about three thousand baptized: Acts 2:14–41.
- Given at Baptism and Confirmation: CCC 1265, 1302–1303. Red vestments and a mitre for the bishop at Confirmation.
- "Do you not know that your body is a temple…": 1 Cor 6:19.
- Seven gifts: CCC 1831. Twelve fruits: CCC 1832.
- Tree known by its fruit: Mt 7:16–20; Lk 6:44.
- "the Spirit helps us in our weakness…": Romans 8:26.
- "Come, Holy Spirit, fill the hearts of your faithful…": CCC 2671.

## Files
- `engine/chibi.js`: character builder (faces, outfits, poses).
- `engine/props.js`: props and room backgrounds.
- `engine/scenes.js`: the full timeline.
- `engine/scenes_sample60.js`: the earlier 60-second sample.
- `engine/charsheet.html`: the character sheet.
- To render: `node render.js 0 8094 30 out.mp4 4`, then mux with the narration.
