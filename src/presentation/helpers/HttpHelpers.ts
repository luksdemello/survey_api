import { ServerError } from '../errors/ServerError'
import { type HttpResponse } from '../protocols/Http'

export class HttpHelpers {
  static badRequest(error: Error): HttpResponse {
    return {
      statusCode: 400,
      body: error
    }
  }

  static serverError(): HttpResponse {
    return {
      statusCode: 500,
      body: new ServerError()
    }
  }

  static success(data: any): HttpResponse {
    return {
      statusCode: 200,
      body: data
    }
  }
}
