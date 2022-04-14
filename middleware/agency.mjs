import Joi from 'joi'
import { httpError } from '../common/httpError.mjs'

function validateMarkUnActive(req, res, next) {
  const schema = Joi.object({
    active: Joi.boolean().required(),
    id: Joi.number().required()
  })
  const { error } = schema.validate(req.body)
  if (error) return res.fail({ error })
  next()
}
function validateDelateAds(req, res, next) {
  const schema = Joi.object({
    id: Joi.number().required()
  })
  const { error, value } = schema.validate(req.params)
  if (error) return res.fail({ error })
  req.query = value
  next()
}
function validateCreateAd(req, res, next) {
  const schema = Joi.object({
    briefdescription: Joi.string().required(),
    actualamount: Joi.number().required(),
    discountamount: Joi.number().required(),
    phonenumber: Joi.number().required(),
    Destination: Joi.string().required()
  })
  const { error } = schema.validate(req.body)
  if (error) return res.fail({ error })
  next()
}

function validateUpdateAd(req, res, next) {
  const schema = Joi.object({
    description: Joi.string().required(),
    amount: Joi.number().required(),
    discount: Joi.number().required(),
    phone: Joi.number().required(),
    id: Joi.number().required()
  })
  const { error } = schema.validate(req.body)
  if (error) return res.fail({ error })
  next()
}

export {
  validateMarkUnActive,
  validateCreateAd,
  validateDelateAds,
  validateUpdateAd
}
