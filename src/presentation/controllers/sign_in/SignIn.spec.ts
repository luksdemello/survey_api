import { MissingParamError } from '../../errors'
import { HttpHelpers } from '../../helpers/HttpHelpers'
import { SignInController } from './SignIn'

describe('SignIn Controller', () => {
  it('should return 400 if no email is provided', async () => {
    const sut = new SignInController()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(HttpHelpers.badRequest(new MissingParamError('email')))
  })
})
