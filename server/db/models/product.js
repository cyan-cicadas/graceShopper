const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cut: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price_per_pound: {
    type: Sequelize.FLOAT,
    validate: {
      min: 0
    }
  },
  imgUrl: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

module.exports = Product
