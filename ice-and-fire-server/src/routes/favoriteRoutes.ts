import { Router } from "express";
import {
  getFavorites,
  removeFavorite,
  toggleFavorite,
} from "../controllers/favoriteController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

router.use(verifyToken);

router.get("/", getFavorites);

router.put("/", toggleFavorite);

router.delete("/:url", removeFavorite);

export default router;
