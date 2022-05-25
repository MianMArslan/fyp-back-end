import db from '../models/index.js'
import { httpError } from '../common/httpError.mjs'

const { contactUs, Sequelize } = db
const Op = Sequelize.Op

async function createContactUsForAll(req, res, next) {
  try {
    let { name, email, suggestion } = req.body
    let result = await contactUs.create({ name, email, suggestion })
    res.success({ data: result })
  } catch (error) {
    httpError(error.message)
  }
}

async function createContactUsForTourist(req, res, next) {
  try {
    //get from session
    let { suggestion } = req.body
    let result = await contactUs.create({ name, email, suggestion })
    res.success({ data: result })
  } catch (error) {
    httpError(error.message)
  }
}

export { createContactUsForAll, createContactUsForTourist }
