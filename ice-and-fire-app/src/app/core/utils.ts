import { ICharacter } from './models';

export const getCharacterIdFromUrl = (url: string) => {
  return url.split('/').pop()?.replace('characters/', '');
};

export const isCharacterInFavorites = (
  character: ICharacter | null | undefined,
  favorites: ICharacter[]
): boolean => {
  if (!character?.url) return false;

  const characterId = getCharacterIdFromUrl(character.url);
  if (!characterId) return false;

  return favorites.some(
    (fav: ICharacter) => getCharacterIdFromUrl(fav.url) === characterId
  );
};
