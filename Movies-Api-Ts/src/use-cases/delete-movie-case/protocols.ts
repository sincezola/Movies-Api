import type { Movie } from "../../entities/Movie/Movie";
import type { httpResponse } from "../protocols";

export interface deleteMovieProtocol {
  deleteMovie(id: string): Promise<httpResponse<Movie | string>>;
}
