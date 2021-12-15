import { ReactElement } from 'react';
import { Grid, Button, Paper, IconButton, InputBase } from '@material-ui/core';
import { Search, FilterList } from '@material-ui/icons';
import { merchantSearchStyles } from './MerchantSearch.styles';

const MerchantSearch = (): ReactElement => {
  const classes = merchantSearchStyles();

  return (
    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
      <Grid item>
        <Paper component="form" className={classes.searchRoot}>
          <IconButton className={classes.iconButton} aria-label="menu">
            <Search />
          </IconButton>
          <InputBase className={classes.input} placeholder="Search" inputProps={{ 'aria-label': 'search' }} />
        </Paper>
      </Grid>
      <Grid item>
        <Button
          className={classes.filterButton}
          startIcon={<FilterList className={classes.filterButtonIcon} />}
          variant="contained"
          color="primary">
          Filters
        </Button>
      </Grid>
    </Grid>
  );
};

export default MerchantSearch;
