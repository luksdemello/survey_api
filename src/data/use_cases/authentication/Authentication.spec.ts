
import { AuthenticationUseCase } from './Authentication'
import { type LoadAccountByEmailRepository } from '../../protocols/LoadAccountByEmailRepository'
import { type AccountModel } from '../../../domain/models/Account'

const makeLoadAccountRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load(email: string): Promise<AccountModel> {
      const account: AccountModel = {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
      return account
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
    await sut.execute({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
