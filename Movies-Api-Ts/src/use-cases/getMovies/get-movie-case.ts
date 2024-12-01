import type { Movie } from "../../entities/Movie/Movie";
import type { MovieRepository } from "../../repositories/movies-repository/movies-repository";
import {
  badRequest,
  internalServerError,
  ok,
} from "../../utils/response-types";
import type { httpRequest, httpResponse } from "../protocols";
import type { getMovieParams, getMoviesProtocols } from "./protocols";

export class GetMovieCase implements getMoviesProtocols {
  constructor(private readonly moviesRepository: MovieRepository) {}

  async getAllMovies(): Promise<httpResponse<Movie[] | string>> {
    try {
      const moviesList = await this.moviesRepository.getMovies();

      if (!moviesList || moviesList.length === 0) {
        return ok<[]>([]);
      }

      return ok<Movie[]>(moviesList);
    } catch (error) {
      console.log(error);

      return internalServerError();
    }
  }

  async getMovie(
    reqParams: httpRequest<getMovieParams>
  ): Promise<httpResponse<Movie | string>> {
    const id = reqParams.params?.id;

    console.log("This is the params: " + id);

    const movie = await this.moviesRepository.findById(String(id));

    if (!movie) {
      return badRequest("Movie don't found");
    }

    return ok(movie);
  }
}
