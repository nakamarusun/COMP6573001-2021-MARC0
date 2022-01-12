require('dotenv').config()

const express = require('express')
const shelljs = require("shelljs")

const app = express()
const port =  process.env.PORT || 80

// Authenticates the user and checks whether the user is allowed to record
app.get('/on_publish', (req, res) => {
  // TODO: Use JOI
  // TODO: do authentication
  const { name } = req.query;
  if (name === "marc1")
    return res.sendStatus(201);
  return res.sendStatus(400);
})

// Checks whether the user has permission to play the video
app.get('/on_play', (req, res) => {
  return res.sendStatus(200);
})

// Saves the video and sends it to google bucket
app.get("save_video", (req, res) => {
  // Name is the token of the transmission
  // Path is the location of the flv file
  const {name, path} = req.query;

  // Runs the shell script
  shelljs.exec(`convert.sh ${path}`, (code, stdout, stderr) => {
    if (code !== 0) return res.sendStatus(500);

    // Gets the mp4 file
    const newFile = stdout;

    // TODO: Send to bucket
    console.log(newFile);

    

    // Delete file
    shelljs.rm(newFile);

    return res.sendStatus(201);
  })
})

// TODO: Upload to bucket

app.listen(port, () => {
  console.log(`Streamer module listening at http://localhost:${port}`)
})