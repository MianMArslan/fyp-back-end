import Joi from 'joi'
import db from '../models/index.js'
import { httpError } from '../common/httpError.mjs'

const { user } = db
function validate(req, res, next) {
  const schema = Joi.object({
    firstname: Joi.string(),
    lastname: Joi.string(),
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(3).required(),
    roleId: Joi.number().required(),
    interest: Joi.string()
  })
  const { error } = schema.validate(req.body)
  if (error) return res.fail({ error })
  next()
}

function validateLogin(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(3).required()
  })
  const { error } = schema.validate(req.body)
  if (error) return res.fail({ error })
  next()
}

async function validateEmail(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().required().email().external(verifyEmail)
  })
  try {
    await schema.validateAsync(req.body)
    next()
  } catch (error) {
    return res.fail({ error })
  }
}

function updateValidation(req, res, next) {
  const schema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    id: Joi.number().integer().positive().required(),
    roleIds: Joi.array()
  })
  const { error } = schema.validate(req.body)
  if (error) return res.fail({ error })
  next()
}

const verifyEmail = async function (email) {
  const record = await user.findOne({ where: { email, isVerified: 'email' } })
  if (record) return email
  else httpError('Verify your email first', 401)
}

export { validate, validateLogin, validateEmail, updateValidation }
