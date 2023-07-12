import {
  type Validation,
  type AddAccount,
  type Controller,
  type EmailValidator,
  type HttpRequest,
  type HttpResponse
} from './SignUpProtocols'
import { InvalidParamError } from '../../errors'
import { HttpHelpers } from '../../helpers/HttpHelpers'

export class SignUpController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
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

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return HttpHelpers.badRequest(new InvalidParamError('email'))
      }

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
