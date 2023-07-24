import { InvalidParamError } from '../../errors'
import { CompareFieldsValidation } from './CompareFieldsValidation'

interface SutTypes {
  sut: CompareFieldsValidation
}

const makeSut = (): SutTypes => {
  const sut = new CompareFieldsValidation('field', 'fieldToCompare')

  return {
    sut
  }
}

describe('CompareFields Validation', () => {
  it('should return a InvalidParamError if validation fails', async () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_value', fieldToCompare: 'other_value' })
    expect(error).toEqual((new InvalidParamError('fieldToCompare')))
  })

  it('should not return if validation success', async () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_value', fieldToCompare: 'any_value' })
    expect(error).toBeFalsy()
  })
})
