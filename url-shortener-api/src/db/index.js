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

sequelize
  .authenticate()
  .catch(_ => {
    logger.error("Connection could not be established. Exiting.")
    process.exit(1)
  })

sequelize.sync({ force: process.env.NODE_ENV !== 'production' })

module.exports = sequelize
