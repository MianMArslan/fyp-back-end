import createError from 'http-errors'
import env from 'dotenv'
import cors from 'cors'
env.config()
import express from 'express'
import helmet from 'helmet'
import path from 'path'
const __dirname = path.resolve()
import cookieParser from 'cookie-parser'
// import session from 'express-session'
import logger from 'morgan'
import { JSend } from 'jsend-express'
import 'express-async-errors'
import error from './middleware/error.mjs'
import setRoutes from './routes/index.mjs'

const app = express()
const jSend = new JSend({ name: 'appName', version: 'X.X.X', release: 'XX' })
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000', 'http://localhost:3001']
}
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(session({ secret: process.env.SECRET }))
app.use(helmet())
app.use(cors(corsOptions))
app.use(express.static(path.join(__dirname, 'public')))
app.use(jSend.middleware.bind(jSend))

setRoutes(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
error(app)

export default app
