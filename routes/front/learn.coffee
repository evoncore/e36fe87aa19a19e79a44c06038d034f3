express = require 'express'
router = express.Router()

# GET home page.
router.get '/', (req, res, next) ->
  res.render 'learn',
    title: 'Обучение'

module.exports = router
