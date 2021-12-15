import { ReactElement } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Typography, Grid, Button } from '@material-ui/core';
import { KeyboardBackspace } from '@material-ui/icons';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';
import { useComponentDidMount, useComponentDidUnmount, useStore } from 'hooks';
import { TaskEditForm } from '../components';
import { useStyles } from './TaskEdit.styles';

const TaskEdit = (): ReactElement => {
  const classes = useStyles();

  const { id } = useParams<{ id: string }>();

  const {
    dataStore: { taskStore },
  } = useStore();

  const { getByIDAsync, removeSelected, selectedTask } = taskStore;

  useComponentDidMount(() => getByIDAsync(id));

  useComponentDidUnmount(removeSelected);

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Link to="/dashboard/tasks" className={classes.linkStyle}>
            <Button
              className={classes.backButton}
              startIcon={<KeyboardBackspace />}
              variant="contained"
              color="primary">
              Tasks
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={4}>
            <Grid item>
              <Typography variant="h5" className={clsx(classes.whiteText, classes.maxWidth530)}>
                Edit Task
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={8} lg={6}>
          {selectedTask && <TaskEditForm task={selectedTask.asJSON} />}
        </Grid>
      </Grid>
    </div>
  );
};

export default observer(TaskEdit);
