import bcrypt from 'bcrypt'
import { BcryptAdapter } from './BcryptAdapter'

interface SutTypes {
  sut: BcryptAdapter
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
  },

  async compare(): Promise<string> {
    return new Promise(resolve => { resolve('hash') })
  }
}))

describe('Bcrypt Adapter', () => {
  it('should call hash with correct value', async () => {
    const { sut, salt } = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')

    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  it('should throw if hash throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(async () => new Promise((resolve, reject) => { reject(new Error()) }))

    const promise = sut.hash('any_value')

    await expect(promise).rejects.toThrow()
  })

  it('should return a valid hash on hash success', async () => {
    const { sut } = makeSut()
    const hash = await sut.hash('any_value')

    expect(hash).toBe('hash')
  })

  it('should call compare with correct value', async () => {
    const { sut } = makeSut()
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_value', 'any_hash')

    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
  })

  it('should return true when compare success', async () => {
    const { sut } = makeSut()
    const isValid = await sut.compare('any_value', 'any_hash')

    expect(isValid).toBe(true)
  })
})
