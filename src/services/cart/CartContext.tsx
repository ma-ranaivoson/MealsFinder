import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthenticationContext } from '../authentication/authentication.context';
import { Restaurant } from '../../features/restaurants/components/RestaurantsInfoCard';

interface CartCtx {
  cart: object[] | null;
  restaurant: Restaurant | null;
  // eslint-disable-next-line no-unused-vars
  addToCart: (item: object, rst: Restaurant) => void;
  clearCart: () => void;
}

export const CartContext = React.createContext<CartCtx>({
  cart: null,
  restaurant: null,
  addToCart: () => null,
  clearCart: () => null,
});

export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = React.useContext(AuthenticationContext);
  const [cart, setCart] = React.useState<object[]>([]);
  const [restaurant, setRestaurant] = React.useState<Restaurant | null>(null);

  const addToCart = (item: object, rst: Restaurant) => {
    if (!restaurant || restaurant.placeId !== rst.placeId) {
      setRestaurant(rst);
      setCart([item]);
    }
    setCart([...cart, item]);
  };

  const clearCart = () => {
    setCart([]);
    setRestaurant(null);
  };

  const values = React.useMemo(
    () => ({
      cart,
      restaurant,
      addToCart,
      clearCart,
    }),
    [cart, restaurant, addToCart, clearCart],
  );

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
}
