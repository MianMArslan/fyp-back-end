import Joi from 'joi'

function validate(req, res, next) {
  const schema = Joi.object({
    limit: Joi.number().integer().positive(),
    offset: Joi.number().integer().greater(-1),
    isDeleted: Joi.boolean()
  })
  const { error, value } = schema.validate(req.query)
  req.query = value
  const status = 400
  const data = null
  if (error) return res.fail({ status, data, error })
  next()
}

export default { validate }
