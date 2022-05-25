import express from 'express'
const router = express.Router()

import { validateForAll, validateForTourist } from '../middleware/contactUs.mjs'
import {
  createContactUsForAll,
  createContactUsForTourist
} from '../controller/contactUs.mjs'
import { authorizeTourist } from '../middleware/token.mjs'

router.post('/', validateForAll, createContactUsForAll)
router.post(
  '/tourist',
  authorizeTourist,
  validateForTourist,
  createContactUsForTourist
)

export default router
