import { type Authentication, type AuthenticationModel } from '../../../domain/use_cases/Authentication'
import { type LoadAccountByEmailRepository } from '../../protocols/LoadAccountByEmailRepository'

export class AuthenticationUseCase implements Authentication {
  constructor(private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) {}

  async execute(authenticationModel: AuthenticationModel): Promise<string | null> {
    await this.loadAccountByEmailRepository.load(authenticationModel.email)

    return null
  }
}
