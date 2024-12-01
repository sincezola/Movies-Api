import express from "express";
import moviesRouter from "./routes/movies/movies-routes";

const app = express();

app.use(express.json());

// Routes
app.use("/movies", moviesRouter);

export default app;
