const express = require('express')
const bodyParser = require('body-parser')
const app = express()

//  jwt
const jwt = require('jsonwebtoken')

// passport stuff
const passport = require('passport')
const jwtStrategy = require('./strategies/jwt')
passport.use(jwtStrategy)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('hello express server')
})

app.post('/login', (req, res) => {
  let { email, password } = req.body

  // This lookup would be done in a database
  if (email === 'john@email.com') {
    if (password === '1234') {
      const opts = {}
      opts.expiresIn = 120 // 2 minutes
      const secret = 'secretkey'
      const token = jwt.sign({ email }, secret, opts)
      return res.status(200).json({
        message: 'Authentication successful!',
        token,
      })
    }
  }
  return res.status(401).json({ message: 'Incorrect email or password' })
})

app.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    return res.status(200).send('You are authorized to view this page!')
  }
)

app.listen(4000, () => {
  console.log('Server listening on port 4000')
})
