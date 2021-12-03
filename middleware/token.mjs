import jwt from 'jsonwebtoken'
import { tokenTime } from '../common/constants.mjs'
import { httpError } from '../common/httpError.mjs'

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

function verifyAccessToken(req, res, next) {
  console.log(req.cookies)
  const { accessToken } = req.cookie
  if (!accessToken) return res.fail({ error })
  try {
    jwt.verify(accessToken, process.env.SECRET)
    next()
  } catch (err) {
    console.log(req.body)
    const error = new Error('Token is not valid')
    return res.fail({ error })
  }
}

export { getAuthToken, getToken, verifyToken, accessToken, verifyAccessToken }
