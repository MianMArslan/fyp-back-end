import Joi from 'joi'

export function validateForAll(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.email().required(),
    suggestion: Joi.string().trim().strict().required()
  })
  const { error } = schema.validate(req.body)
  if (error) return res.fail({ error })
  next()
}

export function validateForTourist(req, res, next) {
  const schema = Joi.object({
    suggestion: Joi.string().trim().strict().required()
  })
  const { error } = schema.validate(req.body)
  if (error) return res.fail({ error })
  next()
}
