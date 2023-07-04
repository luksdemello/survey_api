import { Router, type Express } from 'express'
import { readdirSync } from 'node:fs'
import { resolve, join } from 'node:path'

export default function(app: Express): void {
  const router = Router()

  app.use('/api', router)
  const path = resolve(__dirname, '..', 'routes')
  const files = readdirSync(path)
  files.forEach(async (file) => {
    const filePath = join(path, file)

    if (file.endsWith('Routes.ts')) {
      const module = await import(filePath)
      const route = module.default

      route(router)
    }
  })
}
