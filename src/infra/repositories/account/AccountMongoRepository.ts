import { type AddAccountRepository } from '../../../data/protocols/AddAccountRepository'
import { type AccountModel } from '../../../domain/models/Account'
import { type AddAccountModel } from '../../../domain/use_cases/AddAccount'
import { MongoHelper } from '../../db/mongodb/mongodb'

export class AccountMongoRepository implements AddAccountRepository {
  async create(account: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(account)
    const accountModel: AccountModel = {
      ...account,
      id: result.insertedId.id.toString()
    }

    return accountModel
  }
}
