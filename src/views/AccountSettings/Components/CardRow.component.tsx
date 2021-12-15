import { ReactElement, useEffect, useState } from 'react';
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from '@material-ui/core';
import { ICardType } from 'types';
import { useStore } from 'hooks';
import { useStyles } from '../AccountSettings.styles';
import clsx from 'clsx';
import { createPaymentMethodText } from 'helpers';

interface P {
  card: ICardType;
}

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}

const DeleteConfirmation = ({ open, handleClose, handleDelete }: ModalProps) => {
  const classes = useStyles();
  return (
    <Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{'Delete Card'}</DialogTitle>
        <DialogContent>
          <DialogContentText>Are You Sure You Want to Delete the Card?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className={classes.modalButton} autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button className={classes.modalButton} onClick={handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export const CardRow = ({ card }: P): ReactElement => {
  const [open, setOpen] = useState(false);
  const [cardText, setCardText] = useState('');
  const { paddingTop25, paddingLeft30, paddingRight30, paddingBottom15, badgeIcon } =
    useStyles();

  useEffect(() => {
    setCardText(createPaymentMethodText(card));
  });

  const {
    dataStore: {
      paymentStore: { deleteCardByID },
    },
  } = useStore();

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteCardByID(card.id!);
  };

  return (
    <Grid
      container
      alignItems="center"
      justify="flex-start"
      className={clsx(paddingTop25, paddingLeft30, paddingRight30, paddingBottom15)}>
      <Grid item xs={6}>
        {cardText}
      </Grid>
      <Grid item xs={3}>
        {card.isPrimary && <Chip className={badgeIcon} color="primary" label="Primary Card" />}
      </Grid>
      <DeleteConfirmation open={open} handleClose={handleModalClose} handleDelete={handleDelete} />
    </Grid>
  );
};
