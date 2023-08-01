import {
  type AccountModel,
  type AddAccountModel,
  type Hasher,
  type AddAccountRepository
} from './AddAccountProtocols'
import { AddAccountUseCase } from './AddAccount'

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash(value: string): Promise<string> {
      return new Promise(resolve => { resolve('hashed_password') })
    }
  }

  return new HasherStub()
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
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepository()
  const hasherStub = makeHasher()
  const sut = new AddAccountUseCase(hasherStub, addAccountRepositoryStub)

  return {
    sut,
    hasherStub,
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
  it('should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut()
    const hashySpy = jest.spyOn(hasherStub, 'hash')
    await sut.execute(makeFakeAccountData())
    expect(hashySpy).toHaveBeenCalledWith('valid_password')
  })

  it('should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => {
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
