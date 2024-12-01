import type { Movie } from "../../entities/Movie/Movie";
import type { httpRequest, httpResponse } from "../protocols";

export type CreateMovieInput = {
  name: string;
  category: string;
  duration: number;
};

export interface createMovieProtocol {
  createMovie(
    req: httpRequest<CreateMovieInput>
  ): Promise<httpResponse<Movie | string>>;
}
