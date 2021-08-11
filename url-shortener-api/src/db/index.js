const { Sequelize } = require('sequelize')
const { logger } = require('../services')

const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: msg => logger.info(msg)
})

sequelize.sync({ force: true })

module.exports = sequelize
