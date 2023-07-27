import { type AccountModel } from '../../../domain/models/Account'
import { type AddAccountModel } from '../../../domain/use_cases/AddAccount'

export interface AddAccountRepository {
  create(account: AddAccountModel): Promise<AccountModel>
}
