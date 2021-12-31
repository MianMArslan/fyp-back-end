import express from 'express'
const router = express.Router()
import { validate, validateLogin, validateEmail } from '../middleware/users.mjs'
import { verifyToken } from '../middleware/token.mjs'
import { getUserLocationDate } from '../middleware/getLocation.mjs'
import {
  registration,
  login,
  forgotPassword,
  resetPassword,
  resendEmailLink
} from '../controller/auth.mjs'
import { verifyRole } from '../controller/users.mjs'
import { verifyEmail } from '../middleware/common.mjs'

router.post('/registration', validate, registration)
router.post('/user-email-verification', verifyToken, verifyRole)
router.post('/resend-verification-link', validateEmail, resendEmailLink)
router.post('/login', validateLogin, getUserLocationDate, login)
router.post('/forgot-password', validateEmail, verifyEmail, forgotPassword)
router.post('/reset-password', verifyToken, resetPassword)

export default router
