# DeluluVerse — The life you didn't choose

**[Play v2](https://deluluverse-nu.vercel.app)** · **[Classic v1](https://deluluverse-nu.vercel.app/v1/)**

A personal, playable “what if?” story about a steady career, an independent idea, and the people you make time for. Fantasy atmosphere; grounded consequences.

## Version 2

Enter a name, an idea, responsibilities and a priority. Play eight chapters spanning one fictional year. Every decision changes story resources and is remembered by later scenes.

- Two beginnings: accept a job or give your idea a defined season.
- Eight decisions, 256 choice sequences, and conditional scenes that remember earlier choices.
- Four explicit fictional resources: breathing room, energy, momentum and connection. These are game mechanics, never forecasts or real-world probabilities.
- Read the immediate consequence before advancing.
- Rewind to any decision, replay, and compare two completed lives.
- A personal letter reflecting your decisions and a practical reflection prompt.
- Local progress and up to four completed alternate timelines; resume and clear controls.
- Copyable ending and decision history, with manual-copy fallback.
- Responsive layout, keyboard controls, focus management and reduced motion.
- No login, backend, database, analytics or AI API. No runtime package dependencies. Google Fonts is optional; system fonts work if unavailable.

This release deliberately develops one coherent career/independent-project story. The founder, 2050, alternate-career and cyberpunk universes remain in Classic v1.

## Honesty and privacy

This is authored interactive fiction, not a prediction engine. It does not estimate income, success odds, personality or future outcomes. Inputs personalize a structured story; they are not sent to an AI model. Name and idea are escaped before rendering. Responsibilities change starting resources; priorities shape reflection text.

V2 uses only the browser key `deluluverse.v2`, validates saved choices, and recomputes state by replaying them. Classic v1 keeps its original storage key. Clearing v2 does not clear v1. Browser storage can be cleared by the browser or user, and is not cross-device storage. If storage is unavailable, the current tab remains playable with a visible notice.

## Run and validate

```bash
python3 -m http.server 4173
# Windows: py -m http.server 4173
node tools/check.mjs
```

Open http://localhost:4173. No install or build step is required. Node.js is needed only for validation.

The check covers all 256 sequences across all nine responsibility/priority combinations (2,304 full playthroughs), every rewind prefix, state bounds, ending variants, invalid saves, JavaScript syntax, local entrypoint assets, and exact v1 preservation. CI runs this same check. These checks do not substitute for browser/device testing.

## Files

- `index.html`, `style.css`, `app.mjs`: v2 interface and browser persistence.
- `engine.mjs`: pure state transition and story engine.
- `v1/index.html`: byte-for-byte preserved original experience.
- `tools/check.mjs`: dependency-free validation.
- `vercel.json`: static deployment and response headers.

## Version preservation

Original v1 is retained at `/v1/` and on GitHub branch [`archive/v1`](https://github.com/Rishikeshsanin/DeluluVerse/tree/archive/v1), based on commit `48598d627938228962bb4b673513633e1e5638aa`.

The deployment uses the existing **DeluluVerse** Vercel project only. No other project or shared infrastructure is required.
