import auth from './auth.mjs'
import user from './users.mjs'
import agency from './agency.mjs'
import admin from './admin.mjs'
import tourist from './tourist.mjs'
// import roles from './roles.mjs'
import http from 'http'
// // const http = require('http')
import cors from 'cors'
import { Server } from 'socket.io'

function setRoutes(app) {
  // app.use(cors())

  // const server = http.createServer(app)

  // const io = new Server(server, {
  //   cors: {
  //     origin: 'http://localhost:3003',
  //     methods: ['GET', 'POST']
  //   }
  // })

  // io.on('connection', (socket) => {
  //   console.log(`User Connected: ${socket.id}`)

  //   socket.on('join_room', (data) => {
  //     socket.join(data)
  //     console.log(`User with ID: ${socket.id} joined room: ${data}`)
  //   })

  //   socket.on('send_message', (data) => {
  //     socket.to(data.room).emit('receive_message', data)
  //   })

  //   socket.on('disconnect', () => {
  //     console.log('User Disconnected', socket.id)
  //   })
  // })

  app.use('/auth', auth)
  app.use('/user', user)
  app.use('/agency', agency)
  app.use('/admin', admin)
  app.use('/tourist', tourist)
  // app.use('/roles', roles)
}

export default setRoutes
