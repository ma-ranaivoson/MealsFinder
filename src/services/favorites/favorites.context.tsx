import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

export function FavoriteContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [favorites, setFavorites] = React.useState<Restaurant[]>([]);

  const saveFavorites = async (value: Restaurant[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@favorites', jsonValue);
    } catch (e) {
      throw new Error('There is an error while saving favorites');
    }
  };

  const loadFavorites = async () => {
    try {
      const value = await AsyncStorage.getItem('@favorites');
      if (value !== null) {
        setFavorites(JSON.parse(value));
      }
    } catch (e) {
      throw new Error('There is an error while loading favorites');
    }
  };

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

  React.useEffect(() => {
    loadFavorites();
  }, []);

  React.useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
}
