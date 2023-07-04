import supertest from 'supertest'
import { app } from '../config/app'

describe('Cors Middleware', () => {
  it('should enable CORS', async () => {
    app.get('/test_cors', (req, res) => {
      res.send()
    })
    const result = await supertest(app)
      .get('/test_cors')

    expect(result.headers['access-control-allow-origin']).toBe('*')
    expect(result.headers['access-control-allow-methods']).toBe('*')
    expect(result.headers['access-control-allow-headers']).toBe('*')
  })
})
