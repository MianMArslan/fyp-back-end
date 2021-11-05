require('dotenv').config()
module.exports = {
  local: {
    username: process.env.DB_LOCAL_USERNAME,
    password: process.env.DB_LOCAL_PASSWORD,
    database: process.env.DB_LOCAL_NAME,
    host: process.env.DB_LOCAL_HOST,
    port: process.env.DB_LOCAL_PORT,
    dialect: 'mysql'
  },
  development: {
    username: process.env.DB_DEV_USERNAME,
    password: process.env.DB_DEV_PASSWORD,
    database: process.env.DB_DEV_NAME,
    host: process.env.DB_DEV_HOST,
    dialect: 'mysql'
  },
  staging: {
    username: process.env.DB_STAGING_USERNAME,
    password: process.env.DB_STAGING_PASSWORD,
    database: process.env.DB_STAGING_NAME,
    host: process.env.DB_STAGING_HOST,
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_PRODUCTION_USERNAME,
    password: process.env.DB_PRODUCTION_PASSWORD,
    database: process.env.DB_PRODUCTION_NAME,
    host: process.env.DB_PRODUCTION_HOST,
    dialect: 'mysql'
  }
}
