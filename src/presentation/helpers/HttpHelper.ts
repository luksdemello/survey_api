import { type HttpResponse } from '../protocols/Http'

export class HttpHelper {
  static badRequest(error: Error): HttpResponse {
    return {
      statusCode: 400,
      body: error
    }
  }
}
