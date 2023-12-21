import { Request, Response } from "express"
import { prismaClient } from "../db/client"
import { converToType } from "../helpers/utils"

export const getAllUsers = async (req: Request, res: Response) => {

    try {
        const allUsers = await prismaClient.user.findMany({ include: { movies: { include: { genre: true } } } })

        res.status(200).json(allUsers)

    } catch (error) {

        res.status(500).json(error)
    }

}

export const createUser = async (req: Request, res: Response) => {

    const { name, email } = req.body

    try {
        if (!name || !email) throw new Error("Missing fields")
        const newUser = await prismaClient.user.create({ data: { name, email } })

        res.status(201).send(newUser)
    }
    catch (error) {

        res.status(500).json(error)
    }
}


export const getUserByEmail = async (req: Request, res: Response) => {
    const { userEmail } = req.params;

    try {
        const user = await prismaClient.user.findUnique({
            where: { email: userEmail },
            include: {
                movies: {
                    include: {
                        genres: {
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

    const { userId } = req.params
    const { name, email } = req.body

    try {
        const user = await prismaClient.user.update({ where: { id: converToType(userId) }, data: { name: name, email: email } })

        res.status(201).json(user)
    }
    catch (error) {

        res.status(500).json(error)
    }

}

export const deleteUser = async (req: Request, res: Response) => {

    const { userId } = req.params

    try {
        const user = await prismaClient.user.delete({ where: { id: converToType(userId) } })

        res.status(204).json(user)
    }
    catch (error) {

        res.status(500).json(error)
    }

}