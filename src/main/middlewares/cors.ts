import { type NextFunction, type Request, type Response } from 'express'

export function cors(request: Request, response: Response, next: NextFunction): void {
  response.set('access-control-allow-origin', '*')
  response.set('access-control-allow-headers', '*')
  response.set('access-control-allow-methods', '*')
  next()
}
