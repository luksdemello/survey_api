import {
  type LoadAccountByEmailRepository,
  type HashCompare,
  type UpdateAccessTokenRepository,
  type Authentication,
  type AuthenticationModel
} from './AuthenticationProtocols'
import { type Encrypter } from '../../protocols/criptography/Encrypter'

export class AuthenticationUseCase implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashCompare: HashCompare,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async execute(authenticationModel: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authenticationModel.email)

    if (!account) {
      return null
    }

    const passwordMath = await this.hashCompare.compare(authenticationModel.password, account.password)
    if (!passwordMath) {
      return null
    }

    const accessToken = await this.encrypter.encrypt(account.id)

    await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)

    return accessToken
  }
}
