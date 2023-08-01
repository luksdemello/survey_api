import { AuthenticationUseCase } from '../../../data/use_cases/authentication/Authentication'
import { BcryptAdapter } from '../../../infra/adapters/cryptography/bcrypt_adapter/BcryptAdapter'
import { JwtAdapter } from '../../../infra/adapters/cryptography/jwt_adapter/JwtAdapter'
import { AccountMongoRepository } from '../../../infra/repositories/account/AccountMongoRepository'
import { LogMongoRepository } from '../../../infra/repositories/log/LogMongoRepository'
import { SignInController } from '../../../presentation/controllers/sign_in/SignInController'
import { type Controller } from '../../../presentation/protocols'
import env from '../../config/env'
import { LogControllerDecorator } from '../../decorators/LogControllerDecorator'
import { makeSignInValidation } from './signInValidationFactory'

export const makeSignInController = (): Controller => {
  const salt = 6
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)

  const authenticationUseCase = new AuthenticationUseCase(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
  const signInValidation = makeSignInValidation()

  const signInController = new SignInController(signInValidation, authenticationUseCase)
  const logErrorMongoRepository = new LogMongoRepository()

  return new LogControllerDecorator(signInController, logErrorMongoRepository)
}
