const db = require('../db')
const Sequelize = require('sequelize')
const User = require('./user')
const Consumer = require('./consumer')
const Address = require('./address')
const Product = require('./product')
const Order = require('./order')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

// Associations:::
//
Consumer.belongsTo(Address)

// User <-> Product many-to-many:
const Cart = db.define('cart', {
  quantity: Sequelize.INTEGER
})
Product.belongsToMany(User, {through: Cart})
User.belongsToMany(Product, {through: Cart})

// Cart <-> Order many-to-many
Order.hasMany(Cart)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Consumer
}
