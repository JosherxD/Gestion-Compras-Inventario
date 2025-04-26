import { ErrorModel } from "../../domain/models/error.model";

export const ERROR: ErrorModel = {
    ERROR_LIST_ORDER: { 
      level: 'ERROR', 
      statusDetail: 'ERROR_LIST_ORDER', 
      statusCode: 500, 
      title: 'Error order list', 
      detail: 'Error order list', 
    }
} as const;

export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
  NOT_FOUND: 404,
} as const;