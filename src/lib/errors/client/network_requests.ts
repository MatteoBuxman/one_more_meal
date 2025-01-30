type ErrorMessageReply = {
    error_message: string; // Required message property
  } & {
    [key: string]: string; // Additional string properties
  };  


export class FailedBackendFetch extends Error{
    status_code: number;
    error_reply_from_server: ErrorMessageReply;

    constructor(message: string, json_reply_from_server: ErrorMessageReply = {"error_message": "Could not fetch data."}){
        super(message);
        this.status_code = 500;
        this.name = "FailedBackendFetch";
        this.error_reply_from_server = json_reply_from_server;
    }
}