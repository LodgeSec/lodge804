const express = require('express')
const app = express()

// Serve static files from the "public" directory
app.get('/', function(req, res) {
  res.sendFile(__dirname + 'public/index.html');
});

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
