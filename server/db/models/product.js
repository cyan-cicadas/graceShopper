const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  varietal: {
    type: Sequelize.ENUM,
    values: ['Beef', 'Pork', 'Chicken', 'Lamb']
  },
  cut: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.SMALLINT,
    validate: {
      min: 0
    }
  },
  weight: {
    type: Sequelize.SMALLINT,
    validate: {
      min: 0
    }
  },
  price: {
    type: Sequelize.SMALLINT,
    validate: {
      min: 0
    }
  }
})

module.exports = Product
