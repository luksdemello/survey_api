import { MissingParamError } from '../../errors'
import { HttpHelpers } from '../../helpers/HttpHelpers'
import { type Controller, type HttpRequest, type HttpResponse } from '../../protocols'

export class SignInController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['email']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return HttpHelpers.badRequest(new MissingParamError(field))
      }
    }

    return {
      body: '',
      statusCode: 400
    }
  }
}
