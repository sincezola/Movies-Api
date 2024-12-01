import type { Movie } from "../../entities/Movie/Movie";
import type { httpResponse, httpRequest } from "../protocols";

export type getMovieParams = {
  id: string;
  name?: string;
};

export interface getMoviesProtocols {
  getAllMovies(): Promise<httpResponse<Movie[] | string>>;
  getMovie(
    req: httpRequest<getMovieParams>
  ): Promise<httpResponse<Movie | string>>;
}
