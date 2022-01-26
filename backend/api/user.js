const express = require('express')
const { body, validationResult } = require('express-validator')
const admin = require('../admin')
const router = express.Router()
const auth = require('../middleware/auth')
const marciSocket = require('../middleware/marciSocket')
const db = admin.firestore()

router.use(express.json())
router.use(express.urlencoded({extended : true}))

router.use('/*', auth)

router.post('/note', [
  body('content').escape()
] , function(req, res){
  if(!inputErrors.isEmpty()) return res.sendStatus(400)
  // Write a note to a particular user firestore, this is either an append or a write operation
  const userUID = res.locals.uid
  const inputErrors = validationResult(req);
  const noteRef = db.collection('UserNotes').doc(userUID)

  noteRef
    .get()
    .then((noteSnapshot => {
      if(noteSnapshot.isEmpty) {
        noteRef.update({
          note : admin.firestore.FieldValue.arrayUnion(req.body.content)
        })
      } else{
        noteRef.set({note : [req.body.content]})
      }
    })).then(() => {
      return res.sendStatus(200)
    })
})

router.post('/setup', [
  body('marciUID').exists()
], async function(req, res){
  const userUID = res.locals.uid
  const marciUID = req.body.marciUID
  
  const inputErrors = validationResult(req)
  if(!inputErrors.isEmpty()){
    return res.sendStatus(400)
  }

  const pairingRef = db.collection('UserMarciPairing').doc(userUID)
  const marciRef = db.collection('MarciUserPairing').doc(marciUID)
  const data = {
    UUID : marciUID
  } 
  const marci = {
    uid : UUID
  }

  await marciRef.set(marci)
  await pairingRef.set(data)
  return res.sendStatus(200)
})

module.exports = router
