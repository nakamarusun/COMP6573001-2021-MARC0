function authenticated(req, res, next){
  // Verify user using the provided idtoken in req
  // Format is "Bearer <token>"

  next()
}
module.exports = authenticated;