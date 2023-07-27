import { type AccountModel } from '../../use_cases/add_account/AddAccountProtocols'

export interface LoadAccountByEmailRepository {
  load(email: string): Promise<AccountModel>
}
