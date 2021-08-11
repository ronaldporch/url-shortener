const cors = require('cors')
const express = require('express')
const app = express()
const { urls } = require('./routes')
const { logger } = require('./services')

app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
  logger.info(`Url: ${req.originalUrl}, Request Time: ${Date.now()}`)
  next()
})
app.use('/urls', urls)

app.listen(9000, () => logger.info(`Listening on port 9000`))
