import { Request, Response } from "express"
import { prismaClient } from "../db/client"
import { converToType } from "../helpers/utils"

export const createGenre = async (req: Request, res: Response) => {

    const { name, movies } = req.body
    const { movieId } = req.params

    try {
        if (!name) throw new Error("Missing fields")

        const genre = await prismaClient.genre.create({ data: { name, movies } })


        res.status(201).json(genre)
    }
    catch (error) {

        res.status(500).json(error)
    }
}

export const getGenreById = async (req: Request, res: Response) => {

    const { genreId } = req.params

    try {
        const genre = await prismaClient.genre.findUnique({ where: { id: converToType(genreId) } })

        res.status(200).json(genre)
    }
    catch (error) {

        res.status(500).json(error)
    }
}

export const deleteGenre = async (req: Request, res: Response) => {

    const { genreId } = req.params

    try {
        const genre = await prismaClient.genre.delete({ where: { id: converToType(genreId) } })

        res.status(204).json(genre)
    }
    catch (error) {

        res.status(500).json(error)
    }

}
