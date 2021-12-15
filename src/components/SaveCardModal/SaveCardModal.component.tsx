import { ReactElement } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Dialog } from '@material-ui/core';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { stripePublicKey } from 'config';
import StripeCheckoutForm from './components/StripeCheckoutForm.component';
import './SaveCardModal.styles.css';

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc:
        'https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap',
    },
  ],
};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(stripePublicKey);

interface P {
  visible: boolean;
  handleCancel: () => void;
  onSuccess?: (paymentMethod: string) => Promise<void>;
  saveCardOnly?: boolean;
}

const SaveCardModal = ({ visible, handleCancel, onSuccess, saveCardOnly = false }: P): ReactElement => (
  <Dialog
    open={visible}
    onClose={handleCancel}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    PaperProps={{
      style: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        minWidth: '475px',
        height: 'auto',
        borderRadius: '6px',
      },
    }}>
    <div className={clsx('save-card-modal')}>
      <h1 className="save-card-modal__heading">Add Payment Method</h1>
      <img className="save-card-modal__cards-list" src="https://i.ibb.co/PtsQCgj/Group.png" alt="cards" />
      <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
        <StripeCheckoutForm saveCardOnly={saveCardOnly} handleCancel={handleCancel} onSuccess={onSuccess} />
      </Elements>
    </div>
  </Dialog>
);

export default observer(SaveCardModal);
