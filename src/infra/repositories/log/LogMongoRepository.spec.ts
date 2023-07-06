import { type Collection } from 'mongodb'
import { MongoHelper } from '../../db/mongodb/mongodb'
import { LogMongoRepository } from './LogMongoRepository'

describe('LogMongo Repository', () => {
  let errorCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect('mongodb://localhost:27017/mongo-teste')
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
  })

  afterAll(async () => {
    await MongoHelper.dropDatabase('mongo-teste')
    await MongoHelper.disconnect()
  })

  it('should create an error log on success', async () => {
    const sut = new LogMongoRepository()
    await sut.logError('any_error')
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
