const firebase = require("firebase-admin");
const serviceAccount = require("./config/service_account.json");

firebase.initializeApp(serviceAccount);

module.exports = firebase;