import { type Encrypter } from '../../../data/protocols/Encrypter'
import bcrypt from 'bcrypt'
import { BcryptAdapter } from './BcryptAdapter'

interface SutTypes {
  sut: Encrypter
  salt: number
}

const makeSut = (): SutTypes => {
  const salt = 6
  const sut = new BcryptAdapter(salt)

  return {
    sut,
    salt
  }
}
jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise(resolve => { resolve('hash') })
  }
}))

describe('Bcrypt Adapter', () => {
  it('should call bcrypt with correct value', async () => {
    const { sut, salt } = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')

    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  it('should throw if bcrypt throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(async () => new Promise((resolve, reject) => { reject(new Error()) }))

    const promise = sut.encrypt('any_value')

    await expect(promise).rejects.toThrow()
  })

  it('should return a hash on success', async () => {
    const { sut } = makeSut()
    const hash = await sut.encrypt('any_value')

    expect(hash).toBe('hash')
  })
})
