import { converToType } from "../helpers/utils"
import { Request, Response } from "express"
import { prismaClient } from "../db/client";

export const getAllMovies = async (req: Request, res: Response) => {

    try {
        const allMovies = await prismaClient.movies.findMany({ include: { genre: true } })

        res.status(200).json(allMovies)

    } catch (error) {

        res.status(500).json(error)
    }

}
export const getMovieById = async (req: Request, res: Response) => {

    const { movieId } = req.params

    try {
        const movie = await prismaClient.movies.findUnique({ where: { id: converToType(movieId) } })

        res.status(200).json(movie)
    }
    catch (error) {

        res.status(500).json(error)
    }
}

export const createMovie = async (req: Request, res: Response) => {

    const { name, score, posterImage, genre } = req.body
    const { userId } = req.params

    try {
        if (!name || !score) throw new Error("Missing fields")
        const movie = await prismaClient.movies.create({ data: { name, score, posterImage, genre: { create: [{ genre: { create: { name: genre } } }] }, User: { connect: { id: converToType(userId) } } } })

        res.status(201).json(movie)

    } catch (error) {
        res.status(500).json(error)
    }
}

export const updateMovie = async (req: Request, res: Response) => {

    const { movieId } = req.params
    const { name, score, posterImage, genre } = req.body


    try {
        const movie = await prismaClient.movies.update({ where: { id: converToType(movieId) }, data: { name: name, score: score, posterImage: posterImage, genre: { create: [{ genre: { create: { name: genre } } }] } } })

        res.status(201).json(movie)
    }
    catch (error) {

        res.status(500).json(error)
    }

}

export const deleteMovie = async (req: Request, res: Response) => {

    const { movieId } = req.params

    try {
        const movie = await prismaClient.movies.delete({ where: { id: converToType(movieId) } })

        res.status(204).json(movie)
    }
    catch (error) {

        res.status(500).json(error)
    }

}