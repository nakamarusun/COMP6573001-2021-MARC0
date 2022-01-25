const admin = require('../admin')
const db = admin.firestore()

module.exports = function(io, socket){
  const socketID = socket.id
  socket.on('marciActivate', function(marciUUID){
    const marciSocketRef = db.collection('MarciSockets').doc(marciUUID)
    marciSocketRef.set({socketID : socketID}).then(() =>{
        io.to(socketID).emit('marciDetected')
        console.log(`Marci instance connected : ${marciUUID}`)
      }
    )
  })
  socket.on('streamFailed', function(){
    // How to talk to frontend here, gatau
  })
  // socket.on("image", ({img, marciUUID}) => {
  //   image = img;
  // })
}