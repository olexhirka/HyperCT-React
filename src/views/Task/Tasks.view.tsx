import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, IconButton, InputBase, Paper, Typography } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { AddCircle, Search } from '@material-ui/icons';
import { useStore } from 'hooks';
import { ITaskModel } from 'models';
import { TasksList } from './components';
import { useStyles } from './Tasks.styles';

const Tasks: React.FC = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [filteredTasks, setFilteredTasks] = useState<ITaskModel[]>([]);
  const [search, setSearch] = useState('');
  const [canCreate, setCanCreate] = useState(true);

  const {
    dataStore: {
      taskStore: { tasks, getAllTasksForUserAsync, getTaskUsageForUser, taskUsage },
      authStore: { user },
      productStore: { products, getAllProductsAsync },
      paymentStore: { getAllCardsForUser, userHasStoredPaymentMethod },
      addressStore: { getAllAddressForUserAsync, userHasStoredShippingAddress },
    },
  } = useStore();

  useEffect(() => {
    const fetch = async () => {
      if (user) {
        if (products.length === 0) {
          getAllProductsAsync();
        }
        const fetchedTasks = await getAllTasksForUserAsync(user.id);
        await getAllCardsForUser(user.id);
        await getAllAddressForUserAsync(user.id);
        setFilteredTasks(fetchedTasks.map((task) => task.asJSON));
        await getTaskUsageForUser(user.id);
        setLoading(false);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    setCanCreate(
      userHasStoredPaymentMethod &&
        userHasStoredShippingAddress &&
        !hasUserReachedTaskLimit(taskUsage),
    );
  }, [userHasStoredPaymentMethod, userHasStoredShippingAddress, taskUsage]);

  useEffect(() => {
    if (search) {
      const productId = products
        .filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
        .map((product) => product.id);
      setFilteredTasks(tasks.filter((task) => productId.includes(task.productId)).map((task) => task.asJSON));
    } else {
      setFilteredTasks(tasks.map((task) => task.asJSON));
    }
  }, [search, tasks, products]);

  const handleSearch = (event: any) => {
    setSearch(event.target.value);
  };

  const hasUserReachedTaskLimit = (taskUsage: any): boolean => {
    return taskUsage.numberOfTasksInUse >= taskUsage.numberOfTotalAllowedTasks;
  }

  if (loading) return null;

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Grid container justify="space-between">
            <Grid container item xs={6} direction="row" justify="flex-start" alignItems="center" spacing={3}>
              <Grid>
                <Typography variant="h5" noWrap className={classes.title}>
                  Tasks
                </Typography>
              </Grid>
              <Grid item>
                <Link
                  to="/dashboard/tasks/add"
                  className={clsx(classes.linkStyle, !canCreate && classes.disableAddButton)}>
                  <Button
                    disabled={!canCreate}
                    className={classes.button}
                    startIcon={<AddCircle />}
                    variant="contained"
                    color="primary">
                    Create new
                  </Button>
                </Link>
              </Grid>
            </Grid>
            <Grid item alignItems="center" spacing={2}>
              <Typography
                variant="h6"
                noWrap
                className={clsx([
                  classes.marginRight,
                  classes.taskUsage,
                  classes.activeTasks
                ])}>
                {`Active Tasks: ${taskUsage.numberOfTasksInUse}/${taskUsage.numberOfTotalAllowedTasks}`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
            <Grid item>
              <Paper component="form" className={classes.searchRoot}>
                <IconButton className={classes.iconButton} aria-label="menu">
                  <Search />
                </IconButton>
                <InputBase
                  className={classes.input}
                  placeholder="Search"
                  inputProps={{ 'aria-label': 'search' }}
                  value={search}
                  onChange={handleSearch}
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {hasUserReachedTaskLimit(taskUsage) && <div><ErrorOutlineIcon></ErrorOutlineIcon><p className={classes.taskUsageErrorText}>Task limit has been reached</p></div>}
          {!userHasStoredPaymentMethod && <div><ErrorOutlineIcon></ErrorOutlineIcon><p className={classes.taskUsageErrorText}>A valid payment method must be added to create tasks</p></div>}
          {!userHasStoredShippingAddress && <div><ErrorOutlineIcon></ErrorOutlineIcon><p className={classes.taskUsageErrorText}>A valid shipping address must be added to create tasks</p></div>}

        </Grid>
        <TasksList tasks={filteredTasks} arePaymentMethodAndShippingAddressPresent={userHasStoredPaymentMethod && userHasStoredShippingAddress} />
      </Grid>
    </div>
  );
};

export default Tasks;
