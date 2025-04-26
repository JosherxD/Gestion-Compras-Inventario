export interface ErrorModel {
    ERROR_LIST_ORDER: Errors

  };
  export interface Errors {
    level: string;
    statusDetail: string;
    statusCode: number;
    title: string;
    detail: string;
    response?: ErrorResponse;
  }

  export interface ErrorResponse {
    statusCode: number;
    statusMessage: string;
    body: {
      message: string;
    };
  }
  