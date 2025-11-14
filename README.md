# Alpha Xi  The Lodge (newlodgesite)

This folder contains a small, static brochure website for Alpha Xi (The Lodge) at Stevens Institute of Technology. The site is intentionally lightweight and easy to edit  perfect for simple hosting or conversion to a static-site generator later.

## Key pages
- index.html  Home
- bout.html  About (site-wide boilerplate)
- rothers.html  Brothers (tabbed roster with site-wide search and runtime dedupe)
# Alpha Xi — The Lodge (newlodgesite)

This folder contains a small, static brochure website for Alpha Xi (The Lodge) at Stevens Institute of Technology. The site is intentionally lightweight and easy to edit — suitable for simple hosting or conversion to a static-site generator.

## Key pages
- `index.html` — Home
- `about.html` — About
- `brothers.html` — Brothers (tabbed roster with search across years)
- `officers.html` — Officers
- `alumni.html` — Alumni
- `history.html` — History
- `peermentorship.html` — Peer Mentorship
- `contact.html` — Contact

## Notable updates
- Contact page: centered card layout, improved form styling, and responsive label placement.
- Brothers roster: search works across all class years and duplicate names are filtered at runtime.
- Alumni page: reformatted into responsive cards and semantic lists.
- History: expanded intro and a clearer Programs & Leadership section.

## Assets
- `assets/styles.css` — site styles
- `assets/scripts.js` — small client JS (nav, tabs, roster search & dedupe, contact handling)
- `assets/logo.png` — site logo (replace with approved artwork)

## Preview locally
Prefer running a local server so relative links behave correctly.

PowerShell (simple Python server):

```powershell
cd "c:\Users\micha\OneDrive\Documents\lodge804site\newlodgesite"
python -m http.server 8000; Start-Process http://localhost:8000
```

Using npm scripts (dev dependencies included):

```powershell
cd "c:\Users\micha\OneDrive\Documents\lodge804site\newlodgesite"
npm install
npm run dev
```

Or run a simple static server:

```powershell
npm start
```

## Next steps & suggestions
- Replace placeholder images and logo in `assets/`.
- Add server-side form handling or a third-party form service for the contact form.
- Improve accessibility (labels, aria attributes, keyboard focus states).
- Optional: convert to a static-site generator (Eleventy, Hugo) for easier content updates.

If you'd like, I can also:
- Permanently remove duplicate roster entries from the HTML.
- Add match highlighting and a match count to the roster search.
- Add deployment config (GitHub Pages, Netlify, or Docker).

If you want any wording, styling, or content changes, tell me what to update and I'll apply the edits.
If you'd like any wording, styling, or content changes, tell me what to update and I'll apply the edits.
