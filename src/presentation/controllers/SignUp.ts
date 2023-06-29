import { MissingParamError } from '../errors/MissingParamError'
import { HttpHelpers } from '../helpers/HttpHelpers'
import { type HttpRequest, type HttpResponse } from '../protocols/Http'

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return HttpHelpers.badRequest(new MissingParamError(field))
      }
    }

    return HttpHelpers.badRequest(new Error())
  }
}
