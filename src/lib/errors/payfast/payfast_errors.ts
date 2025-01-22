export class PayfastRequestError extends Error {

  status_code: number;

  constructor(message: string, status_code: number) {
    super(message);
    this.name = "PayfastRequestError";
    this.status_code = status_code;
  }
}