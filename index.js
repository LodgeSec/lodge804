const express = require('express')
const app = express()

// Serve static files from the "public" directory
app.use(express.static('public', {index: 'Home.html'}))

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
