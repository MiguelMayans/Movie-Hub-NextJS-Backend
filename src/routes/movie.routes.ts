import { Router } from "express";
import { createMovie, deleteMovie, getAllMovies, updateMovie } from "../controllers/movies.controller";

const moviesRoutes = Router()

moviesRoutes.get("/:userId", getAllMovies)

moviesRoutes.post("/:userId", createMovie)

moviesRoutes.patch("/:userId/:movieId", updateMovie)

moviesRoutes.delete("/:userId/:movieId", deleteMovie)

export default moviesRoutes