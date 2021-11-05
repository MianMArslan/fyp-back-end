import Joi from 'joi'
import db from '../models/index.js'
const { roles, sequelize } = db

function validate(req, res, next) {
  const schema = Joi.object({
    id: Joi.number().positive(),
    title: Joi.string().trim().strict(),
    isDeleted: Joi.boolean()
  })
  const { error } = schema.validate(req.body)
  if (error) return res.fail({ error })
  next()
}

async function validateId(req, res, next) {
  const { id } = req.body
  try {
    const record = await roles.findOne({ where: { id } })
    if (!record) {
      const error = new Error('No such ID Exists...')
      res.fail({ error })
    }
    next()
  } catch (error) {
    res.fail({ error })
  }
}

async function queryValidation(req, res, next) {
  const schema = Joi.object({
    limit: Joi.number().positive().allow(0),
    offset: Joi.number().positive().allow(0),
    isDeleted: Joi.boolean()
  })
  const { error, value } = schema.validate(req.query)
  req.query = value
  if (error) return res.fail({ error })
  next()
}

export default { validate, validateId, queryValidation }
