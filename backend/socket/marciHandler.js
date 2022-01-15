const admin = require('../admin')
const db = admin.firestore()
module.exports = function(io, socket){
  const socketID = socket.id
  socket.on('marci-activate', function(marciUUID){
    // Do firebase request here
    const marciSocketRef = db.collection('MarciSockets').doc(marciUUID)
    marciSocketRef.set({socketID : socketID}).then(
      io.to(socketID).emit('marci-detected')
    )
  })
}