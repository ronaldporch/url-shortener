const cors = require('cors')
require('dotenv').config()
const express = require('express')
const app = express()
const { urls } = require('./routes')
const { logger } = require('./services')

app.use(express.json())
app.use(cors())
app.use((req, _, next) => {
  logger.info(`Url: ${req.originalUrl}, Request Time: ${Date.now()}`)
  next()
})
app.use('/urls', urls)

exports.server = app.listen(process.env.APP_PORT, () =>
  logger.info(`Listening on port ${process.env.APP_PORT}`)
)

exports.app = app
