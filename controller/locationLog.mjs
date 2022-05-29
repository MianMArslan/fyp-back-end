import db from '../models/index.js'
import { httpError } from '../common/httpError.mjs'
const { locationLog, user, Sequelize } = db
const Op = Sequelize.Op
async function getLocationLog(req, res, next) {
  try {
    let result = await locationLog.findAll({
      order: [['createdAt', 'DESC']],
      include: { model: user, where: { id: { [Op.ne]: 1 } } }
    })
    res.success({
      data: result
    })
  } catch (error) {
    httpError(error.message)
  }
}
export { getLocationLog }
