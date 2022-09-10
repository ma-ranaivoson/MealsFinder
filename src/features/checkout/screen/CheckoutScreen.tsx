import React from 'react';
import SafeArea from '../../../components/utility/SafeArea';
import { CartContext } from '../../../services/cart/CartContext';
import CreditCardComponent from '../components/CreditCardComponent';

function CheckoutScreen() {
  const { cart } = React.useContext(CartContext);

  return (
    <SafeArea>
      <CreditCardComponent />
    </SafeArea>
  );
}

export default CheckoutScreen;
