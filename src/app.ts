import dotenv from "dotenv";
import cors from "cors";
import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import sequelize from "@/lib/sequelize";
import todoRoutes from "@/routes/todo/todo.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/todos", todoRoutes);

// Middleware to handle errors
const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
};
app.use(errorHandler);

// Middleware to handle 404 errors
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Not Found");
});

// Test database connection and sync model
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the database");
    return sequelize.sync();
  })
  .then(() => {
    const port = process.env.SERVER_PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err: Error) => {
    console.error("Unable to connect to the database:", err);
  });

export default app;
