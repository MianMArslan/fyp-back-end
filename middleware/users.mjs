import Joi from 'joi'

function validate(req, res, next) {
  const schema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(3).required(),
    id: Joi.number().integer().positive()
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

function validateEmail(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().min(5).required().email()
  })
  const { error } = schema.validate(req.body)
  if (error) return res.fail({ error })
  next()
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

export default { validate, validateLogin, validateEmail, updateValidation }
