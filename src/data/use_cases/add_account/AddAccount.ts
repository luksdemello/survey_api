import { type AccountModel } from '../../../domain/models/Account'
import { type AddAccount, type AddAccountModel } from '../../../domain/use_cases/AddAccount'
import { type Encrypter } from '../../protocols/Encrypter'

export class AddAccountUseCase implements AddAccount {
  constructor(private readonly encrypter: Encrypter) {}

  async execute(account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)

    return { ...account, id: '' }
  }
}
