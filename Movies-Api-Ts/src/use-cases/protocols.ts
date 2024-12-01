import type { getMovieParams } from "./getMovies/protocols";

export type httpResponse<T> = {
  statusCode: number;
  body?: T;
};

export type httpRequest<B> = {
  params?: getMovieParams;
  headers?: Record<string, string>;
  body?: B;
};

export enum httpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  SERVER_ERROR = 500,
  NO_CONTENT = 204,
  CANNOT_FOUND = 404,
  CONFLICT = 409,
}
