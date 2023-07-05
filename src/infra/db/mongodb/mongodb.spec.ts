import { MongoHelper as sut } from './mongodb'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect('mongodb://localhost:27017/mongo-teste')
  })

  afterAll(async () => {
    await sut.dropDatabase('mongo-teste')
    await sut.disconnect()
  })

  it('should reconnect when mongo down ', async () => {
    let accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
    await sut.disconnect()
    accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
})
