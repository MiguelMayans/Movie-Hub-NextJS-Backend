import { Request, Response } from "express";
import { prisma } from "../server";
import { converToType } from "../helpers/utils";

export const createGenre = async (req: Request, res: Response) => {
  const { name, movies } = req.body;
  const { movieId } = req.params;

  try {
    if (!name) throw new Error("Missing fields");

    const genre = await prisma.genre.create({ data: { name, movies } });

    res.status(201).json(genre);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getGenreById = async (req: Request, res: Response) => {
  const genreId = Number(req.params.genreId);

  try {
    const genre = await prisma.genre.findUnique({
      where: { id: genreId },
    });

    res.status(200).json(genre);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteGenre = async (req: Request, res: Response) => {
  const genreId = Number(req.params.genreId);

  try {
    const genre = await prisma.genre.delete({
      where: { id: genreId },
    });

    res.status(204).json(genre);
  } catch (error) {
    res.status(500).json(error);
  }
};
