const express = require('express')
const { body, validationResult } = require('express-validator')
const admin = require('../admin')
const router = express.Router()
const db = admin.firestore()
const auth = require('../middleware/auth')

router.use(express.json())
router.use(express.urlencoded({extended : true}))
router.post('/move', function(req, res){
  console.log(req.body.orientation)
  const io = req.app.get('socketio')
  io.emit('move' + req.body.orientation)
  return 200
})
router.use('/*', auth)
router.post('/note', [
  body('content').escape()
] , function(req, res){
  // Write a note to a particular user firestore, this is either an append or a write operation
  const userUID = res.locals.uid
  const inputErrors = validationResult(req);
  if(!inputErrors.isEmpty()){
    return res.status(400).json({ errors : inputErrors.array() });
  }
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
  const data = {
    UUID : marciUID
  }

  await pairingRef.set(data)
  return res.sendStatus(200)
})

// Sanitize input first before taking it, NOTE : using postman's form-data to test this will not work.
router.post('/note', [
  body('content').escape().isLength({min : 3})
] , async function(req, res){
  // Write a note to a particular user firestore, this is either an append or a write operation
  const userUID = res.locals.uid
  const inputErrors = validationResult(req);
  if(!inputErrors.isEmpty()){
    return res.status(400).json({ errors : inputErrors.array() });
  }
  const noteRef = db.collection('UserNotes').doc(userUID)
  await noteRef.update({
    note : admin.firestore.FieldValue.arrayUnion(req.body.content)
  })
  return res.sendStatus(200)
})

module.exports = router
