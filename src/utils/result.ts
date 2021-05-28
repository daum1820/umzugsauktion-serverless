export enum StatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  INTERNAL_SERVER_ERROR = 500
}

class Result {

  constructor(private statusCode: StatusCode, private data?: string) {}

  toString() {
    return {
      statusCode: this.statusCode,
      body: JSON.stringify({
        code: StatusCode[this.statusCode],
        data: this.data,
      }),
    };
  }
}

export class ResultBuilder {
  static success(data: string) {
    const result = new Result(StatusCode.OK, data);
    console.log('[ResultBuilder] success', result.toString());
    return result.toString();
  }

  static error(error: StatusCode, data?: string) {
    const result = new Result(error, data);
    console.log('[ResultBuilder] error', result.toString());
    return result.toString();
  }
}