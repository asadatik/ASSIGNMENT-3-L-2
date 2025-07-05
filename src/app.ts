import express, { Application, Request, Response } from "express";
import cors from "cors"; // 🔥 1. Import CORS

import { bookRoutes } from "./app/controllers/book.controller";
import { borrowRoutes } from "./app/controllers/borrow.controller";

const app: Application = express();

// 🔥 2. Use CORS middleware (allows cross-origin requests)
app.use(cors());

app.use(express.json());

app.use("/api", bookRoutes);
app.use("/api", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to library App");
});

export default app;
