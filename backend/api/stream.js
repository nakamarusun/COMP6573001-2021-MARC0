const express = require('express')
const admin = require('../admin.js')
const router = express.Router()
const db = admin.firestore();
const auth = require('../middleware/auth')

// Should probably put this in a service layer xd
const requestStreamToMarci = async (customToken) => {
  const io = req.app.get('socketio')
  const marciUUID = await db.collection('UserMarciPairing').doc(customToken.uid).get('UUID')
  const marciSocket = await db.collection('MarciSockets').doc(marciUUID).get('SocketID')
  io.to(marciSocket).emit('streamRequest', customToken)
}

router.use('/*', auth)
router.get('/stream', function(req, res){
  // Store user uid in the token. This uid will later be used to query firestore to check if marc1 pairing is indeed correct
  const uid = res.locals.uid  
  admin
    .auth()
    .createCustomToken(uid)
    .then(requestStreamToMarci)
    .catch((error) => {
      console.log('Error when creating token : ', error)
    })
})

module.exports = router