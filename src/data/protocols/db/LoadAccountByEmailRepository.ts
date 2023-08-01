import { type AccountModel } from '../../use_cases/add_account/AddAccountProtocols'

export interface LoadAccountByEmailRepository {
  loadByEmail(email: string): Promise<AccountModel | null>
}
