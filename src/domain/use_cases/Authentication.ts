export interface AuthenticationModel {
  email: string
  password: string
}

export interface Authentication {
  execute(authenticationModel: AuthenticationModel): Promise<string>
}
