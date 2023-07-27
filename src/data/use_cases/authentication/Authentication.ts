import { type Authentication, type AuthenticationModel } from '../../../domain/use_cases/Authentication'
import { type HashCompare } from '../../protocols/criptography/HashCompare'
import { type TokenGenerator } from '../../protocols/criptography/TokenGenerator'
import { type LoadAccountByEmailRepository } from '../../protocols/db/LoadAccountByEmailRepository'
import { type UpdateAccessTokenRepository } from '../../protocols/db/UpdateAccessTokenRepository'

export class AuthenticationUseCase implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashCompare: HashCompare,
    private readonly tokenGenerator: TokenGenerator,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async execute(authenticationModel: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(authenticationModel.email)

    if (!account) {
      return null
    }

    const passwordMath = await this.hashCompare.compare(authenticationModel.password, account.password)
    if (!passwordMath) {
      return null
    }

    const accessToken = await this.tokenGenerator.generate(account.id)

    await this.updateAccessTokenRepository.update(account.id, accessToken)

    return accessToken
  }
}
