import { type Express } from 'express'
import { bodyParser, cors, contentType } from '../middlewares'

export default function (app: Express): void {
  app.use(cors)
  app.use(bodyParser)
  app.use(contentType)
}
