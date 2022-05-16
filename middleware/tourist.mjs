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

export { validateChangePassword }
