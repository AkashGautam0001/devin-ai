import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./db/db.js";
import usersRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/users", usersRoutes);

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
