import { converToType } from "../helpers/utils";
import { Request, Response } from "express";
import { prisma } from "../server";

export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const allMovies = await prisma.movies.findMany({
      include: { genre: true },
    });

    res.status(200).json(allMovies);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getMovieById = async (req: Request, res: Response) => {
  const movieId = Number(req.params.movieId);

  try {
    const movie = await prisma.movies.findUnique({
      where: { id: movieId },
    });

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createMovie = async (req: Request, res: Response) => {
  const { name, score, posterImage, genre } = req.body;
  const userId = Number(req.params.userId);

  try {
    if (!name || !score) throw new Error("Missing fields");
    const movie = await prisma.movies.create({
      data: {
        name,
        score,
        posterImage,
        genre: { create: [{ genre: { create: { name: genre } } }] },
        User: { connect: { id: userId } },
      },
    });

    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateMovie = async (req: Request, res: Response) => {
  const movieId = Number(req.params.movieId);
  const { name, score, posterImage, genre } = req.body;

  try {
    const movie = await prisma.movies.update({
      where: { id: movieId },
      data: {
        name: name,
        score: score,
        posterImage: posterImage,
        genre: { create: [{ genre: { create: { name: genre } } }] },
      },
    });

    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  const movieId = Number(req.params.movieId);

  try {
    const movie = await prisma.movies.delete({
      where: { id: movieId },
    });

    res.status(204).json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
};
