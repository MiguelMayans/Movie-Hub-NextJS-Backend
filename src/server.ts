import express from "express";
import userRoutes from "./routes/user.routes";
import helmet from "helmet";
import morgan from "morgan";
import moviesRoutes from "./routes/movie.routes";
import genreRoutes from "./routes/genre.routes";
// import { checkJwtMiddleware } from "./middleware/checkJwt.middleware";
import errorHandler from "./middleware/error.middleware";
import cors from "cors";
import { Request, Response } from "express";

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));

app.use("/user", userRoutes);
app.use("/movies", moviesRoutes);
app.use("/genre", genreRoutes);

app.get("/", (req: Request, res: Response): void => {
  res.status(200).json({ message: "This is working broo!" });
});

app.use(errorHandler);

export default app;
