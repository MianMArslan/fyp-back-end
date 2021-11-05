import express from 'express'
const router = express.Router()

import userMiddleware from '../middleware/users.mjs'
import authToken from '../middleware/token.mjs'
import auth from '../controller/auth.mjs'
import userController from '../controller/users.mjs'
import common from '../middleware/common.mjs'

const { verifyRole } = userController
const { verifyToken } = authToken
const { validate, validateLogin, validateEmail } = userMiddleware
const {
  registration,
  login,
  verifyUser,
  forgotPassword,
  resetPassword,
  resendEmailLink
} = auth
const { verifyEmail } = common

router.post('/registration', validate, registration)
router.post('/user-email-verification', verifyToken, verifyRole, verifyUser)
router.post('/resend-verification-link', validateEmail, resendEmailLink)
router.post('/login', validateLogin, login)
router.post('/forgot-password', validateEmail, verifyEmail, forgotPassword)
router.post('/reset-password', verifyToken, resetPassword)

export default router
