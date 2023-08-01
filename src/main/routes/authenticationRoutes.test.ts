import supertest from 'supertest'
import { app } from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/mongodb'
import { type Collection } from 'mongodb'
import { hash } from 'bcrypt'

let accountCollection: Collection

describe('Authentication Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect('mongodb://localhost:27017/mongo-teste')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
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

  describe('POST /signin', () => {
    it('should return 200 on signin', async () => {
      const password = await hash('123456', 6)
      await accountCollection.insertOne({
        name: 'Jhon Does',
        email: 'jhonDoe@email.com',
        password
      })

      const result = await supertest(app)
        .post('/api/signin')
        .send({
          email: 'jhonDoe@email.com',
          password: '123456'
        })

      expect(result.status).toBe(200)
    })
  })
})
