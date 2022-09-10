import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Restaurant } from '../../features/restaurants/components/RestaurantsInfoCard';
import { AuthenticationContext } from '../authentication/authentication.context';

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
  const { user } = React.useContext(AuthenticationContext);

  const saveFavorites = async (value: Restaurant[], uid: string) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@favorites-${uid}`, jsonValue);
    } catch (e) {
      throw new Error('There is an error while saving favorites');
    }
  };

  const loadFavorites = async (uid: string) => {
    try {
      const value = await AsyncStorage.getItem(`@favorites-${uid}`);
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
    if (user) {
      loadFavorites(user.uid);
    }
  }, [user]);

  React.useEffect(() => {
    if (user) {
      saveFavorites(favorites, user.uid);
    }
  }, [favorites, user]);

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
}
