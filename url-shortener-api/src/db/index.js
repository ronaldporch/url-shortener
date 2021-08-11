const { Sequelize } = require('sequelize')
const { logger } = require('../services')

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USERNAME,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOSTNAME,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres',
    logging: (msg) => logger.info(msg)
  }
)

sequelize.sync({ force: true })

module.exports = sequelize
