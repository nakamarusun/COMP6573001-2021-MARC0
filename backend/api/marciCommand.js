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
  io.to(res.locals.marciSocketID).emit('move', req.body.orientation)
  res.locals.marciSocket.once('moveStatus', function(statusCode){
    
    res.sendStatus(statusCode)
  })
})
router.post('/listen', function(req, res){  
  const io = req.app.get('socketio')
  io.to(res.locals.marciSocketID).emit('listen')
  res.locals.marciSocket.once('listenStatus', function(statusCode){
    console.log('Marci is now listening')
    res.sendStatus(statusCode)
  })
})

module.exports = router
