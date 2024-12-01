import { Router, type Request, type Response } from "express";
import { GetMovieCase } from "../../use-cases/getMovies/get-movie-case";
import { MovieRepository } from "../../repositories/movies-repository/movies-repository";
import { CreateMovieCase } from "../../use-cases/create-movie-case/create-movie-case";
import { DeleteMovieCase } from "../../use-cases/delete-movie-case/delete-movie-case";
import { validateBody } from "../../middlewares/validateBody";
import { validateParams } from "../../middlewares/validateParams";
import { errorHandler } from "../../middlewares/errorHandler";
import { logRequests } from "../../middlewares/logRequests";
import { validateCreateMovie } from "../../middlewares/validateCreateMovie";

const router = Router();

// Repository
const moviesRepository = new MovieRepository();

// Use cases
const getMoviesUseCase = new GetMovieCase(moviesRepository);
const createMovieUseCase = new CreateMovieCase(moviesRepository);
const deleteMovieUseCase = new DeleteMovieCase(moviesRepository);

// Global middleware
router.use(logRequests);

// Routes
router.get("/", async (_req: Request, res: Response) => {
  try {
    const getRes = await getMoviesUseCase.getAllMovies();

    const { body, statusCode } = getRes;

    res.status(statusCode).json(body);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

router.get(
  "/:id",
  validateParams(["id"]),
  async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const httpRequest = {
        params: { id },
      };

      const getRes = await getMoviesUseCase.getMovie(httpRequest);

      const { body, statusCode } = getRes;

      res.status(statusCode).json(body);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong." });
    }
  }
);

router.post(
  "/",
  validateCreateMovie, // Middleware para validar os dados da requisição
  async (req: Request, res: Response) => {
    try {
      const { name, duration, category } = req.body;

      const bodyReq = {
        name,
        duration,
        category,
      };

      const getRes = await createMovieUseCase.createMovie({
        body: bodyReq,
      });

      const { body, statusCode } = getRes;

      res.status(statusCode).json(body);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.delete(
  "/:id",
  validateParams(["id"]),
  async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const getRes = await deleteMovieUseCase.deleteMovie(id);

      const { body, statusCode } = getRes;

      res.status(statusCode).json(body);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Error handling middleware
router.use(errorHandler);

export default router;
