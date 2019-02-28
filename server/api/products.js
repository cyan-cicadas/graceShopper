const router = require('express').Router()
const Product = require('./../db/models/product')
const Address = require('./../db/models/address')

// total path is /api/product

router.get('/', async (req, res, next) => {
  try {
    const product = await Product.findAll()

    res.json(product)
    res.end()
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.get('/:productid', async (req, res, next) => {
  try {
    const product = await Product.findAll({
      where: {
        id: req.params.productid
      }
    })

    res.json(product)
    res.end()
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const [instance, wasCreated] = await Product.findOrCreate({
      where: req.body
    })

    res.json(instance)

    res.end()
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.put('/:productid', async (req, res, next) => {
  try {
    const [numberOfAffectedRows, affectedRows] = await Product.update(
      req.body,
      {
        where: {id: req.params.productid},
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

router.delete('/:productid', async (req, res, next) => {
  try {
    const numAffectedRows = await Product.destroy({
      where: {
        id: req.params.productid
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

module.exports = router
