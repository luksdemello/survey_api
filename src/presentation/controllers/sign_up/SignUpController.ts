import {
  type Validation,
  type AddAccount,
  type Controller,
  type HttpRequest,
  type HttpResponse
} from './SignUpControllerProtocols'
import { HttpHelpers } from '../../helpers/http/HttpHelpers'

export class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return HttpHelpers.badRequest(error)
      }

      const { name, email, password } = httpRequest.body

      const account = await this.addAccount.execute({
        name,
        email,
        password
      })

      return HttpHelpers.success(account)
    } catch (error) {
      return HttpHelpers.serverError(error)
    }
  }
}
