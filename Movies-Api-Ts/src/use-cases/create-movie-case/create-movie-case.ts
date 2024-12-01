import type { Movie } from "../../entities/Movie/Movie";
import type { MovieRepository } from "../../repositories/movies-repository/movies-repository";
import {
  badRequest,
  internalServerError,
  created,
  conflict,
} from "../../utils/response-types";
import type { httpRequest, httpResponse } from "../protocols";
import type { CreateMovieInput, createMovieProtocol } from "./protocols";

export class CreateMovieCase implements createMovieProtocol {
  constructor(private readonly moviesRepository: MovieRepository) {}

  async createMovie(
    req: httpRequest<CreateMovieInput>
  ): Promise<httpResponse<Movie | string>> {
    try {
      if (!req.body) {
        return badRequest("Body missing in request.");
      }

      const { name, category, duration } = req.body;

      const aMovie = await this.moviesRepository.createMovie({
        name,
        category,
        duration,
      });

      if (!aMovie) {
        return conflict("A movie with this name already exists.");
      }

      return created(aMovie);
    } catch (error) {
      console.log(error);

      return internalServerError();
    }
  }
}
