import createStripe from 'stripe-client';

const stripe = createStripe(
  'pk_test_51KLq2pFLq1qBUSBvWSy5rk6ET6R1ZVIRCLh9ytUgA3wTaght46Pmr0DWi3N0a1lf1cHd6QnMAYeWQ4Uq6DvtHJPA00hbgFjCQ8',
);

interface CardPayment {
    number: string,
    exp_month: number,
    exp_year: number,
    cvc: number,
}

export default function cardTokenRequest(card: CardPayment) {
  return stripe.createToken({ card });
}
