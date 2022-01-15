// Initializes a firebase admin account using service_account.json
const admin = require("firebase-admin");
const serviceAccount = require("./config/service_account.json");
admin.initializeApp({
  credential : admin.credential.cert(serviceAccount)});

module.exports = admin;