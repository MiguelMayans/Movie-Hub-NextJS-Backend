import { Request, Response } from "express";
import { prisma } from "../server";
import { converToType } from "../helpers/utils";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await prisma.user.findMany({
      include: { movies: { include: { genre: true } } },
    });

    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    if (!name || !email) throw new Error("Missing fields");
    const newUser = await prisma.user.create({ data: { name, email } });

    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUserByEmail = async (req: Request, res: Response) => {
  const { userEmail } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: {
        movies: {
          include: {
            genre: {
              select: { genre: { select: { name: true, id: true } } },
            },
          },
        },
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const { name, email } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { name: name, email: email },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);

  try {
    const user = await prisma.user.delete({
      where: { id: userId },
    });

    res.status(204).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};
