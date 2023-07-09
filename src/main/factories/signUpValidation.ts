
import { RequiredFieldValidation } from '../../presentation/helpers/validators/RequiredFieldValidation'
import { type Validation } from '../../presentation/helpers/validators/Validation'
import { ValidationComposite } from '../../presentation/helpers/validators/ValidationComposite'

export function makeSignUpValidation(): ValidationComposite {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
