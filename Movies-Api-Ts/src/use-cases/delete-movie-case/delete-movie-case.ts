import type { Movie } from "../../entities/Movie/Movie";
import type { MovieRepository } from "../../repositories/movies-repository/movies-repository";
import {
  cannotFound,
  internalServerError,
  ok,
} from "../../utils/response-types";
import type { httpResponse } from "../protocols";
import type { deleteMovieProtocol } from "./protocols";

export class DeleteMovieCase implements deleteMovieProtocol {
  constructor(private readonly repository: MovieRepository) {}

  async deleteMovie(id: string): Promise<httpResponse<Movie | string>> {
    try {
      const deleteMovie = await this.repository.deleteMovie(id);

      if (!deleteMovie) {
        return cannotFound();
      }

      return ok(deleteMovie);
    } catch (error) {
      console.log(error);

      return internalServerError();
    }
  }
}
