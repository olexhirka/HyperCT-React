import { ReactElement } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Typography, Grid, Button } from '@material-ui/core';
import { KeyboardBackspace } from '@material-ui/icons';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { useComponentDidMount, useStore } from 'hooks';
import { useStyles } from './MerchantEdit.styles';
import { MerchantEditForm } from '../Components';

const MerchantEdit = (): ReactElement => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();

  const {
    dataStore: {
      merchantStore: { selectedMerchant, getByID },
    },
  } = useStore();

  useComponentDidMount(() => getByID(id));

  return (
    <div>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12}>
          <Link to="/dashboard/merchants" className={classes.linkStyle}>
            <Button
              className={classes.backButton}
              startIcon={<KeyboardBackspace />}
              variant="contained"
              color="primary">
              Merchants
            </Button>
          </Link>
        </Grid>

        <Grid item xs={12}>
          <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={4}>
            <Grid item>
              <Typography variant="h5" className={clsx(classes.whiteText, classes.maxWidth530)}>
                {selectedMerchant?.name}
                /Edit
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={5}>
          {selectedMerchant && <MerchantEditForm merchant={selectedMerchant.asJSON} />}
        </Grid>
      </Grid>
    </div>
  );
};

export default observer(MerchantEdit);
