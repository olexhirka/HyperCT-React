import { FormEvent, ReactElement, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { StripeError } from '@stripe/stripe-js';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useStore } from 'hooks';
import { StripeCardField } from './StripeCardField.component';
import { StripeSubmitButton } from './StripeSubmitButton.component';
import { StripeErrorMessage } from './StripeErrorMessage.component';

interface P {
  saveCardOnly: boolean;
  handleCancel: () => void;
  onSuccess?: (paymentMethod: string) => Promise<void>;
}

const StripeCheckoutForm = ({ saveCardOnly, onSuccess }: P): ReactElement => {
  const [isDefault, setIsDefault] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState<StripeError | null>(null);
  const [cardComplete, setCardComplete] = useState(false);

  const {
    dataStore: {
      paymentStore: { loading, addNewCardAndRegister },
    },
  } = useStore();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Stripe.js has not loaded yet. Make sure to disable
    // form submission until Stripe.js has loaded.
    if (!stripe || !elements) return;

    if (error) {
      elements?.getElement('card')?.focus();
      return;
    }

    if (!cardComplete) return;

    const card = elements.getElement(CardElement);

    if (!card) return;

    if (onSuccess) {
      await addNewCardAndRegister({ card, stripe, isDefault }, onSuccess);
    }
  };

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <fieldset className="FormGroup">
        <StripeCardField
          onChange={(e) => {
            const err = e.error as StripeError;
            setError(err);
            setCardComplete(e.complete);
          }}
        />
      </fieldset>

      {saveCardOnly && (
        <FormControlLabel
          control={<Checkbox checked={isDefault} onChange={(_, status) => setIsDefault(status)} color="secondary" />}
          label="Make Default Card"
        />
      )}

      {error && <StripeErrorMessage>{error.message}</StripeErrorMessage>}

      <StripeSubmitButton processing={loading} error={error} disabled={!stripe}>
        Submit
      </StripeSubmitButton>
    </form>
  );
};

export default observer(StripeCheckoutForm);
