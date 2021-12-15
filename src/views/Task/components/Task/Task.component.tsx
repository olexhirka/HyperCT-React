import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Link as OuterLink, Grid, IconButton, TableCell, TableRow } from '@material-ui/core';
import { Language, DeleteOutline, Edit, PlayCircleOutlineOutlined, StopRounded } from '@material-ui/icons';
import clsx from 'clsx';
import { useStore } from 'hooks';
import { observer } from 'mobx-react-lite';
import { ITaskModel, MerchantModel, ProductModel } from 'models';
import { useStyles } from '../../Tasks.styles';

interface TaskProps {
  task: ITaskModel;
  handleClickOpen: (taskId: string, modalType: string) => void;
  arePaymentMethodAndShippingAddressPresent: boolean;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
}

const Task: React.FC<TaskProps> = ({
  task,
  handleClickOpen,
  arePaymentMethodAndShippingAddressPresent,
  setModalType,
}) => {
  const classes = useStyles();

  const {
    dataStore: {
      productStore: { products },
      merchantStore: { merchants },
      taskStore: { updateRunning, stopTask },
    },
  } = useStore();

  const [merchant, setMerchant] = useState<MerchantModel>();
  const [product, setProduct] = useState<ProductModel>();

  useEffect(() => {
    const productObj = products.find((product) => product.id === task.productId);
    if (productObj) {
      setProduct(productObj);
      const merchantObj = merchants.find((merchant) => merchant.id === productObj.merchantId);
      if (merchantObj) {
        setMerchant(merchantObj);
      }
    }
  }, []);

  const updateRunningCondition = async (isRunning: boolean) => {
    await updateRunning(isRunning, task.id);
  };

  return (
    <>
      <TableRow>
        <TableCell width="40%" className={clsx([classes.linkStyle, classes.tableCell])}>
          <OuterLink href={product?.url} target="_blank" referrerPolicy="no-referrer" className={classes.productName}>
            {product?.name}
          </OuterLink>
        </TableCell>
        <TableCell className={classes.tableCell}>{merchant?.name}</TableCell>
        <TableCell className={classes.tableCell}>{task.targetQuantity}</TableCell>
        <TableCell className={clsx([classes.tableCell, classes.shiftActionItems])}>
          <Grid container alignItems="center" spacing={1} >
            <Grid item>
              <IconButton className={classes.tableIconButton} aria-label="menu">
                {!task.isRunning ? (
                  <IconButton
                    disabled={!arePaymentMethodAndShippingAddressPresent}
                    onClick={() => handleClickOpen(task.id, 'startTask')}
                    className={classes.tableIconButton}
                    aria-label="menu">
                    <PlayCircleOutlineOutlined />
                  </IconButton>
                ) : (
                  <IconButton
                    disabled={!arePaymentMethodAndShippingAddressPresent}
                    onClick={() => stopTask(task.id)}
                    className={classes.tableIconButton}
                    aria-label="menu">
                    <StopRounded />
                  </IconButton>
                )}
              </IconButton>
            </Grid>
            <Grid item>
              <Link to={`/dashboard/tasks/edit/${task.id}`} className={classes.linkStyle}>
                <IconButton className={classes.tableIconButton} aria-label="menu">
                  <Edit />
                </IconButton>
              </Link>
            </Grid>
            <Grid item>
              <IconButton
                onClick={() => handleClickOpen(task.id, 'delete')}
                className={classes.tableIconButton}
                aria-label="menu">
                <DeleteOutline />
              </IconButton>
            </Grid>
          </Grid>
        </TableCell>
      </TableRow>
    </>
  );
};

export default observer(Task);
