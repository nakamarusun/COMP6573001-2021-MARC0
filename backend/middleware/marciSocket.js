const admin = require("../admin");
const db = admin.firestore()

async function marciSocket(req, res, next){
  const uid = res.locals.uid;
  const io = req.app.get('socketio')
  let marciUUID = await db.collection('UserMarciPairing').doc(uid).get('UUID')
  marciUUID = (marciUUID.data().UUID)
  let marciSocketID = await db.collection('MarciSockets').doc(marciUUID).get('socketID')
  marciSocketID = (marciSocketID.data().socketID)

  res.locals.marciUUID = marciUUID;
  res.locals.marciSocketID = marciSocketID;
  res.locals.marciSocket = io.sockets.sockets.get(marciSocketID)
  if(typeof res.locals.marciSocket === 'undefined'){
    next(new Error('Socket not found, Marci is inactive'))
  }
  next()
}

module.exports = marciSocket;