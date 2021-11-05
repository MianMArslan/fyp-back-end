import db from '../models/index.js'
const { roles, sequelize } = db

async function createRole(req, res) {
  const { title } = req.body
  try {
    const record = await roles.create({
      title
    })
    res.send(record)
  } catch (error) {
    return res.fail({ error })
  }
}

async function updateRole(req, res) {
  const { id, title, isDeleted } = req.body
  try {
    const update = await roles.update(
      {
        title,
        isDeleted
      },
      {
        where: {
          id: id
        }
      }
    )
    res.send(update)
  } catch (error) {
    return res.fail({ error })
  }
}

async function deleteRole(req, res) {
  const id = req.body.id
  try {
    const del = await roles.update(
      {
        isDeleted: true
      },
      {
        where: {
          id
        }
      }
    )
    res.send(del)
  } catch (error) {
    return res.fail({ error })
  }
}

async function getRoles(req, res) {
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
    const records = await roles.findAndCountAll(object)
    return res.send(records)
  } catch (error) {
    return res.fail({ error })
  }
}

export default { createRole, updateRole, deleteRole, getRoles }
