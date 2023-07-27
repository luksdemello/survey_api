import { type Encrypter } from '../../../data/protocols/criptography/Encrypter'
import { hash } from 'bcrypt'

export class BcryptAdapter implements Encrypter {
  constructor(private readonly salt: number) {}
  async encrypt(value: string): Promise<string> {
    const hashedValue = await hash(value, this.salt)

    return hashedValue
  }
}
