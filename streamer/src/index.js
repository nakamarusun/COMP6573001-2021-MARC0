require('dotenv').config()

const express = require('express')
const shelljs = require("shelljs")
const path = require("path")
const { Storage } = require('@google-cloud/storage');

// Express app
const app = express()
const port =  process.env.PORT || 80

// Google bucket object
const storage = new Storage();
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_NAME);

// Video directory
const recPath = "tmp/rec/";

// Authenticates the user and checks whether the user is allowed to record
app.get('/on_publish', (req, res) => {
  // TODO: Use JOI
  // TODO: do authentication
  // TODO : Gets the user's uid from the decoded token, do a firebase request to check whether that uid is paired 
  // with the marci that's making this request 

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
app.get("/save_video", (req, res) => {
  // Name is the token of the transmission
  // Path is the location of the flv file
  const { name } = req.query;
  const vidPath = path.resolve(recPath + req.query.path.split("/").pop());

  // TODO: Sends data to firestore that the video is being processed and uploaded

  // Runs the shell script
  shelljs.exec(`${__dirname}/convert.sh ${vidPath}`, (code, stdout, stderr) => {
    if (code !== 0) return res.sendStatus(500);

    // Gets the mp4 file
    const newFile = path.resolve(stdout).trim();

    const uploadOpt = {
      validation: "crc32c",
    }

    // Upload file to bucket
    bucket.upload(newFile, uploadOpt, (err, file) => {
      if (err) {
        console.log(`Uploading ${newFile} to bucket failed!\n ${err}`);
      } else {
        console.log(`Uploaded ${newFile} to bucket!`);
      }

      // Delete file after uploading
      shelljs.rm(newFile);
    });

    return res.sendStatus(201);
  })
})

// TODO: Upload to bucket

app.listen(port, () => {
  console.log(`Streamer module listening at http://localhost:${port}`)
})
