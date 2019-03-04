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

// Associations

const CartItem = db.define('cartitem', {
  quantity: Sequelize.INTEGER
})

// Consumer.belongsTo(Address)

Product.belongsToMany(Order, {through: CartItem})

Order.belongsToMany(Product, {through: CartItem})

Order.belongsTo(Consumer)

Consumer.hasMany(Order)

Order.belongsTo(Address)

//Address.hasOne(Consumer)

/*

techboyz=# select * from products;
 id |             name             |  cut   | category | price_per_pound | imgUrl |         createdAt          |         updatedAt


techboyz=# select * from cartitems;
 quantity | createdAt | updatedAt | productId | orderId
----------+-----------+-----------+-----------+---------


techboyz=# select * from orders;
 id | completed | createdAt | updatedAt | consumerId | addressId
----+-----------+-----------+-----------+------------+-----------
(0 rows)

techboyz=# select * from consumers;
 id | firstName | lastName |      email       |                             password                             |           salt           |         createdAt          |         updatedAt          | addressId
----+-----------+----------+------------------+------------------------------------------------------------------+--------------------------+----------------------------+----------------------------+-----------
*/

/*

 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')

*/

module.exports = {
  CartItem,
  Consumer,
  Product,
  Order
}
