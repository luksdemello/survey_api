import { type LogErrorRepository } from '../../data/protocols/LogErrorRepository'
import { type Controller, type HttpRequest, type HttpResponse } from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpRespose = await this.controller.handle(httpRequest)

    if (httpRespose.statusCode === 500) {
      await this.logErrorRepository.log(httpRespose.body.stack)
    }

    return httpRespose
  }
}
