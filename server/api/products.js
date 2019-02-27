const router = require('express').Router()
const Products = require('../db/models')
const Address = require('../db/models')

router.get('/products/', async (req, res, next) => {
  try {
    const Products = await Products.findAll()

    res.json(Products)
    res.end()
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.get('/products/:productid', async (req, res, next) => {
  try {
    const Products = await Products.findAll({
      where: {
        id: req.params.productid
      }
    })

    res.json(Products)
    res.end()
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.post('/products', async (req, res, next) => {
  try {
    const [instance, wasCreated] = await Products.findOrCreate({
      where: req.body
    })

    res.json(instance)

    res.end()
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.put('/products/:productid', async (req, res, next) => {
  try {
    const [numberOfAffectedRows, affectedRows] = await Products.update(
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

router.delete('/products/:productid', async (req, res, next) => {
  try {
    const numAffectedRows = await Products.destroy({
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
