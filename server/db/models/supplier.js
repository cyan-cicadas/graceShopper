const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Supplier = db.define('supplier', {
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
  },
})

module.exports = Supplier

/**
 * instanceMethods
 */
Supplier.prototype.correctPassword = function(candidatePwd) {
  return Supplier.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
Supplier.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

Supplier.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = supplier => {
  if (supplier.changed('password')) {
    supplier.salt = Supplier.generateSalt()
    supplier.password = Supplier.encryptPassword(supplier.password(), supplier.salt())
  }
}

Supplier.beforeCreate(setSaltAndPassword)
Supplier.beforeUpdate(setSaltAndPassword)
Supplier.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})
