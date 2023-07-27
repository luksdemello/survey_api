import { type Authentication, type AuthenticationModel } from '../../../domain/use_cases/Authentication'
import { type HashCompare } from '../../protocols/criptography/HashCompare'
import { type LoadAccountByEmailRepository } from '../../protocols/db/LoadAccountByEmailRepository'

export class AuthenticationUseCase implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashCompare: HashCompare
  ) {}

  async execute(authenticationModel: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(authenticationModel.email)

    if (account) {
      await this.hashCompare.compare(authenticationModel.password, account.password)
      return null
    }

    return null
  }
}
