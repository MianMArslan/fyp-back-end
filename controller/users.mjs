import bcrypt from 'bcrypt'
import db from '../models/index.js'
import _ from 'lodash'
import jwt_decode from 'jwt-decode'
import { users } from '../common/constants.mjs'
import { httpError } from '../common/httpError.mjs'
import moment from 'moment'

const { user, sequelize, role, Sequelize } = db
const Op = Sequelize.Op

async function createUsers(req, res, next) {
  const { firstName, lastName, email, password, roleId } = req.body
  let hashPassword
  try {
    const checker = await user.findOne({ where: { email: email } })
    if (_.isEmpty(checker)) {
      hashPassword = await bcrypt.hash(password, process.env.SALT)
      const t = await sequelize.transaction()
      const user = await user.create(
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: hashPassword,
          isVerified: 'email'
        },
        { transaction: t }
      )
      const role = await user.addrole({ roleId }, { transaction: t })
      if (!_.isEmpty(role) && !_.isEmpty(user)) {
        await t.commit()
        return res.status(201).success({
          state: 201,
          message: 'User Created Successfully'
        })
      } else {
        await t.rollback()
        return httpError('An Error Occur While Registering New User')
      }
    } else httpError('Email Is already Exist!')
  } catch (error) {
    return res.error({ error })
  }
}

async function getAllUsers(req, res) {
  try {
    const { isDeleted } = req.query
    const records = await user.findAll({
      where: { isDeleted },
      include: { model: role, where: { title: 'tourist' } }
    })
    return res.success({ data: records })
  } catch (error) {
    return httpError(error.message)
  }
}

async function getUserBYid(req, res) {
  try {
    const userId = req.session.userRecord.userId
    const record = await user.findOne({ where: { id: userId } })
    return res.success({ data: record })
  } catch (error) {
    return httpError(error.message)
  }
}

async function updateUser(req, res) {
  const { id, firstName, lastName, roleIds } = req.body
  let object = {},
    where = {}
  if (firstName) object.firstName = firstName
  if (lastName) object.lastName = lastName
  where.id = id
  if (object) {
    try {
      await user.update(object, { where })
      return res.status(200).success({
        status: users.status,
        message: users.userUpdated,
        data: users.data
      })
    } catch (error) {
      return httpError(error)
    }
  }
}

async function deleteUser(req, res) {
  const { id } = req.body
  try {
    await user.update({ isDeleted: true }, { where: { id } })
    return res.success({
      status: 202,
      message: 'User Deleted Successfully!',
      data: null
    })
  } catch (error) {
    return res.fail({ error })
  }
}

async function verifyRole(req, res, next) {
  const { token } = req.body
  const decode = jwt_decode(token)
  const verify = await user.update(
    { isVerified: 'email' },
    { where: { email: decode.email } }
  )
  return res.success({ message: 'Email verify Successfully', data: verify })
}

async function getTouristCount(req, res) {
  try {
    const record = await user.count({
      include: { model: role, where: { title: 'tourist' } }
    })
    return res.success({ data: record })
  } catch (error) {
    return httpError(error.message)
  }
}

async function getAgencyCount(req, res) {
  try {
    const record = await user.count({
      include: { model: role, where: { title: 'agency' } }
    })
    return res.success({ data: record })
  } catch (error) {
    return httpError(error.message)
  }
}

async function getNewJoinTourists(req, res) {
  try {
    const record = await user.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']],
      subQuery: false,
      include: [
        {
          model: role,
          where: { title: 'tourist' }
        }
      ]
    })
    return res.success({ data: record })
  } catch (error) {
    return httpError(error.message)
  }
}

async function getAllAgencies(req, res) {
  try {
    const { isDeleted } = req.query
    const records = await user.findAll({
      where: { isDeleted },
      include: { model: role, where: { title: 'agency' } }
    })
    return res.success({ data: records })
  } catch (error) {
    return httpError(error.message)
  }
}

export {
  createUsers,
  verifyRole,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserBYid,
  getTouristCount,
  getAgencyCount,
  getNewJoinTourists,
  getAllAgencies
}
