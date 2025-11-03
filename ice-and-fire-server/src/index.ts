import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import favoriteRoutes from "./routes/favoriteRoutes";
import { HttpMethods } from "./constants/constants";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: [
      HttpMethods.GET,
      HttpMethods.POST,
      HttpMethods.PUT,
      HttpMethods.DELETE,
    ],
    credentials: false,
  })
);

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/favorites", favoriteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
