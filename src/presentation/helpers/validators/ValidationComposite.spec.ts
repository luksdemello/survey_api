import { MissingParamError } from '../../errors'
import { type Validation } from './Validation'
import { ValidationComposite } from './ValidationComposite'

describe('Validation Composite', () => {
  it('should return an error if any validation fails', () => {
    class ValidationStub implements Validation {
      validate(input: any): Error | null {
        return new MissingParamError('field')
      }
    }
    const validationStub = new ValidationStub()
    const sut = new ValidationComposite([validationStub])
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
