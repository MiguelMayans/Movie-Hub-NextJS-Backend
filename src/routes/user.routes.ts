import { Router } from "express";

import { createUser, deleteUser, getAllUsers, updateUser, getUserByEmail } from "../controllers/user.controllers";
import { checkJwtMiddleware } from "../middleware/checkJwt.middleware";

const userRoutes = Router()

userRoutes.get("/", getAllUsers)

userRoutes.post("/", createUser)

userRoutes.get("/:userEmail", getUserByEmail)

userRoutes.patch("/:userId", checkJwtMiddleware, updateUser)

userRoutes.delete("/:userId", checkJwtMiddleware, deleteUser)

export default userRoutes