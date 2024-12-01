import type { Movie } from "../../entities/Movie/Movie";
import type { CreateMovieInput } from "../../use-cases/create-movie-case/protocols";

export interface MoviesRepositoryProtocol {
  findById(id: string): Promise<Movie | null>;
  getMovies(): Promise<Movie[]>;
  createMovie(movieProps: CreateMovieInput): Promise<Movie | null>;
  deleteMovie(id: string): Promise<Movie | null>;
}
