const { Url } = require('../db/models')

const translateShortenedUrl = async (shortened) => {
  const url = await getUrl(shortened)
  if (url) {
    return url.original
  }
  return null
}

const generateShortenedUrl = () => {
  const letters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return 'xxxxxxxx'
    .split('')
    .reduce((acc) => {
      const randomNumber = Math.random() * letters.length
      const randomCharIndex = Math.floor(randomNumber)
      const randomLetter = letters[randomCharIndex]
      return [...acc, randomLetter]
    }, [])
    .join('')
}

const getShortenedUrl = async (original) => {
  const { shortened } = await createUrl(original)
  return shortened
}

const getUrl = async (shortened) => {
  const url = await Url.findOne({ where: { shortened } })
  return url
}

const createUrl = async (original) => {
  const newUrl = await Url.create({
    original,
    shortened: generateShortenedUrl()
  })
  return newUrl
}

module.exports = {
  translateShortenedUrl,
  generateShortenedUrl,
  getShortenedUrl,
  getUrl,
  createUrl
}
