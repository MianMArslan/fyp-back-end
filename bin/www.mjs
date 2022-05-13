#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from '../app.mjs'
import { Server } from 'socket.io'
import http from 'http'
import db from '../models/index.js'
const { sequelize } = db
import debug from 'debug'
debug('lab-back-end:server')
import semver from 'semver'
let server
let port
;(async () => {
  /**
   * Check node version
   */
  if (!semver.satisfies(process.versions.node, '=v16.11.0')) {
    console.log(
      `Incorrect Node version ${process.versions.node}. It should be 16.11.0`
    )
    process.exit()
  }
  /**
   * Check db connection
   */
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    process.exit()
  }
  /**
   * Get port from environment and store in Express.
   */

  // if (!fs.existsSync(__dirname + '/../public/uploads')) {
  //   fs.mkdirSync(__dirname + '/../public/uploads')
  // }
  // if (!fs.existsSync(__dirname + '/../logs')) {
  //   fs.mkdirSync(__dirname + '/../logs')
  // }
  // if (!fs.existsSync(__dirname + '/../public/files')) {
  //   fs.mkdirSync(__dirname + '/../public/files')
  // }

  port = normalizePort(
    process.env.NODE_ENV == 'development'
      ? process.env.PORT || '7001'
      : process.env.PORT || '3001'
  )
  app.set('port', port)

  /**
   * Create HTTP server.
   */

  server = http.createServer(app)
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3003',
      methods: ['GET', 'POST']
    }
  })

  io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`)

    socket.on('join_room', (data) => {
      socket.join(data)
      console.log(`User with ID: ${socket.id} joined room: ${data}`)
    })

    socket.on('send_message', (data) => {
      socket.to(data.room).emit('receive_message', data)
    })

    socket.on('disconnect', () => {
      console.log('User Disconnected', socket.id)
    })
  })
  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port)

  server.on('error', onError)
  server.on('listening', onListening)
})()
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

async function onListening() {
  var addr = server.address()
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  debug('Listening on ' + bind)
  // await sequelize.sync({ force: true })
  console.log('Listening on ' + bind)
}
