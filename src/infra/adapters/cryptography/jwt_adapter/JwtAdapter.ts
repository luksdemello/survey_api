import { type Encrypter } from '../../../../data/protocols/criptography/Encrypter'
import { sign } from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  constructor(private readonly secret: string) {}
  async encrypt(value: string): Promise<string> {
    const token = sign({ id: value }, this.secret)
    return token
  }
}
