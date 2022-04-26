import express from 'express'
const router = express.Router()

import { validate } from '../middleware/validation.mjs'
import {
  getUsers,
  updateUser,
  deleteUser,
  getUserBYid,
  getTouristCount,
  getAgencyCount,
  getNewJoinTourists
} from '../controller/users.mjs'
import { findUser, verifyRoles } from '../middleware/common.mjs'
import { authorizeAgency, authorizeAdmin } from '../middleware/token.mjs'
import { updateValidation } from '../middleware/users.mjs'

router.get('/', authorizeAgency, validate, getUsers)
router.get('/id', authorizeAgency, getUserBYid)
router.put('/', updateValidation, findUser, verifyRoles, updateUser)
router.delete('/', deleteUser)

router.get('/touristCount', authorizeAdmin, getTouristCount)
router.get('/agencyCount', authorizeAdmin, getAgencyCount)
router.get('/newJoin', authorizeAdmin, getNewJoinTourists)

export default router
