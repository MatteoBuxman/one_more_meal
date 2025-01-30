export class MissingRequestDataError extends Error {
  status_code: number;
  json_reply: string; //The reply string to send to the client

  constructor(message: string, json_reply : string = '{"error_message": "Request is missing required data."}') {
    super(message);
    this.status_code = 400; //Bad server request
    this.name = "MissingRequestDataError";
    this.json_reply = json_reply;

  }
}

export class IncorrectDataFormatError extends Error {
  status_code: number;
  json_reply: string; //The reply string to send to the client

  constructor(message: string, json_reply : string = '{"error_message": "Incorrect Data Format recieved."}') {
    super(message);
    this.status_code = 400; //Bad server request
    this.name = "IncorrectDataFormatError";
    this.json_reply = json_reply;

  }
}

export class InternalServerError extends Error {
  status_code: number;
  json_reply: string; //The reply string to send to the client

  constructor(message: string, json_reply : string = '{"error_message": "Internal Server Error"}', options?: ErrorOptions) {
    super(message, options);
    this.status_code = 500; //Internal server error
    this.name = "InternalServerError";
    this.json_reply = json_reply;
  }
}
