import auth from './auth.mjs'
import user from './users.mjs'
// import roles from './roles.mjs'

function setRoutes(app) {
  app.use('/auth', auth)
  app.use('/user', user)
  // app.use('/roles', roles)
}

export default setRoutes
