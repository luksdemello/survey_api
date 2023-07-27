
import { AuthenticationUseCase } from './Authentication'
import { type LoadAccountByEmailRepository } from '../../protocols/db/LoadAccountByEmailRepository'
import { type AccountModel } from '../../../domain/models/Account'
import { type AuthenticationModel } from '../../../domain/use_cases/Authentication'
import { type HashCompare } from '../../protocols/criptography/HashCompare'
import { type TokenGenerator } from '../../protocols/criptography/TokenGenerator'

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password'
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

const makeTokenGenerator = (): TokenGenerator => {
  class TokenGeneratorStub implements TokenGenerator {
    async generate(id: string): Promise<string> {
      return 'any_token'
    }
  }

  return new TokenGeneratorStub()
}

const makeHashCompare = (): HashCompare => {
  class HashCompareStub implements HashCompare {
    async compare(value: string, hash: string): Promise<boolean> {
      return true
    }
  }

  return new HashCompareStub()
}

interface SutTypes {
  sut: AuthenticationUseCase
  loadAccountByEmailStub: LoadAccountByEmailRepository
  hashCompareStub: HashCompare
  tokenGeneratorStub: TokenGenerator
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailStub = makeLoadAccountRepository()
  const hashCompareStub = makeHashCompare()
  const tokenGeneratorStub = makeTokenGenerator()
  const sut = new AuthenticationUseCase(loadAccountByEmailStub, hashCompareStub, tokenGeneratorStub)

  return {
    sut,
    loadAccountByEmailStub,
    hashCompareStub,
    tokenGeneratorStub
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

  it('should call HashCompare with correct values', async () => {
    const { sut, hashCompareStub } = makeSut()
    const compareSpy = jest.spyOn(hashCompareStub, 'compare')
    await sut.execute(makeFakeAuthentication())
    expect(compareSpy).toHaveBeenCalledWith(makeFakeAuthentication().password, makeFakeAccount().password)
  })

  it('should throw if HashCompare throws', async () => {
    const { sut, hashCompareStub } = makeSut()
    jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(new Promise((resolve, reject) => {
      reject(new Error())
    }))
    const promise = sut.execute(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })

  it('should return null if HashCompare returns false', async () => {
    const { sut, hashCompareStub } = makeSut()
    jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(new Promise(resolve => { resolve(false) }))
    const accessToken = await sut.execute(makeFakeAuthentication())
    expect(accessToken).toBeNull()
  })

  it('should call TokenGererator with correct id', async () => {
    const { sut, tokenGeneratorStub } = makeSut()
    const generateSpy = jest.spyOn(tokenGeneratorStub, 'generate')
    await sut.execute(makeFakeAuthentication())
    expect(generateSpy).toHaveBeenCalledWith(makeFakeAccount().id)
  })
})
