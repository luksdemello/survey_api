import {
  type AccountModel,
  type AddAccount, type AddAccountModel,
  type Encrypter
} from './AddAccountProtocols'

export class AddAccountUseCase implements AddAccount {
  constructor(private readonly encrypter: Encrypter) {}

  async execute(account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)

    return { ...account, id: '' }
  }
}
