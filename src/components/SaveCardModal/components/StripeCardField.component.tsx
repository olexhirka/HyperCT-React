import { StripeCardElementOptions, StripeCardElementChangeEvent } from '@stripe/stripe-js';
import { CardElement } from '@stripe/react-stripe-js';
import { ReactElement } from 'react';

const CARD_OPTIONS: StripeCardElementOptions = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#87BBFD',
      color: '#fff',
      fontWeight: '500',
      fontFamily: 'DM Sans, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883',
      },
      '::placeholder': {
        color: '#87BBFD',
      },
    },
    invalid: {
      iconColor: '#FFC7EE',
      color: '#FFC7EE',
    },
  },
};

interface CardFieldProps {
  onChange: (e: StripeCardElementChangeEvent) => void;
}

export const StripeCardField = ({ onChange }: CardFieldProps): ReactElement => (
  <div className="FormRow">
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
);
