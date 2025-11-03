import { IFavorite } from "./favorite";

export interface IUser {
  id: number;
  email: string;
  passwordHash: string;
  favorites: IFavorite[];
}
