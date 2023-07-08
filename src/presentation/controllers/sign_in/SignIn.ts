import { type Authentication } from '../../../domain/use_cases/Authentication'
import { InvalidParamError, MissingParamError } from '../../errors'
import { HttpHelpers } from '../../helpers/HttpHelpers'
import { type Controller, type HttpRequest, type HttpResponse } from '../../protocols'
import { type EmailValidator } from '../sign_up/SignUpProtocols'

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

      await this.authentication.execute({ email, password })

      return {
        body: '',
        statusCode: 400
      }
    } catch (error) {
      return HttpHelpers.serverError(error)
    }
  }
}
