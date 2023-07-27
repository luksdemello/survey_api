
import { AuthenticationUseCase } from './Authentication'
import { type LoadAccountByEmailRepository } from '../../protocols/db/LoadAccountByEmailRepository'
import { type AccountModel } from '../../../domain/models/Account'
import { type AuthenticationModel } from '../../../domain/use_cases/Authentication'

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

const makeFakeAuthentication = (): AuthenticationModel => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

const makeLoadAccountRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load(email: string): Promise<AccountModel | null> {
      return makeFakeAccount()
    }
  }

  return new LoadAccountByEmailRepositoryStub()
}

interface SutTypes {
  sut: AuthenticationUseCase
  loadAccountByEmailStub: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailStub = makeLoadAccountRepository()
  const sut = new AuthenticationUseCase(loadAccountByEmailStub)

  return {
    sut,
    loadAccountByEmailStub
  }
}

describe('AddAccount UseCase', () => {
  it('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailStub, 'load')
    await sut.execute(makeFakeAuthentication())
    expect(loadSpy).toHaveBeenCalledWith(makeFakeAuthentication().email)
  })

  it('should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailStub } = makeSut()
    jest.spyOn(loadAccountByEmailStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => {
      reject(new Error())
    }))
    const promise = sut.execute(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })

  it('should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailStub } = makeSut()
    jest.spyOn(loadAccountByEmailStub, 'load').mockReturnValueOnce(new Promise(resolve => { resolve(null) }))
    const accessToken = await sut.execute(makeFakeAuthentication())
    expect(accessToken).toBeNull()
  })
})
