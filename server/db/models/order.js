const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  // quantity: {
  //   type: Sequelize.INTEGER,
  //   validate: {
  //     min: 0
  //   }
  // },
  // weight: {
  //   type: Sequelize.INTEGER,
  //   validate: {
  //     min: 0
  //   }
  // },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Order
