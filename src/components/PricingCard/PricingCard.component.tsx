import { ReactElement } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import {
  Divider,
  Grid,
  Typography,
  Button,
  // List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
// import CheckIcon from '@material-ui/icons/Check';
import { IStripeSubscriptionType } from 'types';
import { useStyles } from './PricingCard.styles';

interface P {
  subscription: IStripeSubscriptionType;
}

const PricingCard = ({ subscription }: P): ReactElement => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root)}>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={12}>
          <Grid container alignItems="flex-start" spacing={2}>
            {/* <Grid item>
              <img src={image} alt="pricing-card-avatar" className={classes.img} />
            </Grid> */}
            <Grid item>
              <Typography variant="h4" style={{ fontWeight: 'bold', lineHeight: 0.8 }}>
                {subscription.name}
              </Typography>
              <Typography style={{ marginTop: 8 }} variant="h6">
                {subscription.amount}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider style={{ marginTop: 16 }} />
        </Grid>
        {/* <Grid item xs={12}>
          <List className={classes.customList}>
            {features.map((feature) => (
              <ListItem>
                <ListItemIcon>
                  <CheckIcon />
                </ListItemIcon>
                <ListItemText
primary={<Typography variant="body1" className={classes.feature}>{feature}</Typography>}
                />
              </ListItem>
            ))}
          </List>
        </Grid> */}
        <Grid item xs={12}>
          <Link to={`/register/${subscription.productId}`}>
            <Button className={classes.button} variant="contained" color="primary">
              <Typography variant="h6">Select</Typography>
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default PricingCard;
