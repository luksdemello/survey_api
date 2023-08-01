import {
  type Validation,
  type Authentication,
  type Controller,
  type HttpRequest,
  type HttpResponse
} from './SignInControllerProtocols'
import { HttpHelpers } from '../../helpers/http/HttpHelpers'

export class SignInController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return HttpHelpers.badRequest(error)
      }

      const { email, password } = httpRequest.body

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
