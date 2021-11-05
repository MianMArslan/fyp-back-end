import bcrypt from 'bcrypt'
import db from '../models/index.js'
import _ from 'lodash'
import jwt_decode from 'jwt-decode'
import { user } from '../middleware/constants.mjs'

const { users, userRoles, sequelize } = db

async function createUsers(req, res, next) {
  const { firstName, lastName, email, password } = req.body
  let hashPassword
  try {
    const checker = await users.findOne({ where: { email: email } })
    if (_.isEmpty(checker)) {
      try {
        hashPassword = await bcrypt.hash(password, process.env.SALT)
      } catch (error) {
        return res.jsend.error(error)
      }
      const t = await sequelize.transaction()
      try {
        const user = await users.create(
          {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashPassword,
            isVerified: 'admin'
          },
          { transaction: t }
        )
        const role = await userRoles.create(
          { userId: user.id, roleId: 1 },
          { transaction: t }
        )
        if (!_.isEmpty(role) && !_.isEmpty(user)) {
          await t.commit()
          return res.status(201).success({
            state: 201,
            message: 'User Created Successfully',
            data: null
          })
        } else {
          await t.rollback()
          return res
            .status(400)
            .jsend.error('An Error Occur While Registering New User')
        }
      } catch (error) {
        await t.rollback()
        return res.error({ error })
      }
    } else res.status(403).error('Email Is already Exist!')
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
    return res.send(records)
  } catch (error) {
    return res.fail({ error })
  }
}

async function updateUser(req, res) {
  const { id, firstName, lastName, roleIds } = req.body
  let object = {},
    where = {}
  if (firstName) object.firstName = firstName
  if (lastName) object.lastName = lastName
  where.id = id
  let addRole, roleDestroy

  const t = await sequelize.transaction()
  if (roleIds) {
    try {
      roleDestroy = await userRoles.destroy(
        { where: { userId: id } },
        { transaction: t }
      )
    } catch (error) {
      return res.fail({ error })
    }
    for (let iterator of roleIds) {
      try {
        addRole = await userRoles.create(
          { roleId: iterator, userId: id },
          { transaction: t }
        )
      } catch (error) {
        return res.fail({ error })
      }
    }
    if (roleDestroy && addRole) {
      try {
        await t.commit()
        if (object) {
          try {
            await users.update(object, { where })
            return res.status(201).success({
              status: user.status,
              message: user.userUpdated,
              data: user.data
            })
          } catch (error) {
            return res.fail({ error })
          }
        }
        return res.status(201).success({
          status: user.status,
          message: user.userUpdated,
          data: user.data
        })
      } catch (error) {
        await t.rollback()
        return res.fail({ error })
      }
    } else {
      try {
        await t.rollback()
        return res.fail({ error: { message: user.addingRole } })
      } catch (error) {
        return res.error({ error })
      }
    }
  }
  if (object) {
    try {
      await users.update(object, { where })
      return res.status(201).success({
        status: user.status,
        message: user.userUpdated,
        data: user.data
      })
    } catch (error) {
      return res.fail({ error })
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
  try {
    const verify = await users.update(
      { isVerified: 'email' },
      { where: { email: decode.email } }
    )
    if (_.isEmpty(verify))
      return res.fail({ error: { message: user.notVerify } })
    next()
  } catch (error) {
    return res.error({ error })
  }
}

export default { createUsers, verifyRole, getUsers, updateUser, deleteUser }
