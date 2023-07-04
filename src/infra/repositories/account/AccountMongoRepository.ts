import { type AddAccountRepository } from '../../../data/protocols/AddAccountRepository'
import { type AccountModel } from '../../../domain/models/Account'
import { type AddAccountModel } from '../../../domain/use_cases/AddAccount'
import { MongoHelper } from '../../db/mongodb/mongodb'

export class AccountMongoRepository implements AddAccountRepository {
  async create(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(Object.assign({}, accountData))
    const accountModel: AccountModel = {
      email: accountData.email,
      name: accountData.name,
      password: accountData.password,
      id: result.insertedId.toHexString()
    }

    return accountModel
  }
}
