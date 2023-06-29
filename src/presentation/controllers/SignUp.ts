import { InvalidParamError, MissingParamError } from '../errors'
import { HttpHelpers } from '../helpers/HttpHelpers'
import { type Controller, type EmailValidator, type HttpRequest, type HttpResponse } from '../protocols'

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return HttpHelpers.badRequest(new MissingParamError(field))
        }
      }

      const { email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return HttpHelpers.badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return HttpHelpers.badRequest(new InvalidParamError('email'))
      }

      return HttpHelpers.badRequest(new Error())
    } catch (error) {
      return HttpHelpers.serverError()
    }
  }
}
