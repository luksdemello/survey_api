import { type Collection, MongoClient } from 'mongodb'

export class MongoHelper {
  static client: null | MongoClient = null
  static uri: string = ''

  static async connect(uri: string): Promise<void> {
    this.client = new MongoClient(uri)
    this.uri = uri
    await this.client.connect()
  }

  static async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close()
      this.client = null
    }
  }

  static async dropDatabase(name: string): Promise<void> {
    await this.client?.db(name).dropDatabase()
  }

  static async getCollection(name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.uri)
    }
    return this.client!.db().collection(name)
  }

  static map<T>(data: any): T | null {
    if (!data) return null

    return {
      ...data,
      id: data._id.toString()
    }
  }
}
