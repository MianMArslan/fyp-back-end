import jwt from 'jsonwebtoken'
import { tokenTime } from '../common/constants.mjs'
import { httpError } from '../common/httpError.mjs'
import db from '../models/index.js'
import jwt_decode from 'jwt-decode'

const { user } = db
function getAuthToken(email) {
  const token = jwt.sign({ email: email }, process.env.SECRET, {
    expiresIn: '950s'
  })
  return token
}
function getToken(email) {
  const token = jwt.sign({ email: email }, process.env.SECRET)
  return token
}
function verifyToken(req, res, next) {
  const { token } = req.body
  if (!token) return res.fail({ error })
  try {
    jwt.verify(token, process.env.SECRET)
    next()
  } catch (err) {
    httpError(err)
  }
}

async function accessToken(id, email) {
  const token = await jwt.sign({ id, email }, process.env.SECRET, {
    expiresIn: tokenTime
  })
  return token
}

async function authorizeTourist(req, res, next) {
  let userData = {}
  const { accessToken } = req.cookies
  if (!accessToken) return httpError('No access Token is provided')
  try {
    jwt.verify(accessToken, process.env.SECRET)
    const decode = jwt_decode(accessToken)
    const record = await user.findOne({ where: { email: decode.email } })
    userData.userRecord = {
      userId: record.id,
      firstName: record.firstName,
      lastName: record.lastName,
      email: record.email
    }
    const userRecord = await record.getRoles()
    userData.userRole = { title: userRecord[0].title }

    if (userRecord[0].title == 'tourist') {
      req.session = userData
      next()
    } else res.fail({ code: 400, error: { message: 'UnAuthorize' } })
  } catch (err) {
    httpError('Invalid Token')
  }
}

async function authorizeAdmin(req, res, next) {
  let userData = {}
  const { accessToken } = req.cookies
  if (!accessToken) return httpError('No access Token is provided')
  try {
    jwt.verify(accessToken, process.env.SECRET)
    const decode = jwt_decode(accessToken)
    const record = await user.findOne({ where: { email: decode.email } })
    userData.userRecord = {
      userId: record.id,
      firstName: record.firstName,
      lastName: record.lastName,
      email: record.email
    }
    const userRecord = await record.getRoles()
    userData.userRole = { title: userRecord[0].title }

    if (userRecord[0].title == 'admin') {
      req.session = userData
      next()
    } else res.fail({ code: 400, error: { message: 'UnAuthorize' } })
  } catch (err) {
    res.fail({ code: 400, error: { message: err.message } })
    // httpError('Invalid Token')
  }
}

async function authorizeAgency(req, res, next) {
  let userData = {}
  const { accessToken } = req.cookies
  if (!accessToken) return httpError('No access Token is provided')
  try {
    jwt.verify(accessToken, process.env.SECRET)
    const decode = jwt_decode(accessToken)
    const record = await user.findOne({ where: { email: decode.email } })
    userData.userRecord = {
      userId: record.id,
      firstName: record.firstName,
      lastName: record.lastName,
      email: record.email
    }
    const userRecord = await record.getRoles()
    userData.userRole = { title: userRecord[0].title }

    if (userRecord[0].title == 'agency') {
      req.session = userData
      next()
    } else res.fail({ code: 400, error: { message: 'UnAuthorize' } })
  } catch (err) {
    httpError('Invalid Token')
  }
}

export {
  getAuthToken,
  getToken,
  verifyToken,
  accessToken,
  authorizeAgency,
  authorizeTourist,
  authorizeAdmin
}
