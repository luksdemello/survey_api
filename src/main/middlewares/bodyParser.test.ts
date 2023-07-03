import supertest from 'supertest'
import { app } from '../config/app'

describe('Body Parser Middleware', () => {
  it('should parser body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    const result = await supertest(app)
      .post('/test_body_parser')
      .send({ name: 'Any Name' })

    expect(result.body).toEqual({ name: 'Any Name' })
  })
})
