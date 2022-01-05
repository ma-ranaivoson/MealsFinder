/* eslint-disable object-curly-newline */
import React, { useState, useEffect, createContext } from 'react';
import { restaurantRequest, restaurantTransform } from './restaurant.service';

interface Props {
  children: React.ReactNode;
}

interface Context {
  restaurants: string | [];
  isLoading: boolean;
  error: string | null;
}

export const RestaurantContext = createContext<Context>({
  restaurants: [],
  isLoading: false,
  error: '',
});

export function RestaurantContextProvider({ children }: Props) {
  const [restaurants, setRestaurants] = useState<[] | string>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const retreiveRestaurants = () => {
    setIsLoading(true);
    setTimeout(() => {
      restaurantRequest()
        .then(restaurantTransform)
        .then((res) => {
          setIsLoading(false);
          setRestaurants(res);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
        });
    }, 2000);
  };

  useEffect(() => {
    retreiveRestaurants();
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <RestaurantContext.Provider value={{ restaurants, isLoading, error }}>
      {children}
    </RestaurantContext.Provider>
  );
}
