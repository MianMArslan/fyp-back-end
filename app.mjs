import createError from 'http-errors'
import env from 'dotenv'
env.config()
import express from 'express'
import helmet from 'helmet'
import path from 'path'
const __dirname = path.resolve()
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import { JSend } from 'jsend-express'
import 'express-async-errors'

import setRoutes from './routes/index.mjs'

const app = express()
const jSend = new JSend({ name: 'appName', version: 'X.X.X', release: 'XX' })
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(helmet())
app.use(express.static(path.join(__dirname, 'public')))
app.use(jSend.middleware.bind(jSend))

setRoutes(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message
  // res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(500).error('error')

  //res.render('error')
})

export default app
