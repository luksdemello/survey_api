import { type LogErrorRepository } from '../../../data/protocols/LogErrorRepository'
import { MongoHelper } from '../../db/mongodb/mongodb'

export class LogMongoRepository implements LogErrorRepository {
  async logError(stackError: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.insertOne({
      stackError,
      date: new Date()
    })
  }
}
