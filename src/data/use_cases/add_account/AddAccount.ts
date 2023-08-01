import {
  type AddAccountRepository,
  type AccountModel,
  type AddAccount, type AddAccountModel,
  type Hasher
} from './AddAccountProtocols'

export class AddAccountUseCase implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async execute(accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password)
    const account = await this.addAccountRepository.create(Object.assign({},
      accountData, { password: hashedPassword }))

    return account
  }
}
