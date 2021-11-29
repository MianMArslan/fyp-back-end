function error(app) {
  app.use(function (error, req, res, next) {
    if (error.name == 'OFF') res.fail({ status: error.status, error })
    if (error.name.startsWith('Sequelize')) res.error({ error })
  })
}
export default error
