const router = require('express').Router()
const {CartItem} = require('./../db/models/index')
const Address = require('./../db/models')
const Order = require('./../db/models/order')
const Product = require('./../db/models/product')

/*

curl localhost:8080/api/cart/1

*/

router.get('/:consumerid', async (req, res, next) => {
  try {
    const currentOrder = await Order.findAll({
      where: {
        consumerId: req.params.consumerid,
        completed: false
      }
    })

    const cart = await CartItem.findAll(
      {
        where: {
          orderId: currentOrder[0].id
        }
      },
      {
        include: [{model: Order}]
      }
    )

    let count = 0

    for (let item of cart) {
      let thisItem = await Product.findById(item.productId)
      cart[count].dataValues.productInfo = thisItem
      count++
    }

    res.json(cart)
    res.end()
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const [instance, wasCreated] = await CartItem.findOrCreate({
      where: req.body
    })

    res.json(instance)

    res.end()
  } catch (error) {
    // console.error(error)
    next(error)
  }
})

/*

thunk will call:

axios.put('/api/cart', { productid : productId, consumerId: consumerId, quantity: quantity })

the route is expecting an object with the above keys

*/

router.put('/', async (req, res, next) => {

  if (req.body.quantity === 0) {
    try {
      const numAffectedRows = await CartItem.destroy({
        where: {
          productId: req.body.productId,
          orderId: req.body.orderId
        }
      })

      res.end(`${numAffectedRows} destroyed`)
    } catch (error) {
      console.error(error)
      next(error)
    }
  } else {
    try {
      const [numberOfAffectedRows, affectedRows] = await CartItem.update(
        {
          quantity: req.body.quantity
        },
        {
          where: {
            productId: req.body.productId,
            orderId: req.body.orderId
          },
          returning: true,
          plain: true
        }
      )

      // res.json(affectedRows.dataValues)
      res.end()
    } catch (error) {
      next(error)
    }
  }
})

router.put('/checkout', async (req, res, next) => {

  // console.log(req.body)

  try {
    const [numberOfAffectedRows, affectedRows] = await Order.update(
      {
        completed: true
      },
      {
        where: {
          id: req.body.orderId
        },
        returning: true,
        plain: true
      }
    )

    res.end()
  } catch (error) {
    next(error)
  }
})

// router.delete('/:cartid', async (req, res, next) => {
//   try {
//     const numAffectedRows = await Cart.destroy({
//       where: {
//         id: req.params.cartid
//       }
//     })

//     res.end(`${numAffectedRows} destroyed`)
//   } catch (error) {
//     console.error(error)
//     next(error)
//   }
// })

router.use((req, res, next) => {
  const err = new Error('API route not found!')
  err.status = 404
  next(err)
})

module.exports = router
