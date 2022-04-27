import express from 'express'
const router = express.Router()

import { validate } from '../middleware/validation.mjs'
import {
  getAllUsers,
  updateUser,
  deleteUser,
  getUserBYid,
  getTouristCount,
  getAgencyCount
} from '../controller/users.mjs'
import { findUser, verifyRoles } from '../middleware/common.mjs'
import { authorizeAgency, authorizeAdmin } from '../middleware/token.mjs'
import { updateValidation } from '../middleware/users.mjs'

router.get('/id', authorizeAgency, getUserBYid)
router.put('/', updateValidation, findUser, verifyRoles, updateUser)
router.delete('/', deleteUser)

router.get('/touristCount', authorizeAdmin, getTouristCount)
router.get('/agencyCount', authorizeAdmin, getAgencyCount)
router.get('/', authorizeAdmin, validate, getAllUsers)

export default router
