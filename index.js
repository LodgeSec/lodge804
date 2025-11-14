const express = require('express');
const path = require('path');

const app = express();

// Serve static files
const fs = require('fs');

// Prefer 'public' directory if it exists, otherwise serve files from repo root
// Candidate locations to look for the site files (in order):
// 1) newlodgesite/public
// 2) working directory's public (process.cwd())
// 3) newlodgesite ( __dirname )
// 4) current working directory (process.cwd())
const candidates = [
  path.join(__dirname, 'public'),
  path.join(process.cwd(), 'public'),
  __dirname,
  process.cwd(),
];

// Pick the first candidate that exists and contains index.html; otherwise pick the first existing dir
let PUBLIC_DIR = candidates.find(dir => fs.existsSync(path.join(dir, 'index.html')));
if (!PUBLIC_DIR) {
  PUBLIC_DIR = candidates.find(dir => fs.existsSync(dir));
}
if (!PUBLIC_DIR) {
  // as a last resort, use __dirname
  PUBLIC_DIR = __dirname;
}

// Serve static files from the chosen directory
app.use(express.static(PUBLIC_DIR));

// Fallback to index.html for single-page style routing
app.get(/.*/, (req, res) => {
  const indexPath = path.join(PUBLIC_DIR, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  // If there's no index.html, return a helpful message listing checked paths
  res.status(404).send('index.html not found in any checked locations: ' + candidates.join(', '));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port} (serving ${PUBLIC_DIR})`));
