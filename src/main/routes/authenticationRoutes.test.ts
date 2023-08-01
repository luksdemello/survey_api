import supertest from 'supertest'
import { app } from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/mongodb'

describe('Authentication Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect('mongodb://localhost:27017/mongo-teste')
  })

  afterAll(async () => {
    await MongoHelper.dropDatabase('mongo-teste')
    await MongoHelper.disconnect()
  })

  describe('POST /signup', () => {
    it('should return 200 on signup', async () => {
      const result = await supertest(app)
        .post('/api/signup')
        .send({
          name: 'Jhon Does',
          email: 'jhonDoe@email.com',
          password: '123456',
          passwordConfirmation: '123456'
        })

      expect(result.status).toBe(200)
    })
  })
})
