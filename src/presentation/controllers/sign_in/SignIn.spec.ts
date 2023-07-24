import {
  type Validation,
  type Authentication,
  type AuthenticationModel,
  type HttpRequest
} from './SignInProtocols'
import { MissingParamError } from '../../errors'
import { HttpHelpers } from '../../helpers/http/HttpHelpers'

import { SignInController } from './SignIn'

const makeAuthenticationStub = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async execute(authenticationModel: AuthenticationModel): Promise<string | null> {
      return 'any_token'
    }
  }

  return new AuthenticationStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error | null {
      return null
    }
  }

  return new ValidationStub()
}

const makeFakeRequest = (): HttpRequest => (
  {
    body: {
      email: 'any_email@mail.com',
      password: 'any_password'
    }
  }
)

interface SutTypes {
  sut: SignInController
  authenticationStub: Authentication
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const authenticationStub = makeAuthenticationStub()
  const sut = new SignInController(validationStub, authenticationStub)

  return {
    sut,
    authenticationStub,
    validationStub
  }
}

describe('SignIn Controller', () => {
  it('should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authenticationSpy = jest.spyOn(authenticationStub, 'execute')
    await sut.handle(makeFakeRequest())
    expect(authenticationSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  it('should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'execute').mockImplementationOnce(() => { throw new Error('') })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(HttpHelpers.serverError(new Error('')))
  })

  it('should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'execute').mockReturnValueOnce(new Promise((resolve) => { resolve(null) }))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(HttpHelpers.unauthorized())
  })

  it('should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(HttpHelpers.success({ accessToken: 'any_token' }))
  })

  it('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  it('should return 400 if Validation return an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(HttpHelpers.badRequest(new MissingParamError('any_field')))
  })
})
