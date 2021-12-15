import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import { useStore } from 'hooks';
import { observer } from 'mobx-react-lite';
import { ITaskModel } from 'models';
import { useStyles } from '../../Tasks.styles';
import Task from '../Task/Task.component';
import clsx from 'clsx';

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
  handleStart: () => void;
  cvv: string;
  handleChange: (e: any) => void;
  modalType: string;
}

const ModalConfirmation = ({
  open,
  handleClose,
  handleStart,
  cvv,
  handleChange,
  modalType,
  handleDelete,
}: ModalProps) => {
  const classes = useStyles();

  if (modalType === 'startTask') {
    return (
      <Grid>
        <Dialog open={open} onClose={handleClose} className={classes.tableCell}>
          <DialogTitle>{'Start Task'}</DialogTitle>
          <DialogContent>
            <DialogContentText>Please enter the CVV for your primary payment method</DialogContentText>
            <TextField autoFocus margin="dense" id="cvv" label="CVV" fullWidth value={cvv} onChange={handleChange} />
          </DialogContent>
          <DialogActions>
            <Button className={classes.modalButton} autoFocus onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button className={classes.modalButton} onClick={handleStart} color="primary" autoFocus>
              Start
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );
  } else {
    return (
      <Grid>
        <Dialog open={open} onClose={handleClose} className={classes.tableCell}>
          <DialogTitle>{'Delete Task'}</DialogTitle>
          <DialogContent>
            <DialogContentText>Are You Sure You Want to Delete the Task?</DialogContentText>
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
  }
};
interface TasksListProps {
  tasks: ITaskModel[];
  arePaymentMethodAndShippingAddressPresent: boolean;
}

const TasksList: React.FC<TasksListProps> = ({ tasks, arePaymentMethodAndShippingAddressPresent }) => {
  const classes = useStyles();
  const [selectedProduct, SetSelectedProduct] = useState('');
  const [cvv, SetCvv] = useState('');
  const [modalType, SetModalType] = useState('');

  const columns = ['PRODUCT', 'MERCHANT', 'QUANTITY', 'ACTION'];

  const {
    dataStore: {
      taskStore: { removeByIDAsync, startTask },
    },
  } = useStore();

  const handleClickOpen = (taskId: string, modalType: string) => {
    SetModalType(modalType);
    SetSelectedProduct(taskId);
  };

  const handleClose = () => {
    SetSelectedProduct('');
  };

  const handleDelete = () => {
    removeByIDAsync(selectedProduct);
    SetSelectedProduct('');
  };

  const handleStart = () => {
    startTask(selectedProduct, cvv);
    SetSelectedProduct('');
    SetCvv('');
  };

  const handleChange = (e: any) => {
    SetCvv(e.target.value);
  };

  return (
    <Grid item xs={12}>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                return (
                  <TableCell
                    key={column}
                    className={clsx([classes.tableCell])}>
                    <b>{column}</b>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <Task
                arePaymentMethodAndShippingAddressPresent={arePaymentMethodAndShippingAddressPresent}
                key={task.id}
                task={task}
                handleClickOpen={handleClickOpen}
                setModalType={SetModalType}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalConfirmation
        cvv={cvv}
        handleChange={handleChange}
        handleStart={handleStart}
        open={!!selectedProduct}
        handleClose={handleClose}
        handleDelete={handleDelete}
        modalType={modalType}
      />
    </Grid>
  );
};

export default observer(TasksList);
