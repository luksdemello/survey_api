import {
  type AccountModel,
  type AddAccountModel,
  type Encrypter,
  type AddAccountRepository
} from './AddAccountProtocols'
import { AddAccountUseCase } from './AddAccount'

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise(resolve => { resolve('hashed_password') })
    }
  }

  return new EncrypterStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async create(account: AddAccountModel): Promise<AccountModel> {
      return makeFakeAccount()
    }
  }

  return new AddAccountRepositoryStub()
}

interface SutTypes {
  sut: AddAccountUseCase
  encrypterStub: Encrypter
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepository()
  const encrypterStub = makeEncrypter()
  const sut = new AddAccountUseCase(encrypterStub, addAccountRepositoryStub)

  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub
  }
}

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email',
  password: 'hashed_password'
})

const makeFakeAccountData = (): AddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password'
})

describe('AddAccount UseCase', () => {
  it('should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptySpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.execute(makeFakeAccountData())
    expect(encryptySpy).toHaveBeenCalledWith('valid_password')
  })

  it('should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => {
      reject(new Error())
    }))
    const promise = sut.execute(makeFakeAccountData())
    await expect(promise).rejects.toThrow()
  })

  it('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const createSpy = jest.spyOn(addAccountRepositoryStub, 'create')
    await sut.execute(makeFakeAccountData())
    expect(createSpy).toHaveBeenCalledWith({
      ...makeFakeAccountData(),
      password: 'hashed_password'
    })
  })

  it('should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'create').mockReturnValueOnce(new Promise((resolve, reject) => {
      reject(new Error())
    }))
    const promise = sut.execute(makeFakeAccountData())
    await expect(promise).rejects.toThrow()
  })

  it('should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.execute(makeFakeAccountData())
    expect(account).toEqual(makeFakeAccount())
  })
})
