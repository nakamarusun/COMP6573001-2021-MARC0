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

// Create express route
const peerServer = ExpressPeerServer(
  app,
  {
    path: "/marc0webrtc",
    allow_discovery: false,
  }
)

// Open server
app.use("/peer", (req, res, next) => {
  // TODO: Authenticate token and destination marc1 token
  const [ token, destId ] = req.url.split("/")[1].split("_");

  if (true) {
    return peerServer(req, res, next);
  }
  return res.sendStatus(403);
})

app.listen(9003)
