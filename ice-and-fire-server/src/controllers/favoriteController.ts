import { Request, Response } from "express";
import { users } from "../models/userModel";
import { IFavorite } from "../types/favorite";
import { HttpStatus } from "../constants/constants";

export const getFavorites = (req: Request, res: Response) => {
  const user = (req as any).user;
  const foundUser = users.find((u) => u.id === user.id);

  if (!foundUser) {
    return res.status(HttpStatus.NOT_FOUND).json({ message: "User not found" });
  }

  res.json({ favorites: foundUser.favorites });
};

export const toggleFavorite = (req: Request, res: Response) => {
  const user = (req as any).user;
  const favorite: IFavorite = req.body;

  if (!favorite.url || !favorite.name) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: "Favorite must have url and name" });
  }

  const foundUser = users.find((u) => u.id === user.id);
  if (!foundUser) {
    return res.status(HttpStatus.NOT_FOUND).json({ message: "User not found" });
  }

  const existingFavoriteIndex = foundUser.favorites.findIndex(
    (f) => f.url === favorite.url
  );

  if (existingFavoriteIndex !== -1) {
    foundUser.favorites.splice(existingFavoriteIndex, 1);
    res.json({ message: "Favorite removed successfully", action: "removed" });
  } else {
    // Add new favorite
    foundUser.favorites.push(favorite);
    res.status(HttpStatus.CREATED).json({
      message: "Favorite added successfully",
      action: "added",
      favorite,
    });
  }
};

export const removeFavorite = (req: Request, res: Response) => {
  const user = (req as any).user;
  const { url } = req.params;

  if (!url) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: "Favorite URL required" });
  }

  const foundUser = users.find((u) => u.id === user.id);
  if (!foundUser) {
    return res.status(HttpStatus.NOT_FOUND).json({ message: "User not found" });
  }

  const favoriteIndex = foundUser.favorites.findIndex((f) => f.url === url);
  if (favoriteIndex === -1) {
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: "Favorite not found" });
  }

  foundUser.favorites.splice(favoriteIndex, 1);
  res.json({ message: "Favorite removed successfully" });
};
