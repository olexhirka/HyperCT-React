import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { TableCell, TableRow } from '@material-ui/core';

import { IOrderConfirmation } from 'models';
import { useStore } from 'hooks';
import moment from 'moment';
import { useStyles } from '../Dashboard.styles';

interface P {
  orderConfirmation: IOrderConfirmation;
}

const OrderConfirmation: React.FC<P> = ({ orderConfirmation }) => {
  const classes = useStyles();

  const {
    dataStore: { },
  } = useStore();

  return (
    <TableRow key={orderConfirmation.id}>
      <TableCell width="40%" className={classes.tableCell}>
        <span>{orderConfirmation.productId}</span>
      </TableCell>
      <TableCell className={classes.tableCell}>${orderConfirmation.orderPrice}</TableCell>
      <TableCell className={classes.tableCell}>{orderConfirmation.quantityOrdered}</TableCell>
      <TableCell className={classes.tableCell}>
        <span className={classes.companyText}>{orderConfirmation.merchantId}</span>
      </TableCell>
      <TableCell className={clsx(classes.tableCell, classes.nowrap)}>
        <span>{moment(orderConfirmation.orderDateUtc).format('DD MMM, YY')}</span>
      </TableCell>
      <TableCell className={classes.tableCell}>{orderConfirmation.paymentMethodLast4Digits}</TableCell>
    </TableRow>
  );
};

export default observer(OrderConfirmation);
