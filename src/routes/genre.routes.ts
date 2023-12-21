import { Router } from "express";
import { createGenre, deleteGenre, getGenreById } from "../controllers/genre.controller";

const genreRoutes = Router()

genreRoutes.post("/:userId/:movieId", createGenre)

genreRoutes.get("/:userId/:movieId/:genreId", getGenreById)

genreRoutes.delete("/:userId/:movieId/:genreId", deleteGenre)


export default genreRoutes