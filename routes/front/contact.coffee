express = require 'express'
router = express.Router()

# GET home page.
router.get '/', (req, res, next) ->
  res.render 'contact',
    title: 'Контакты'

module.exports = router
