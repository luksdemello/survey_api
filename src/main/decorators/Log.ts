import { type Controller, type HttpRequest, type HttpResponse } from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  constructor(private readonly controller: Controller) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpRespose = await this.controller.handle(httpRequest)

    if (httpRespose.statusCode === 500) {
      // log de erro
    }

    return httpRespose
  }
}
