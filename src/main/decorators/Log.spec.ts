import { type LogErrorRepository } from '../../data/protocols/LogErrorRepository'
import { HttpHelpers } from '../../presentation/helpers/http/HttpHelpers'
import { type Controller, type HttpRequest, type HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './Log'

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError(stackError: string): Promise<void> {
    }
  }

  return new LogErrorRepositoryStub()
}

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse = {
        statusCode: 200,
        body: {
          name: 'any_name'
        }
      }
      return httpResponse
    }
  }
  return new ControllerStub()
}

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)

  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}

const makefakeRequest = (): HttpRequest => (
  {
    body: {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
  }
)

describe('LogController Decorator', () => {
  it('should call controller handle with httpRequest', async () => {
    const { controllerStub, sut } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(makefakeRequest())
    expect(handleSpy).toBeCalledWith(makefakeRequest())
  })

  it('should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makefakeRequest())
    expect(response).toEqual({
      statusCode: 200,
      body: {
        name: 'any_name'
      }
    })
  })

  it('should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    const error = HttpHelpers.serverError(fakeError)
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise((resolve) => {
      resolve(error)
    }))
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
    await sut.handle(makefakeRequest())
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
