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

Consumer.belongsTo(Address)

// User <-> Product many-to-many:

const Cart = db.define('cart', {
  quantity: Sequelize.INTEGER
})

Product.belongsToMany(Consumer, {through: Cart})

Consumer.belongsToMany(Product, {through: Cart})

// Cart <-> Order many-to-many

Product.hasMany(Order) // the product is defined on the order

Order.hasMany(Cart)

/* 

orders have a productId, quantity, weight, and completed status

techboyz=# select * from orders;
 id | quantity | weight | completed | createdAt | updatedAt | productId
----+----------+--------+-----------+-----------+-----------+-----------
(0 rows)

the cart associates the order with the consumer

techboyz=# select * from carts;
 createdAt | updatedAt | consumerId | productId | orderId
-----------+-----------+------------+-----------+---------
(0 rows)


	User -> One to Many -> Orders
    
    Order -> Many to Many -> Products
    
    Cart is property of Order

*/

/*

 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')

*/

module.exports = {
  Consumer,
  Product,
  Order
}
