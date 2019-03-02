const router = require('express').Router()
const User = require('../db/models/user')
const Consumer = require('../db/models/consumer')
module.exports = router

// full URL path is /auth

router.post('/login', async (req, res, next) => {
  try {
    let validations =
      req.body.password +
      req.body.email +
      req.body.firstName +
      req.body.lastName

    // if (/[^a-zA-Z0-9\-\/]/.test(validations)) {
    //   res.status(401).send('Fields Cannot Contain Special Characters')

    //   return
    // }

    const consumer = await Consumer.findOne({where: {email: req.body.email}})

    if (!consumer) {
      console.log('No such user found:', req.body.email)

      res.status(401).send('Wrong username and/or password')
    } else if (!consumer.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)

      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(consumer, err => (err ? next(err) : res.json(consumer)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    // deconstruct req.body and feed into the model
    // as an object

    let validations =
      req.body.password +
      req.body.email +
      req.body.firstName +
      req.body.lastName

    // if (/[^a-zA-Z0-9\-\/]/.test(validations)) {
    //   console.log('hitting')

    //   res.status(401).send('Fields Cannot Contain Special Characters')
    // } else {
    const newUser = {
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    }

    const consumer = await Consumer.create(req.body)

    req.login(consumer, err => (err ? next(err) : res.json(consumer)))
    // }
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
