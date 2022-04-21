import Joi from 'joi'
import { httpError } from '../common/httpError.mjs'

function validateGetNotification(req, res, next) {
  const schema = Joi.object({
    isRead: Joi.boolean().required()
  })
  const { error, value } = schema.validate(req.query)
  if (error) return res.fail({ error })
  req.query = value
  next()
}

function validateUpdateNotificationStatus(req, res, next) {
  const schema = Joi.object({
    id: Joi.number().required()
  })
  const { error } = schema.validate(req.body)
  if (error) return res.fail({ error })
  next()
}

export { validateGetNotification, validateUpdateNotificationStatus }
