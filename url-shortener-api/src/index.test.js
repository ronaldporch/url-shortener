jest.mock('./db/models/Url', () => ({
  findOne: async (query) => {
    if (query.where.shortened === '404') {
      return null
    }
    return {
      shortened: query.where.shortened,
      original: 'https://google.com'
    }
  },
  create: async (urlObject) => urlObject
}))

const { app, server } = require('.')
const request = require('supertest')

afterAll(() => {
  return server.close()
})

describe('GET /urls/:url', () => {
  it('should respond with the full url', (done) => {
    request(app)
      .get('/urls/abc123')
      .expect(200)
      .then((response) => {
        expect(response.body).toBe('https://google.com')
        done()
      })
  })

  it('should respond with a 404 if slug is not found', (done) => {
    request(app).get('/urls/404').expect(404, done)
  })
})

describe('POST /urls', () => {
  it('should create a url object and return the slug', (done) => {
    request(app)
      .post('/urls/')
      .send({ original: 'https://longurl.com' })
      .expect(200)
      .then((response) => {
        expect(response.body.length).toBe(8)
        done()
      })
  })

  it('should return an error if original url is not passed', (done) => {
    request(app)
      .post('/urls')
      .send({})
      .expect(400)
      .then((response) => {
        expect(response.error.text).toBe('No URL Provided')
        done()
      })
  })

  it('should return an error if not given a valid url', (done) => {
    request(app)
      .post('/urls')
      .send({ original: 'banana' })
      .expect(400)
      .then((response) => {
        expect(response.error.text).toBe('Not a Valid URL')
        done()
      })
  })
})
