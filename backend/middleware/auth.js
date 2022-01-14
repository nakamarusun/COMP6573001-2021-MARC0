function authenticated(req, res, next){
  // Verify user using the provided idtoken in req
  // Format is "Bearer <token>"

  // Once verified, attach user uid to res to later user for writing n stuff
  next()
}
module.exports = authenticated;