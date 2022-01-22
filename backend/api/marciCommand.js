const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()
const auth = require('../middleware/auth')
const marciSocket = require('../middleware/marciSocket')

router.use(express.json())
router.use(express.urlencoded({extended : true}))

router.use('/*', auth)
router.use('/*', marciSocket)
router.post('/move', [
  body('orientation').exists()
], async function(req, res){
  if(!validationResult(req).isEmpty()) return res.status(400)
  const io = req.app.get('socketio')
  io.to(res.locals.marciSocketID).emit('move' + req.body.orientation)
  res.sendStatus(200)
})

module.exports = router
