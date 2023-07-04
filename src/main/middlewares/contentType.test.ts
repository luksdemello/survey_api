import supertest from 'supertest'
import { app } from '../config/app'

describe('Content Type Middleware', () => {
  it('should return default content type as json', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send()
    })
    const result = await supertest(app)
      .get('/test_content_type')

    expect(result.headers['content-type']).toMatch(/json/)
  })

  it('should return xml content type when forced', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml')
      res.send()
    })
    const result = await supertest(app)
      .get('/test_content_type_xml')

    expect(result.headers['content-type']).toMatch(/xml/)
  })
})
