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
    const { email, firstName, lastName } = req.session.userRecord
    let { suggestion } = req.body
    let result = await contactUs.create({
      name: `${firstName} ${lastName}`,
      email,
      suggestion
    })
    res.success({
      data: result,
      message: 'Suggestion is submitted Successfully!'
    })
  } catch (error) {
    httpError(error.message)
  }
}

export { createContactUsForAll, createContactUsForTourist }