import { httpStatusCode, type httpResponse } from "../use-cases/protocols";

export const badRequest = (message: string): httpResponse<string> => {
  return {
    statusCode: httpStatusCode.BAD_REQUEST,
    body: message,
  };
};

export const ok = <T>(body: any): httpResponse<T> => {
  return {
    statusCode: httpStatusCode.OK,
    body: body,
  };
};

export const created = <T>(body: any): httpResponse<T> => {
  return {
    statusCode: httpStatusCode.CREATED,
    body: body,
  };
};

export const internalServerError = (): httpResponse<string> => {
  return {
    statusCode: httpStatusCode.SERVER_ERROR,
    body: "Something went wrong.",
  };
};

export const cannotFound = (): httpResponse<string> => {
  return {
    statusCode: httpStatusCode.CANNOT_FOUND,
    body: "Cannot found Movie.",
  };
};

export const conflict = <T>(body: any): httpResponse<T> => {
  return {
    statusCode: httpStatusCode.CONFLICT,
    body: body,
  };
};
