
import { AuthenticationUseCase } from './Authentication'
import { type LoadAccountByEmailRepository } from '../../protocols/LoadAccountByEmailRepository'
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
    async load(email: string): Promise<AccountModel> {
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
})
