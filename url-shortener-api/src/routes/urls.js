const express = require('express')
const { isURL } = require('validator')
const { translateShortenedUrl, getShortenedUrl } = require('../services/urls')

const urls = express.Router()

urls.get('/:url', async (req, res) => {
  const shortenedUrl = await translateShortenedUrl(req.params.url)
  if (shortenedUrl) {
    res.json(shortenedUrl)
  } else {
    res.status(404).send()
  }
})

urls.post('/', async (req, res) => {
  const originalUrl = req.body?.original
  if (!originalUrl) {
    res.status(400).send('No URL Provided')
  } else if (!isURL(originalUrl)) {
    res.status(400).send('Not a Valid URL')
  } else {
    try {
      const newUrl = await getShortenedUrl(originalUrl)
      res.json(newUrl)
    } catch (e) {
      res.status(500).send()
    }
  }
})

module.exports = urls
