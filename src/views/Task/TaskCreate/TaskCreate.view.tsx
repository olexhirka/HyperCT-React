import { ReactElement } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { KeyboardBackspace } from '@material-ui/icons';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { TaskAddForm } from '../components';
import { useStyles } from './TaskCreate.styles';

const TaskCreate = (): ReactElement => {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={2} className={classes.root}>
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
                Create Task
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={8} lg={6}>
          <TaskAddForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default observer(TaskCreate);
