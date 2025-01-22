export class MissingRequestDataError extends Error {
  status_code: number;

  constructor(message: string) {
    super(message);
    this.status_code = 400; //Bad server request
    this.name = "MissingRequestDataError";
  }
}

export class IncorrectDataFormatError extends Error {
  status_code: number;

  constructor(message: string) {
    super(message);
    this.status_code = 400; //Bad server request
    this.name = "IncorrectDataFormatError";
  }
}
