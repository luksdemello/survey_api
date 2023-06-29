import {
  type AddAccountRepository,
  type AccountModel,
  type AddAccount, type AddAccountModel,
  type Encrypter
} from './AddAccountProtocols'

export class AddAccountUseCase implements AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async execute(accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    await this.encrypter.encrypt(accountData.password)
    const account = await this.addAccountRepository.create(Object.assign({},
      accountData, { password: hashedPassword }))

    return account
  }
}
