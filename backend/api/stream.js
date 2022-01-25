const express = require('express')
const admin = require('../admin.js')
const router = express.Router()
const db = admin.firestore()
const auth = require('../middleware/auth')

const { customAlphabet } = require('nanoid')
const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 12)

router.use('/*', auth)
router.get('/stream', function(req, res){
  // Store user uid in the token. This uid will later be used to query firestore to check if marc1 pairing is indeed correct
  const uid = res.locals.uid;
  const uniqueString = nanoid()
  admin
    .auth()
    .createCustomToken(uniqueString)
    .then(async (customToken) => {
        const io = req.app.get('socketio')
        let marciUUID = await db.collection('UserMarciPairing').doc(uid).get('UUID')
        marciUUID = (marciUUID.data().UUID)
        let marciSocketID = await db.collection('MarciSockets').doc(marciUUID).get('socketID')
        marciSocketID = (marciSocketID.data().socketID)
        
        await db.collection('StreamTokens').doc(uid).set(customToken)

        io.to(marciSocketID).emit('streamRequest', uniqueString)
        const marciSocket = io.sockets.sockets.get(marciSocketID) 
        marciSocket.once('streamStatus', (statusCode) => {
          res.sendStatus(statusCode)
        })
      } 
    )
    .catch((error) => {
      console.log('Error when creating token : ', error)
    })
})

module.exports = router