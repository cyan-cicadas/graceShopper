const Sequelize = require('sequelize')
const db = require('../db')

const Address = db.define('address', {
  street: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  zip: {
    type: Sequelize.INTEGER
  }
})

module.exports = Address
