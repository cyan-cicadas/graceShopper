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
      cart[count].productInfo = thisItem
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
    console.error(error)
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const [numberOfAffectedRows, affectedRows] = await CartItem.update(
      req.body,
      {
        where: {id: req.body.productId},
        returning: true,
        plain: true
      }
    )

    res.json(affectedRows.dataValues)
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
