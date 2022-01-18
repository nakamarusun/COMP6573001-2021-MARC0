const express = require('express')
const { body, validationResult } = require('express-validator')
const auth = require('../middleware/auth')
const admin = require('../admin')
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const router = express.Router()
const db = admin.firestore()

router.use(express.json())
router.use(express.urlencoded({extended : true}))
router.use('/*', auth)

/**
 * Lists all the videos that the user owns along with the metadata
 */
router.get("/videos", (req, res) => {
  const userUID = res.locals.uid
  const videoRef = db.collection("Videos").doc(userUID);

  // Gets data
  videoRef
    .get()
    .then((dat) => {
      return res.send(dat.data());
    })
})

/**
 * Gets a specific video data
 */
router.get("/video/:id", (req, res) => {
  const { id } = req.params;
  const userUID = res.locals.uid
  const videoRef = db.collection("Videos").doc(userUID);

  // Gets data
  videoRef
    .get()
    .then((dat) => {
      if (!dat.exists) return res.sendStatus(404);
      const { videos } = dat.data();

      if (!videos) return res.sendStatus(404);

      const item = videos[id];
      if (!item) return res.sendStatus(404);

      // Get authenticated url
      const bucket = storage.bucket(item.bucket);
      bucket
        .file(item.name)
        .getSignedUrl({
          action: "read",
          expires: Date.now() + 60*60*1000, // One hour
          version: "v4",
        })
        .then((url) => {
          res.send({
            url,
            name: item.name,
            date: item.date
          })
        })

      return res.send(item);
    })
});
