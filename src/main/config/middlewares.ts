import { type Express } from 'express'
import { bodyParser } from '../middlewares/bodyParser'
import { cors } from '../middlewares/cors'
import { contentType } from '../middlewares/contentType'

export default function (app: Express): void {
  app.use(cors)
  app.use(bodyParser)
  app.use(contentType)
}
