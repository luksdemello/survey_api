import { MissingParamError } from '../errors/MissingParamError'
import { HttpHelper } from '../helpers/httpHelper'
import { type HttpRequest, type HttpResponse } from '../protocols/Http'

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return HttpHelper.badRequest(new MissingParamError('name'))
    }

    if (!httpRequest.body.email) {
      return HttpHelper.badRequest(new MissingParamError('email'))
    }

    return {
      statusCode: 400,
      body: new Error('Error ')
    }
  }
}
