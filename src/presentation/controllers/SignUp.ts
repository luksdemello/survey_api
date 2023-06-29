import { InvalidParamError } from '../errors/InvalidParamError'
import { MissingParamError } from '../errors/MissingParamError'
import { HttpHelpers } from '../helpers/HttpHelpers'
import { type Controller } from '../protocols/Controller'
import { type EmailValidator } from '../protocols/EmailValidator'
import { type HttpRequest, type HttpResponse } from '../protocols/Http'

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return HttpHelpers.badRequest(new MissingParamError(field))
      }
    }

    const { email } = httpRequest.body

    const isValid = this.emailValidator.isValid(email)
    if (!isValid) {
      return HttpHelpers.badRequest(new InvalidParamError('email'))
    }

    return HttpHelpers.badRequest(new Error())
  }
}
