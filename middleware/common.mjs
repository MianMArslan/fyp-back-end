import nodemailer from 'nodemailer'
import db from '../models/index.js'
import _ from 'lodash'

const { users, roles } = db

function sendEmail(to, subject, html) {
  let transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD
    }
  })
  let mailOptions = {
    from: process.env.GMAIL_USER,
    to: `${to}`,
    subject: `${subject}`,
    html: `${html}`
  }

  const a = async function (err, info) {
    return new Promise((resolve, reject) => {
      if (err) throw new Error(err)
      resolve(info)
    })
  }
  transport.sendMail(mailOptions, a)
}

async function verifyEmail(req, res, next) {
  const { email } = req.body
  const error = new Error('Enter Valid Email')
  try {
    const checker = await users.findOne({ where: { email: email } })
    if (_.isEmpty(checker)) return res.fail({ error })
    next()
  } catch (error) {
    return res.error({ error })
  }
}

async function findUser(req, res, next) {
  const { id } = req.body
  const error = new Error('Enter Valid ID')
  try {
    const checker = await users.findOne({ where: { id, isDeleted: false } })
    if (_.isEmpty(checker)) return res.fail({ error })
    next()
  } catch (error) {
    return res.error({ error })
  }
}

async function verifyRoles(req, res, next) {
  const { roleIds } = req.body
  const error = new Error('Enter Valid ID')
  try {
    for (let iterator of roleIds) {
      const checkRoles = await roles.findOne({ where: { id: iterator } })
      const error = new Error('Invalid Role Id')
      if (!checkRoles) return res.fail({ error })
    }
    next()
  } catch (error) {
    return res.error({ error })
  }
}
export { sendEmail, verifyEmail, findUser, verifyRoles }
