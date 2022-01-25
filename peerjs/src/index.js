// Initializes a firebase admin account using service_account.json
const admin = require("firebase-admin");

// Check if the credentials are already loaded from the env
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  const serviceAccount = require("./config/service_account.json");
  admin.initializeApp({
    credential : admin.credential.cert(serviceAccount)});
} else {
  admin.initializeApp();
}

// Start up server
const { ExpressPeerServer } = require("peer");
const express = require("express");

const app = express();
const server = app.listen(9003);

// Create express route
const peerServer = ExpressPeerServer(
  server,
  {
    path: "/marc0webrtc",
    allow_discovery: false,
  }
);

app.use('/peer', peerServer);

// Authenticate users
peerServer.on('connection', client => {
  const { token } = client;

  // admin
  //   .auth()
  //   .verifyIdToken(token)
  //   .then((verifiedToken) => {
  //     const uid = verifiedToken.uid;
  //     const dbMarciUUID = db.collection('UserMarciPairing').doc(uid).get('UUID')
  //     if(dbMarciUUID !== marciUUID){
  //       console.log(`Rejecting token ${token}`);
  //       client.socket.close()
  //     }
  //   })
  //   .catch((err) => {
  //     console.error(err)
  //     client.socket.close()
  //   })
})