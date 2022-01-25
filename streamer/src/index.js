require('dotenv').config()

const express = require('express')
const shelljs = require("shelljs")
const path = require("path")
const { Storage } = require('@google-cloud/storage');
const admin = require('./admin')
const db = admin.firestore()
const { nanoid } = require("nanoid");
const fs = require("fs");

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
    
  // const { name } = req.query;
  const { name, swfurl } = req.query;
  const [ uniqueString, marciUUID, uid ] = name.split('?');

  // console.log(name);
  // console.log(swfurl);
  // const [ token, marciUUID ] = name.split('?');

  if (['marc1', 'marc2', 'marc3', 'marc4'].includes(name)) {
    return res.sendStatus(201);
  }

  admin
    .auth()
    .createCustomToken(uniqueString)
    .then(async (generatedToken) => {
      const dbMarciUUID = await db.collection('UserMarciPairing').doc(uid).get('UUID')
      dbMarciUUID = dbMarciUUID.data().UUID

      const dbToken = await db.collection('StreamTokens').doc(uid).get('token')
      dbToken = dbToken.data().token

      if(dbMarciUUID === marciUUID && dbToken === generatedToken){
        console.log('All systems green')
        res.sendStatus(201);
        db.collection('StreamTokens').doc(uid).delete()
      }
    })
  // admin
  //   .auth()
  //   .verifyIdToken(token)
  //   .then((verifiedToken) => {
  //     const uid = verifiedToken.uid;
  //     const dbMarciUUID = db.collection('UserMarciPairing').doc(uid).get('UUID')
  //     if(dbMarciUUID === marciUUID){
  //       console.log('All systems green, ping back to marci now')
  //       res.sendStatus(201);
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //     return res.sendStatus(400);
  //   })
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
  const [ token, marciUUID ] = name.split('?');
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
        return console.log(`Uploading ${newFile} to bucket failed!\n ${err}`);
      }
      console.log(`Uploaded ${newFile} to bucket!`);

      // Uploads data to firestore
      // admin
      //   .auth()
      //   .verifyIdToken(token)
      //   .then((verifiedToken) => {
          // const uid = verifiedToken.uid;
          const uid = "riHCMWFMgsWkQJ0pd7ss1JIPmC63";
          const videoRef = db.collection("Videos").doc(uid);
          videoRef.update({
            videos: {
              [ nanoid() ]: {
                name: file.name,
                date: fs.statSync(vidPath).birthtime,
                path: file.path,
                bucket: process.env.GCLOUD_STORAGE_NAME,
              }
            }
          })
        // });

      // Delete file after uploading
      shelljs.rm(vidPath);
      shelljs.rm(newFile);
    });

    return res.sendStatus(201);
  })
})

app.listen(port, () => {
  console.log(`Streamer module listening at http://localhost:${port}`)
})
