import db from '../models/index.js'
import { httpError } from '../common/httpError.mjs'

const { Booking, Sequelize } = db
const Op = Sequelize.Op

async function getAllBooking(req, res, next) {
  try {
    let result = await Booking.count({
      where: { status: { [Op.ne]: 'pending' } }
    })
    res.success({ data: result })
  } catch (error) {
    httpError(error.message)
  }
}

export { getAllBooking }
