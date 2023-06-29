import { type HttpRequest, type HttpResponse } from './Http'

export interface Controller {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>
}
