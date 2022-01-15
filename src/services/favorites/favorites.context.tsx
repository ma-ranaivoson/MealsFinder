import React from 'react';
import { Restaurant } from '../../features/restaurants/components/RestaurantsInfoCard';

interface FavoriteCtx {
  favorites: Restaurant[];
  // eslint-disable-next-line no-unused-vars
  addToFavorites: (r: Restaurant) => void;
  // eslint-disable-next-line no-unused-vars
  removeFromFavorites: (r: Restaurant) => void;
}

export const FavoriteContext = React.createContext<FavoriteCtx>({
  favorites: [],
  addToFavorites: () => null,
  removeFromFavorites: () => null,
});

export default function FavoriteContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [favorites, setFavorites] = React.useState<Restaurant[]>([]);

  const add = (restaurant: Restaurant) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    setFavorites([...favorites, restaurant]);

  const remove = (restaurant: Restaurant) => {
    const newFavorites = favorites.filter(
      (r) => r.placeId !== restaurant.placeId,
    );
    setFavorites(newFavorites);
  };

  const value = React.useMemo(
    () => ({ favorites, addToFavorites: add, removeFromFavorites: remove }),
    [favorites],
  );

  return (
    <FavoriteContext.Provider
      value={value}
    >
      {children}
    </FavoriteContext.Provider>
  );
}
