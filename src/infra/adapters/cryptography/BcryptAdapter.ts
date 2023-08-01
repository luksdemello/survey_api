import { type HashCompare } from '../../../data/protocols/criptography/HashCompare'
import { type Hasher } from '../../../data/protocols/criptography/Hasher'
import { hash, compare } from 'bcrypt'

export class BcryptAdapter implements Hasher, HashCompare {
  constructor(private readonly salt: number) {}

  async hash(value: string): Promise<string> {
    const hashedValue = await hash(value, this.salt)

    return hashedValue
  }

  async compare(value: string, hash: string): Promise<boolean> {
    const isValid = await compare(value, hash)
    return isValid
  }
}
