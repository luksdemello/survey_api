import { ObjectId } from 'mongodb'
import { type AddAccountRepository } from '../../../data/protocols/db/AddAccountRepository'
import { type LoadAccountByEmailRepository } from '../../../data/protocols/db/LoadAccountByEmailRepository'
import { type UpdateAccessTokenRepository } from '../../../data/protocols/db/UpdateAccessTokenRepository'
import { type AccountModel } from '../../../domain/models/Account'
import { type AddAccountModel } from '../../../domain/use_cases/AddAccount'
import { MongoHelper } from '../../db/mongodb/mongodb'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository {
  async create(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(Object.assign({}, accountData))
    const accountModel: AccountModel = {
      email: accountData.email,
      name: accountData.name,
      password: accountData.password,
      id: result.insertedId.toHexString()
    }

    return accountModel
  }

  async loadByEmail(email: string): Promise<AccountModel | null> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })

    return MongoHelper.map<AccountModel>(account)
  }

  async updateAccessToken(id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({ _id: new ObjectId(id) }, {
      $set: {
        accessToken: token
      }
    })
  }
}
