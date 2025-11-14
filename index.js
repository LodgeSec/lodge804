const express = require('express');
const path = require('path');

const app = express();

// Serve static files
const fs = require('fs');

// Prefer 'public' directory if it exists, otherwise serve files from repo root
let PUBLIC_DIR = path.join(__dirname, 'public');
if (!fs.existsSync(PUBLIC_DIR)) {
  // fallback to repository root where your HTML files currently live
  PUBLIC_DIR = __dirname;
}

// Serve static files from the chosen directory
app.use(express.static(PUBLIC_DIR));

// Fallback to index.html for single-page style routing
// Use '/*' to avoid path-to-regexp errors with a bare '*'
// Use a regular expression route to match any path and avoid path-to-regexp parsing issues
// Fallback to index.html for single-page style routing
// Use a RegExp route and check for index.html in the chosen PUBLIC_DIR
app.get(/.*/, (req, res) => {
  const indexPath = path.join(PUBLIC_DIR, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  // If there's no index.html, return a helpful message
  res.status(404).send('index.html not found in the public folder or repo root');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));
