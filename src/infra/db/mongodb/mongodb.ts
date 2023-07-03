import { MongoClient } from 'mongodb'

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
}
