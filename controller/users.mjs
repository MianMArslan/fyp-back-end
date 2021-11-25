import bcrypt from 'bcrypt'
import db from '../models/index.js'
import _ from 'lodash'
import jwt_decode from 'jwt-decode'
import { user } from '../common/constants.mjs'
import { httpError } from '../common/httpError.mjs'

const { users, sequelize } = db

async function createUsers(req, res, next) {
  const { firstName, lastName, email, password, roleId } = req.body
  let hashPassword
  try {
    const checker = await users.findOne({ where: { email: email } })
    if (_.isEmpty(checker)) {
      hashPassword = await bcrypt.hash(password, process.env.SALT)
      const t = await sequelize.transaction()
      const user = await users.create(
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

async function getUsers(req, res) {
  const { limit, offset, isDeleted } = req.query
  let object = {},
    where = {}
  if (isDeleted || isDeleted == false) {
    where.isDeleted = isDeleted
    object.where = where
  }
  if (limit) object.limit = limit
  if (offset || offset == 0) object.offset = offset
  try {
    const records = await users.findAndCountAll(object)
    return res.success({ data: records })
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
      await users.update(object, { where })
      return res.status(201).success({
        status: user.status,
        message: user.userUpdated,
        data: user.data
      })
    } catch (error) {
      return httpError(error)
    }
  }
}

async function deleteUser(req, res) {
  const { id } = req.body
  try {
    await users.update({ isDeleted: true }, { where: { id } })
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
  const verify = await users.update(
    { isVerified: 'email' },
    { where: { email: decode.email } }
  )
  if (_.isEmpty(verify)) return httpError(user.notVerify)
  next()
}

export default { createUsers, verifyRole, getUsers, updateUser, deleteUser }
