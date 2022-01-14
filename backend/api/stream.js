const express = require('express')
const firebase = require('../firebase')
const router = express.Router()
const db = firebase.firestore();
const auth = require('../middleware/auth')

router.use('/*', auth)
router.get('/token', function(){
  // Get user's associated marci uuid here through firebase request
  // Put the thing in additional claim so that it can later be matched in the stream server

  // How do i communicate with a marci instance?
})
