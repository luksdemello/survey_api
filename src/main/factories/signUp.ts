import { AccountMongoRepository } from './../../infra/repositories/account/AccountMongoRepository'
import { AddAccountUseCase } from './../../data/use_cases/add_account/AddAccount'
import { SignUpController } from '../../presentation/controllers/sign_up/SignUp'
import { EmailValidatorAdapter } from '../../utils/EmailValidatorAdapter'
import { BcryptAdapter } from '../../infra/adapters/cryptography/BcryptAdapter'

export function makeSignUpController(): SignUpController {
  const salt = 6
  const emailValidator = new EmailValidatorAdapter()
  const encrypter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const addAccountUseCase = new AddAccountUseCase(encrypter, accountMongoRepository)
  const signUpController = new SignUpController(emailValidator, addAccountUseCase)

  return signUpController
}