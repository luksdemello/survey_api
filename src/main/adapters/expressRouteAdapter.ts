import { type Request, type Response } from 'express'
import { type HttpRequest, type Controller } from '../../presentation/protocols'

export function adapterRoute(controller: Controller) {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest = {
      body: request.body
    }

    const httpResponse = await controller.handle(httpRequest)

    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
