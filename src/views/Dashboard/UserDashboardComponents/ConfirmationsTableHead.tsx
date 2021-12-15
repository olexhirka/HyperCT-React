import { TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import { IOrderConfirmation } from 'models';
import { useStyles } from '../Dashboard.styles';
import { Order } from './OrderConfirmationList';

interface HeadCell {
  disablePadding: boolean;
  id: keyof IOrderConfirmation;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'productId', numeric: false, disablePadding: true, label: 'PRODUCT NAME' },
  { id: 'orderPrice', numeric: true, disablePadding: false, label: 'ORDER PRICE' },
  { id: 'quantityOrdered', numeric: true, disablePadding: false, label: 'QUANTITY' },
  { id: 'merchantId', numeric: true, disablePadding: false, label: 'MERCHANT' },
  { id: 'orderDateUtc', numeric: true, disablePadding: false, label: 'DATE ORDERED' },
  { id: 'paymentMethodLast4Digits', numeric: true, disablePadding: false, label: 'CARD ENDING IN' },
];

interface ConfirmationsTableHeadProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IOrderConfirmation) => void;
  order: Order;
  orderBy: string;
}

const ConfirmationsTableHead: React.FC<ConfirmationsTableHeadProps> = ({ onRequestSort, order, orderBy }) => {
  const classes = useStyles();
  const createSortHandler = (property: keyof IOrderConfirmation) => (event: any) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => {
          return (
            <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : undefined}>
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}>
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default ConfirmationsTableHead;
