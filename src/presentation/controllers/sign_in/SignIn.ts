import { MissingParamError } from '../../errors'
import { HttpHelpers } from '../../helpers/HttpHelpers'
import { type Controller, type HttpRequest, type HttpResponse } from '../../protocols'
import { type EmailValidator } from '../sign_up/SignUpProtocols'

export class SignInController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return HttpHelpers.badRequest(new MissingParamError(field))
        }
      }

      const { email } = httpRequest.body

      this.emailValidator.isValid(email)

      return {
        body: '',
        statusCode: 400
      }
    } catch (error) {
      return HttpHelpers.serverError(error)
    }
  }
}
