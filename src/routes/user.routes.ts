import { Router } from "express";

import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
  getUserByEmail,
} from "../controllers/user.controllers";
// import { checkJwtMiddleware } from "../middleware/checkJwt.middleware";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);

userRoutes.post("/", createUser);

userRoutes.get("/:userEmail", getUserByEmail);

userRoutes.patch("/:userId", updateUser);

userRoutes.delete("/:userId", deleteUser);

export default userRoutes;
