const {
  generateShortenedUrl,
  translateShortenedUrl,
  getShortenedUrl,
  getUrl,
  createUrl
} = require('./urls')

jest.mock('../db/models/Url', () => ({
  findOne: async (query) => ({
    shortened: query.where.shortened,
    original: 'https://google.com'
  }),
  create: async (urlObject) => urlObject
}))

describe('generateShortenedUrl', () => {
  it('should generate a random slug', () => {
    const slug = generateShortenedUrl()
    expect(slug.length).toBe(8)
  })
})

describe('translateShortenedUrl', () => {
  it('Should get the full url for a given slug', async () => {
    const original = await translateShortenedUrl('abc123')
    expect(original).toBe('https://google.com')
  })
})

describe('getShortenedUrl', () => {
  it('Should get a shortened slug for a created url object', async () => {
    const url = 'https://google.com'
    const shortened = await getShortenedUrl(url)
    expect(shortened.length).toBe(8)
  })
})

describe('getUrl', () => {
  it('should retrieve a url object when provided with a slug', async () => {
    const slug = 'abc123'
    const url = await getUrl(slug)
    expect(url.shortened).toBe('abc123')
    expect(url.original).toBe('https://google.com')
  })
})

describe('createUrl', () => {
  it('should create and return a url object when provided the original url', async () => {
    const url = 'https://google.com'
    const newUrl = await createUrl(url)
    expect(newUrl.original).toBe(url)
    expect(newUrl.shortened.length).toBe(8)
  })
})
