import { type HttpResponse } from '../protocols/Http'

export class HttpHelpers {
  static badRequest(error: Error): HttpResponse {
    return {
      statusCode: 400,
      body: error
    }
  }
}
