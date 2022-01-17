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

module.exports = admin;