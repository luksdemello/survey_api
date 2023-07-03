import { type Collection, MongoClient } from 'mongodb'

export class MongoHelper {
  static client: null | MongoClient = null

  static async connect(uri: string): Promise<void> {
    this.client = new MongoClient(uri)

    await this.client.connect()
  }

  static async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close()
    }
  }

  static async dropDatabase(name: string): Promise<void> {
    await this.client?.db(name).dropDatabase()
  }

  static getCollection(name: string): Collection {
    return this.client!.db().collection(name)
  }
}
