const express = require('express')
const firebase = require('../firebase.js')
const router = express.Router()
const db = firebase.firestore();
const auth = require('../middleware/auth')

router.use('/*', auth)
router.get('/token', function(req, res){
  // Store user uid in the token. This uid will later be used to query firestore to check if marc1 pairing is indeed correct
  const uid = res.locals.uid
  firebase
    .auth()
    .createCustomToken(uid)
    .then((customToken) => {
      console.log(customToken)
    })
    .catch((error) => {
      console.log('Error when creating token : ', error)
    })
  // How do i communicate with a marci instance?
})
router.get('/testverify', function(){  
  let token = ''
  firebase
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      const uid = decodedToken.uid
    })
    .catch((error) => {
      console.log(error)
    })
})

module.exports = router