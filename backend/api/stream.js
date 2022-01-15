const express = require('express')
const admin = require('../admin.js')
const router = express.Router()
const db = admin.firestore();
const auth = require('../middleware/auth')

router.use('/*', auth)
router.get('/token', function(req, res){
  // Store user uid in the token. This uid will later be used to query firestore to check if marc1 pairing is indeed correct
  const uid = res.locals.uid  
  admin
    .auth()
    .createCustomToken(uid)
    .then((customToken) => {
      // Sends the token to a marci instance here
      // TODO : communicate with marci when token is created and send that token
      console.log(customToken)
    })
    .catch((error) => {
      console.log('Error when creating token : ', error)
    })

})

module.exports = router