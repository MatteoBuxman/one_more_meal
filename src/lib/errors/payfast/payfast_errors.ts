export class PayfastRequestError extends Error {
  status_code: number;
  body: string;

  constructor(message: string, status_code: number, body: string = "") {
    super(message);
    this.name = "PayfastRequestError";
    this.status_code = status_code;
    this.body = body;
  }
}

export class PayfastValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PayfastValidationError";
  }
}
