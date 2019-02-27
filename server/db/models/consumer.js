const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Consumer = db.define('consumer', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  }
})

module.exports = Consumer

/**
 * instanceMethods
 */
Consumer.prototype.correctPassword = function(candidatePwd) {
  return Consumer.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
Consumer.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

Consumer.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = consumer => {
  if (consumer.changed('password')) {
    consumer.salt = Consumer.generateSalt()
    consumer.password = Consumer.encryptPassword(
      consumer.password(),
      consumer.salt()
    )
  }
}

Consumer.beforeCreate(setSaltAndPassword)
Consumer.beforeUpdate(setSaltAndPassword)
Consumer.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})
