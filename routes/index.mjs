import auth from './auth.mjs'
import users from './users.mjs'
import roles from './roles.mjs'

function setRoutes(app) {
  app.use('/auth', auth)
  app.use('/users', users)
  app.use('/roles', roles)
}

export default setRoutes
