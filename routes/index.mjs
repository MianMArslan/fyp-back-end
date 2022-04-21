import auth from './auth.mjs'
import user from './users.mjs'
import agency from './agency.mjs'
import admin from './admin.mjs'
// import roles from './roles.mjs'

function setRoutes(app) {
  app.use('/auth', auth)
  app.use('/user', user)
  app.use('/agency', agency)
  app.use('/admin', admin)
  // app.use('/roles', roles)
}

export default setRoutes
