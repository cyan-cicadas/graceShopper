const router = require('express').Router()
const {CartItem} = require('./../db/models/index')
const Address = require('./../db/models')
const Order = require('./../db/models/order')
const Product = require('./../db/models/product')

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

    console.log(cart)

    res.json(cart)
    res.end()
  } catch (error) {
    console.log(error)
    next(error)
  }
})
/*
router.post('/', async (req, res, next) => {
  //

  try {
    console.log(req)

    const [instance, wasCreated] = await Cart.findOrCreate({
      where: req.body
    })

    res.json(instance)

    res.end()
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.put('/:cartid', async (req, res, next) => {
  try {
    const [numberOfAffectedRows, affectedRows] = await Cart.update(
      req.body,
      {
        where: {id: req.params.cartid},
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

router.delete('/:cartid', async (req, res, next) => {
  try {
    const numAffectedRows = await Cart.destroy({
      where: {
        id: req.params.cartid
      }
    })

    res.end(`${numAffectedRows} destroyed`)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.use((req, res, next) => {
  const err = new Error('API route not found!')
  err.status = 404
  next(err)
})
*/
module.exports = router
