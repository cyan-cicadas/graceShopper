'use strict'

const db = require('../server/db')
const Consumer = require('../server/db/models/consumer')
const Product = require('../server/db/models/product')
const Order = require('../server/db/models/order')
const {CartItem} = require('../server/db/models/index')

async function seed() {
  await db.sync({force: true})

  const consumers = await Promise.all([
    Consumer.create({
      firstName: 'T Bone',
      lastName: 'Burnette',
      email: 't_bone@email.com',
      password: '12345'
    }),

    Consumer.create({
      firstName: '2na',
      lastName: 'Phish',
      email: '2na@email.com',
      password: '123'
    }),

    Consumer.create({
      firstName: 'Powk',
      lastName: 'Chopper',
      email: 'powk@email.com',
      password: '123'
    })
  ])

  const orders = await Promise.all([
    Order.create({
      completed: true,
      consumerId: 1
    }),
    Order.create({
      completed: false,
      consumerId: 1
    })
  ])

  const meatcutz = await Promise.all([
    Product.create({
      name: 'Rib Steak',
      cut: 'Prime',
      category: 'Beef',
      price_per_pound: 10.0
    }),

    Product.create({
      name: 'Top Sirloin Steak',
      cut: 'Top',
      category: 'Beef',
      price_per_pound: 20.0
    }),

    Product.create({
      name: 'Bone-In Butt Roast',
      cut: 'decent',
      category: 'Pork',
      price_per_pound: 10.0
    }),

    Product.create({
      name: 'Pasture-Raised Whole Chicken',
      cut: 'Medium',
      category: 'Chicken',
      price_per_pound: 10.0
    }),

    Product.create({
      name: 'Rack of Lamb, Frenched',
      cut: 'Choice',
      category: 'Lamb',
      price_per_pound: 8.0
    })
  ])

  const cartitems = await Promise.all([
    CartItem.create({
      orderId: 1,
      productId: 3,
      quantity: 15
    }),

    CartItem.create({
      orderId: 1,
      productId: 2,
      quantity: 20
    }),

    CartItem.create({
      orderId: 2,
      productId: 3,
      quantity: 15
    }),

    CartItem.create({
      orderId: 2,
      productId: 4,
      quantity: 20
    })
  ])

  console.log('db synced!')
  console.log(`seeded ${consumers.length} users`)
  console.log(`seeded successfully`)
  // console.log(db)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
