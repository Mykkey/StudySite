# StudySite

Offline exam-revision site for 4th year CSIT: CT4100, CT417, CT4111, CT4101, CT4107, CT561.

## Open it
Online: https://mykkey.github.io/StudySite/

Locally:
In this folder run `python -m http.server 8765`, then visit http://localhost:8765 (Ctrl+F5 if a page looks stale).
Press `?` on any page for keyboard shortcuts.

## Editing content
- Source lives in `src/<MODULE>/*.js` (schema in `tools/SCHEMA.md`). `data/<MODULE>.js` is generated: do not edit it.
- `node tools/build.js [MODULE]` then `node tools/validate.js [MODULE]` then `node tools/checkdiagrams.js`.
- Lecturer hints go in the `hints` block of `src/<MODULE>/meta.js` (CT417 only so far).
- Progress (topic ticks, flashcard know/learning) is stored in your browser's localStorage.
