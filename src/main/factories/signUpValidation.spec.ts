import { CompareFieldsValidation } from '../../presentation/helpers/validators/CompareFieldsValidation'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/RequiredFieldValidation'
import { type Validation } from '../../presentation/helpers/validators/Validation'
import { ValidationComposite } from '../../presentation/helpers/validators/ValidationComposite'
import { makeSignUpValidation } from './signUpValidation'

jest.mock('../../presentation/helpers/validators/ValidationComposite')

describe('SignUpValidation Factory', () => {
  it('should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
