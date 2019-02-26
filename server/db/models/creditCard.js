const Sequelize = require('sequelize')
const db = require('../db')

const Address = db.define({
  issuer: {
    type: Sequelize.ENUM('Visa', 'MasterCard,', 'Discover', 'Amex')
  },
  number: {
    type: Sequelize.BIGINT
  },
  month: {
    type: Sequelize.TINYINT,
    validate: {
      max: 12,
      min: 1
    }
  },
  year: {
    type: Sequelize.INTEGER,
    validate: {
      max: 2040,
      min: 2019
    }
  },
  threeDigit: {
    type: Sequelize.INTEGER
  }
})
