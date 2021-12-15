import { ReactElement, ReactNode } from 'react';
import { StripeError } from '@stripe/stripe-js';

interface SubmitButtonProps {
  processing: boolean;
  disabled: boolean;
  error: StripeError | null;
  children: ReactNode;
}

export const StripeSubmitButton = ({
  processing, error, children, disabled,
}: SubmitButtonProps): ReactElement => (
  <button
    className={`SubmitButton ${error ? 'SubmitButton--error' : ''}`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? 'Processing...' : children}
  </button>
);
