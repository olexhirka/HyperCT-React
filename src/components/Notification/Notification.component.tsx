import { Snackbar } from '@material-ui/core';
import { ReactElement } from 'react';
import { Alert } from '@material-ui/lab';
import { NotificationModel } from 'models';

interface P {
  notification: NotificationModel;
}

export const NotificationComponent = ({
  notification: {
    open, remove, horizontal, vertical, type, message,
  },
}: P): ReactElement => (
  <Snackbar
    open={open}
    autoHideDuration={6000}
    onClose={remove}
    anchorOrigin={{ vertical, horizontal }}
  >
    <Alert onClose={remove} severity={type}>
      {message}
    </Alert>
  </Snackbar>
);
