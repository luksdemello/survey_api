import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../presentation/helpers/validators'
import { type Validation } from '../../../presentation/protocols/Validation'
import { EmailValidatorAdapter } from '../../adapters/validators/EmailValidatorAdapter'

export function makeSignInValidation(): ValidationComposite {
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation(new EmailValidatorAdapter(), 'email'))
  return new ValidationComposite(validations)
}
