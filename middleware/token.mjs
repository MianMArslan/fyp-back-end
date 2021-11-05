import jwt from 'jsonwebtoken'

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
    const error = new Error('Token is not valid')
    return res.fail({ error })
  }
}
export default { getAuthToken, getToken, verifyToken }
