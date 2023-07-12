import { type EmailValidator } from './../../presentation/protocols/EmailValidator'
import { CompareFieldsValidation } from '../../presentation/helpers/validators/CompareFieldsValidation'
import { EmailValidation } from '../../presentation/helpers/validators/EmailValidation'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/RequiredFieldValidation'
import { type Validation } from '../../presentation/helpers/validators/Validation'
import { ValidationComposite } from '../../presentation/helpers/validators/ValidationComposite'
import { makeSignUpValidation } from './signUpValidation'

jest.mock('../../presentation/helpers/validators/ValidationComposite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('SignUpValidation Factory', () => {
  it('should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation(makeEmailValidator(), 'email'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
