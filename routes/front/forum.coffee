express = require 'express'
router = express.Router()

# GET home page.
router.get '/', (req, res, next) ->
  res.render 'forum',
    title: 'Форум'

module.exports = router
