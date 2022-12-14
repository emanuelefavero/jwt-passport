const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'secretkey'

module.exports = new JwtStrategy(opts, (jwt_payload, done) => {
  // TODO: find user in db using User.findOne or User.findById
  if (jwt_payload.email === 'john@email.com') {
    return done(null, true)
  }
  return done(null, false)
})
