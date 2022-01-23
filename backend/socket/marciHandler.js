const admin = require("../admin");
const db = admin.firestore();

module.exports = function (io, socket) {
  const socketID = socket.id;
  socket.on("marciActivate", function (marciUUID) {
    const marciSocketRef = db.collection("MarciSockets").doc(marciUUID);
    marciSocketRef.set({ socketID: socketID }).then(() => {
      io.to(socketID).emit("marciDetected");
      console.log(`Marci instance connected : ${marciUUID}`);
    });
  });
  socket.on("marciNote", function (marciUUID, content) {
    if (typeof marciUUID === "undefined") return;
    if (typeof content === "undefined") return;

    let uidSnap = db.collection("MarciUserPairing").doc(marciUUID).get("uid");
    uidSnap = uidSnap.data().uid;
    const noteRef = db.collection("UserNotes").doc(uidSnap);
    noteRef
      .get()
      .then((noteSnapshot) => {
        if (noteSnapshot.isEmpty) {
          noteRef.update({
            note: admin.firestore.FieldValue.arrayUnion(content),
          });
        } else {
          noteRef.set({ note: [content] });
        }
      })
      .then(() => {
        return res.sendStatus(200);
      });
  });
};
