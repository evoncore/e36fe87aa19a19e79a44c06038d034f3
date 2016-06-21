express = require 'express'
path = require 'path'
favicon = require 'serve-favicon'
logger = require 'morgan'
cookieParser = require 'cookie-parser'
bodyParser = require 'body-parser'

about = require './routes/front/index'
learn = require './routes/front/learn'
patches = require './routes/front/patches'
leaders = require './routes/front/leaders'
forum = require './routes/front/forum'
contact = require './routes/front/contact'
game = require './routes/game/index'

app = express()

# view engine setup
app.set 'views', path.join __dirname, 'views/front/'
app.set 'view engine', 'jade'

# uncomment after placing your favicon in /public
# app.use favicon "#{__dirname}/public/favicon.ico"
app.use logger 'dev'
app.use bodyParser.json()
app.use bodyParser.urlencoded
  extended: false
app.use cookieParser()
app.use express.static path.join __dirname, 'public'

app.use '/', about
app.use '/learn', learn
app.use '/patches', patches
app.use '/leaders', leaders
app.use '/forum', forum
app.use '/contact', contact
app.use '/game', game

# catch 404 and forward to error handler
app.use (req, res, next) ->
    err = new Error 'Not Found'
    err.status = 404
    next err

# error handlers

# development error handler
# will print stacktrace
if app.get('env') is 'development'
    app.use (err, req, res, next) ->
        res.status err.status or 500
        res.render 'error',
            message: err.message,
            error: err

# production error handler
# no stacktraces leaked to user
app.use (err, req, res, next) ->
    res.status err.status or 500
    res.render 'error',
        message: err.message,
        error: {}

module.exports = app
