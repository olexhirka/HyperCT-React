import { observer } from 'mobx-react-lite';
import { Table, TableBody, TableContainer, TablePagination } from '@material-ui/core';
import ProductComponent from './Product.component';
import { useStyles } from '../../ProductTracker.styles';
import { UIProduct } from 'models';
import { useState } from 'react';
import EnhancedTableHead from './EnhancedTableHead';

export type Order = 'asc' | 'desc';

function descendingComparator(a: { [x: string]: number }, b: { [x: string]: number }, orderBy: string | number) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order: string, orderBy: string) {
  return order === 'desc'
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

function stableSort(array: any[], comparator: { (a: any, b: any): number; (arg0: any, arg1: any): any }) {
  const stabilizedThis = array.map((el: any, index: any) => [el, index]);
  stabilizedThis.sort((a: number[], b: number[]) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el: any[]) => el[0]);
}

interface EnhancedProductsListProps {
  products: UIProduct[];
  showAction: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const EnhancedProductsListComponent: React.FC<EnhancedProductsListProps> = ({
  products,
  showAction,
  page,
  setPage,
}) => {
  const classes = useStyles();
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof UIProduct>('name');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof UIProduct) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <EnhancedTableHead
            onRequestSort={handleRequestSort}
            order={order}
            orderBy={orderBy}
            showAction={showAction}
          />
          <TableBody>
            {stableSort(products, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product: UIProduct) => (
                <ProductComponent key={product.id} product={product} showAction={showAction} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

export default observer(EnhancedProductsListComponent);
