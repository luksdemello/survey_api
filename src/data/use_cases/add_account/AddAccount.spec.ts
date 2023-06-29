import { type Encrypter } from '../../protocols/Encrypter'
import { AddAccountUseCase } from './AddAccount'

describe('AddAccount UseCase', () => {
  it('should call Encrypter with correct password', async () => {
    class EncrypterStub implements Encrypter {
      async encrypt(value: string): Promise<string> {
        return new Promise(resolve => { resolve('hashed_password') })
      }
    }

    const encrypterStub = new EncrypterStub()
    const sut = new AddAccountUseCase(encrypterStub)
    const encryptySpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    await sut.execute(accountData)
    expect(encryptySpy).toHaveBeenCalledWith('valid_password')
  })
})
