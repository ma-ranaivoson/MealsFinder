/* eslint-disable camelcase */
import React from 'react';
import { CreditCardInput } from 'react-native-credit-card-input';
import cardTokenRequest from '../../../services/checkout/checkout.service';

function CreditCardComponent() {
  const handleChange = async (formData) => {
    const { values, status } = formData;
    const isIncomplete = Object.values(status).includes('incomplete');
    const { number, cvc, expiry } = values;

    const card = {
      number,
      exp_month: expiry.split('/')[0],
      exp_year: expiry.split('/')[1],
      cvc,
    };

    const info = await cardTokenRequest(card);
    console.log(info);
  };

  return <CreditCardInput onChange={handleChange} autoFocus />;
}

export default CreditCardComponent;
