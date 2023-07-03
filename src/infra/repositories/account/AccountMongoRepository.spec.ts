import { MongoHelper } from '../../db/mongodb/mongodb'
import { AccountMongoRepository } from './AccountMongoRepository'

describe('Account Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect('mongodb://localhost:27017/mongo-teste')
  })

  afterAll(async () => {
    await MongoHelper.dropDatabase('mongo-teste')
    await MongoHelper.disconnect()
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  it('should return an account con success', async () => {
    const sut = makeSut()
    const account = await sut.create({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })
})
