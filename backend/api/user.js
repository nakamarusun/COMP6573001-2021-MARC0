const express = require('express')
const { body, validationResult } = require('express-validator')
const admin = require('../admin')
const router = express.Router()
const db = admin.firestore()
const auth = require('../middleware/auth')

router.use('/*', auth)
router.use(express.json())
router.post('/setup', async function(req, res){
  const userUID = res.locals.uid
  const marciUID = req.body.marciUID

  const pairingRef = db.collection('UserMarciPairing').doc(userUID)
  const data = {
    UUID : marciUID
  }

  const response = await pairingRef.set(data)
  console.log(response)
  // Setup to associate user with a particular marci uuid
  // Write this to firestore
})

// Sanitize input first before taking it
router.post('/note', [
  body('content').escape()
] , async function(req, res){
  // Write a note to a particular user firestore, this is either an append or a write operation
  const userUID = res.locals.uid

  const inputErrors = validationResult(req);
  if(!inputErrors.isEmpty()){
    return res.status(400).json({ errors : errors.array() });
  }
  const noteRef = db.collection('UserNotes').doc(userUID)
  const response = await noteRef.set(req.body)
})
module.exports = router
