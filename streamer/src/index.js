const express = require('express')
const app = express()
const port =  process.env.PORT || 80

app.get('/on_publish', (req, res) => {
  // TODO: Use JOI
  // TODO: do authentication
  const { name } = req.query;
  if (name === "marc1")
    return res.sendStatus(201);
  return res.sendStatus(400);
})

app.get('/on_play', (req, res) => {
  return res.sendStatus(201);
})

// TODO: Upload to bucket

app.listen(port, () => {
  console.log(`Streamer module listening at http://localhost:${port}`)
})