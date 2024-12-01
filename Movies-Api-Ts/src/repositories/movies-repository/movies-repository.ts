import { Movie } from "../../entities/Movie/Movie";
import type { MoviesRepositoryProtocol } from "./movies-repository-protocols";
import { prisma } from "../../infrastructure/prisma/Prisma-Client";
import type { CreateMovieInput } from "../../use-cases/create-movie-case/protocols";

export class MovieRepository implements MoviesRepositoryProtocol {
  async getMovies(): Promise<Movie[]> {
    const movies = await prisma.movie.findMany();

    return movies.map(
      (movie) =>
        new Movie({
          id: movie.id,
          name: movie.name,
          category: movie.category,
          duration: movie.duration,
        })
    );
  }

  async findById(id: string): Promise<Movie | null> {
    const aMovie = await prisma.movie.findUnique({
      where: {
        id,
      },
    });

    if (!aMovie) {
      return null;
    }

    const { id: movieId, name, category, duration } = aMovie;

    return new Movie({
      id: movieId,
      name,
      category,
      duration,
    });
  }

  async createMovie(movie: CreateMovieInput): Promise<Movie | null> {
    const { name, category, duration } = movie;

    const itHasOnDb = await prisma.movie.findFirst({
      where: {
        name,
      },
    });

    if (itHasOnDb) {
      return null;
    }

    const aMovie = await prisma.movie.create({
      data: {
        name,
        duration,
        category,
      },
    });

    if (!aMovie) {
      return null;
    }

    const {
      id: movieId,
      name: nameMovie,
      category: categoryMovie,
      duration: durationMovie,
    } = aMovie;

    return new Movie({
      id: movieId,
      name: nameMovie,
      category: categoryMovie,
      duration: durationMovie,
    });
  }

  async deleteMovie(id: string): Promise<Movie | null> {
    const movie = await prisma.movie.findUnique({ where: { id } });

    if (!movie) {
      return null;
    }

    await prisma.movie.delete({ where: { id } });

    return new Movie({
      id: movie.id,
      name: movie.name,
      category: movie.category,
      duration: movie.duration,
    });
  }
}
