const express = require('express')
const firebase = require('../middleware/firebase')
const router = express.Router()
const db = firebase.firestore();
const auth = require('../middleware/auth')

router.use('/*', auth)

