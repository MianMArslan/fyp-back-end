import Joi from 'joi'
import { httpError } from '../common/httpError.mjs'

function validateChangePassword(req, res, next) {
  const schema = Joi.object({
    oldpassword: Joi.string().required(),
    newpassword: Joi.string().required()
  })
  const { error } = schema.validate(req.body)
  if (error) return res.fail({ error })
  next()
}
function validateCreateBooking(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.number().required(),
    adId: Joi.number().required(),
    description: Joi.string().allow(''),
    adOwnerId: Joi.number().required()
  })
  const { error, value } = schema.validate(req.body)
  if (error) return res.fail({ error })
  req.body = value
  next()
}

export { validateChangePassword, validateCreateBooking }
