const express = require('express')
const firebase = require('../firebase')
const router = express.Router()
const db = firebase.firestore();
const auth = require('../middleware/auth')

router.use('/*', auth)
router.post('/setup', function(){
  // Setup to associate user with a particular marci uuid
  // Write this to firestore
})
router.post('/note', function(){
  // Write a note to a particular user firestore, this is either an append or a write operation
})