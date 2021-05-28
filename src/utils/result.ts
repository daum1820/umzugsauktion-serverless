export enum StatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  INTERNAL_SERVER_ERROR = 500
}

class Result {

  constructor(private statusCode: StatusCode, private message?: string) {}

  toString() {
    return {
      statusCode: this.statusCode,
      body: JSON.stringify({
        code: StatusCode[this.statusCode],
        message: this.message,
      }),
    };
  }
}

export class ResultBuilder {
  static success(message: string) {
    const result = new Result(StatusCode.OK, message);
    console.log('[ResultBuilder] success', result.toString());
    return result.toString();
  }

  static error(error: StatusCode, message?: string) {
    const result = new Result(error, message);
    console.log('[ResultBuilder] error', result.toString());
    return result.toString();
  }
}