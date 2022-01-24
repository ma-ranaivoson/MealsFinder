/* eslint-disable object-curly-newline */
import React, { useState, useEffect, createContext, useContext } from 'react';
import { LocationContext } from '../location/location.context';
import { restaurantRequest, restaurantTransform } from './restaurant.service';

interface Props {
  children: React.ReactNode;
}

interface Context {
  restaurants: object[];
  isLoading: boolean;
  error: string | null;
}

export const RestaurantContext = createContext<Context>({
  restaurants: [],
  isLoading: false,
  error: '',
});

export function RestaurantContextProvider({ children }: Props) {
  const [restaurants, setRestaurants] = useState<object[] | any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { location } = useContext(LocationContext);

  const retreiveRestaurants = (loc: string) => {
    setIsLoading(true);

    restaurantRequest(loc)
      .then(restaurantTransform)
      .then((res) => {
        setIsLoading(false);
        setRestaurants(res);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };

  useEffect(() => {
    const locationString = `${location?.lat},${location?.lng}`;
    retreiveRestaurants(locationString);
  }, [location]);

  const value = React.useMemo(
    () => ({
      restaurants,
      isLoading,
      error,
    }),
    [restaurants, isLoading, error],
  );

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
}
