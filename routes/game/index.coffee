express = require 'express'
router = express.Router()

# GET home page.
router.get '/', (req, res, next) ->
  res.render '../game/index',
    title: 'Game'

module.exports = router
