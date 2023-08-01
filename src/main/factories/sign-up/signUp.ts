import { AccountMongoRepository } from '../../../infra/repositories/account/AccountMongoRepository'
import { AddAccountUseCase } from '../../../data/use_cases/add_account/AddAccount'
import { SignUpController } from '../../../presentation/controllers/sign_up/SignUp'
import { BcryptAdapter } from '../../../infra/adapters/cryptography/bcrypt_adapter/BcryptAdapter'
import { LogControllerDecorator } from '../../decorators/Log'
import { type Controller } from '../../../presentation/protocols'
import { LogMongoRepository } from '../../../infra/repositories/log/LogMongoRepository'
import { makeSignUpValidation } from './signUpValidation'

export function makeSignUpController(): Controller {
  const salt = 6
  const hasher = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const addAccountUseCase = new AddAccountUseCase(hasher, accountMongoRepository)
  const signUpController = new SignUpController(addAccountUseCase, makeSignUpValidation())
  const logErrorMongoRepository = new LogMongoRepository()

  return new LogControllerDecorator(signUpController, logErrorMongoRepository)
}
