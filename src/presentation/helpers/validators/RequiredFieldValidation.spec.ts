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
})
