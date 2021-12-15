import { TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import { UIProduct } from 'models';
import { useStyles } from '../../ProductTracker.styles';
import { Order } from './EnhancedProductsList';

interface HeadCell {
  disablePadding: boolean;
  id: keyof UIProduct;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'name', numeric: false, disablePadding: true, label: 'PRODUCT NAME' },
  { id: 'merchantName', numeric: true, disablePadding: false, label: 'MERCHANT' },
  { id: 'lastCheckedUtc', numeric: true, disablePadding: false, label: 'LAST CHECKED' },
  { id: 'price', numeric: true, disablePadding: false, label: 'PRICE' },
  { id: 'availability', numeric: true, disablePadding: false, label: 'STATUS' },
  { id: 'id', numeric: true, disablePadding: false, label: 'ACTION' },
];

interface EnhancedTableHeadProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof UIProduct) => void;
  order: Order;
  orderBy: string;
  showAction: boolean;
}

const EnhancedTableHead: React.FC<EnhancedTableHeadProps> = ({ onRequestSort, order, orderBy, showAction }) => {
  const classes = useStyles();
  const createSortHandler = (property: keyof UIProduct) => (event: any) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => {
          if (headCell.id === 'id') {
            return (
              showAction && (
                <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : undefined}>
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}>
                    {headCell.label}
                  </TableSortLabel>
                </TableCell>
              )
            );
          } else {
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
          }
        })}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
