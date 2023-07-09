import {
  type Authentication,
  type Controller,
  type HttpRequest,
  type HttpResponse,
  type EmailValidator
} from './SignInProtocols'
import { InvalidParamError, MissingParamError } from '../../errors'
import { HttpHelpers } from '../../helpers/HttpHelpers'

export class SignInController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly authentication: Authentication
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return HttpHelpers.badRequest(new MissingParamError(field))
        }
      }

      const { email, password } = httpRequest.body

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return HttpHelpers.badRequest(new InvalidParamError('email'))
      }

      const accessToken = await this.authentication.execute({ email, password })
      if (!accessToken) {
        return HttpHelpers.unauthorized()
      }

      return HttpHelpers.success({ accessToken })
    } catch (error) {
      return HttpHelpers.serverError(error)
    }
  }
}
