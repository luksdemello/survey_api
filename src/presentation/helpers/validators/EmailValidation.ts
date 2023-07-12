import { InvalidParamError } from '../../errors'
import { type EmailValidator } from '../../protocols/EmailValidator'
import { type Validation } from './Validation'

export class EmailValidation implements Validation {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly fieldName: string) {}

  validate(input: any): Error | null {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
    return null
  }
}
