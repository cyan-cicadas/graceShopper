const router = require('express').Router()
const Consumer = require('./../db/models')
const Address = require('./../db/models')

router.get('/:consumerid', async (req, res, next) => {
  // need to add "isAdmin"

  try {
    const consumer = await Consumer.findAll(
      {
        where: {
          id: req.params.consumerid
        }
      },
      {
        include: [{model: Address}]
      }
    )

    res.json(consumer)
    res.end()
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  //

  try {
    console.log(req)

    const [instance, wasCreated] = await Consumer.findOrCreate({
      where: req.body
    })

    res.json(instance)

    res.end()
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.put('/:consumerid', async (req, res, next) => {
  try {
    const [numberOfAffectedRows, affectedRows] = await Consumer.update(
      req.body,
      {
        where: {id: req.params.consumerid},
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

router.delete('/:consumerid', async (req, res, next) => {
  try {
    const numAffectedRows = await Consumer.destroy({
      where: {
        id: req.params.consumerid
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
