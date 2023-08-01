import { ServerError } from '../../errors/ServerError'
import { UnauthorizedError } from '../../errors/UnauthorizedError'
import { type HttpResponse } from '../../protocols/Http'

export class HttpHelpers {
  static badRequest(error: Error): HttpResponse {
    return {
      statusCode: 400,
      body: error
    }
  }

  static serverError(error: Error): HttpResponse {
    return {
      statusCode: 500,
      body: new ServerError(error.stack!)
    }
  }

  static unauthorized(): HttpResponse {
    return {
      statusCode: 401,
      body: new UnauthorizedError()
    }
  }

  static success(data: any): HttpResponse {
    return {
      statusCode: 200,
      body: data
    }
  }
}
