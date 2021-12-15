import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { Grid, IconButton, TableCell, TableRow, Link as OuterLink } from '@material-ui/core';
import LanguageIcon from '@material-ui/icons/Language';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { productAvailabilityEnum, UIProduct } from 'models';
import { useStore } from 'hooks';
import { useStyles } from '../../ProductTracker.styles';
import moment from 'moment';
import { findEnumKeyByValue } from 'helpers';

interface P {
  product: UIProduct;
  showAction: boolean;
}

const ProductComponent: React.FC<P> = ({ product, showAction }) => {
  const classes = useStyles();

  const {
    dataStore: {
      productStore: { removeProductAsync },
    },
  } = useStore();

  return (
    <TableRow key={product.id}>
      <TableCell width="40%" className={classes.tableCell}>
        <OuterLink href={product.url} target="_blank" referrerPolicy="no-referrer" className={classes.productName}>
          {product.name}
        </OuterLink>
      </TableCell>
      <TableCell className={classes.tableCell}>
        <span className={classes.companyText}>{product.merchantName}</span>
      </TableCell>
      <TableCell className={clsx(classes.tableCell, classes.nowrap)}>
        <span className={classes.lastCheckedContainer}>{moment(product.lastCheckedUtc).format('DD MMM, YY')}</span>
      </TableCell>
      <TableCell className={classes.tableCell}>{`$${product.price || 0}`}</TableCell>
      <TableCell className={clsx(classes.tableCell, classes.nowrap)}>
        <span
          className={clsx({
            [classes.outOfStockText]: product.availability === productAvailabilityEnum['Out-of-stock'],
            [classes.inStockText]: product.availability === productAvailabilityEnum['In-stock'],
            [classes.unknownText]: product.availability === productAvailabilityEnum.Unknown,
          })}>
          {findEnumKeyByValue(productAvailabilityEnum, product.availability)}
        </span>
      </TableCell>
      {showAction && (
        <TableCell align="center" className={classes.tableCell}>
          <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
            <Grid item>
              <OuterLink href={product.url} target="_blank" referrerPolicy="no-referrer" className={classes.linkStyle}>
                <IconButton className={classes.tableIconButton} aria-label="menu">
                  <LanguageIcon />
                </IconButton>
              </OuterLink>
            </Grid>
            <Grid item>
              <Link to={`/dashboard/product-tracker/edit/${product.id}`} className={classes.linkStyle}>
                <IconButton className={classes.tableIconButton} aria-label="menu">
                  <EditIcon />
                </IconButton>
              </Link>
            </Grid>
            <Grid item>
              <IconButton
                onClick={() => removeProductAsync(product.id)}
                className={classes.tableIconButton}
                aria-label="menu">
                <DeleteOutlineIcon />
              </IconButton>
            </Grid>
          </Grid>
        </TableCell>
      )}
    </TableRow>
  );
};

export default observer(ProductComponent);
