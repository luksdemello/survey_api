import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './RequiredFieldValidation'

interface SutTypes {
  sut: RequiredFieldValidation
}

const makeSut = (): SutTypes => {
  const sut = new RequiredFieldValidation('field')

  return {
    sut
  }
}

describe('Required Field Validation', () => {
  it('should return a MissingOaramError if validation fails', async () => {
    const { sut } = makeSut()
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual((new MissingParamError('field')))
  })

  it('should not return if validation success', async () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_name' })
    expect(error).toBeFalsy()
  })
})
