import { type Collection } from 'mongodb'
import { MongoHelper } from '../../db/mongodb/mongodb'
import { AccountMongoRepository } from './AccountMongoRepository'

let accountCollection: Collection

describe('Account Repository', () => {
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

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  it('should return an account on add success', async () => {
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

  it('should return an account on load success', async () => {
    const sut = makeSut()
    await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    const account = await sut.loadByEmail('any_email@mail.com')

    expect(account).toBeTruthy()
    expect(account?.id).toBeTruthy()
    expect(account?.name).toBe('any_name')
    expect(account?.email).toBe('any_email@mail.com')
    expect(account?.password).toBe('any_password')
  })

  it('should return a null on load fails', async () => {
    const sut = makeSut()
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeFalsy()
  })
})
