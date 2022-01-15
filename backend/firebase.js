const firebase = require("firebase-admin");
const serviceAccount = require("./config/service_account.json");
firebase.initializeApp({
  credential : firebase.credential.cert(serviceAccount)});

module.exports = firebase;