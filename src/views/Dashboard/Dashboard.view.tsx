import { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { Grid, Typography, Divider } from '@material-ui/core';
import { TimeSand, Bell, ShoppingCart, Check } from 'icons';
import { useComponentDidMount, useStore } from 'hooks';
import { SaveCardModal } from 'components';
import { useStyles } from './Dashboard.styles';
// Custom Components
import {
  CustomDataTypeSelect,
  Card,
  PurchaseChart,
  ActiveSessionsChart,
  SubscribedChart,
  PurchasesPlatform,
} from './Components';

const purchaseInfo = {
  totalPurchases: '5,017',
  purchaseAttempted: '3,204',
  purchaseCompleted: '2,196',
};

const cardsData = [
  {
    title: 'Session Health',
    count: '15,258',
    icon: <TimeSand />,
  },
  {
    title: 'Total Subscribed ',
    count: '729',
    icon: <Bell />,
  },
  {
    title: 'Total Purchases',
    count: '5,017',
    icon: <ShoppingCart />,
  },
  {
    title: 'Purchases Completed',
    count: '2,196',
    icon: <Check />,
  },
];

const DashboardView = (): ReactElement => {
  const [visible, setVisible] = useState(false);

  const classes = useStyles();

  const {
    dataStore: {
      authStore: { priceId, productNotifiedOnce, user, createSubscripton },
    },
  } = useStore();

  const checkSubscription = () => {
    if (!priceId || productNotifiedOnce) return;
    if (user?.stripeSubscriptionId) return;

    setVisible(true);
  };

  useComponentDidMount(checkSubscription);

  return (
    <Grid className={classes.root} container alignItems="center" justify="space-between" spacing={4}>
      {/* Title + Menu Row */}
      <Grid item xs={12}>
        <Grid container alignItems="center" justify="space-between">
          {/* Title */}
          <Grid item>
            <Typography className={classes.title}>Dashboard</Typography>
          </Grid>
          {/* Menu of Data Type */}
          <Grid item>
            <CustomDataTypeSelect />
          </Grid>
        </Grid>
      </Grid>
      {/* Title + Menu Row End */}
      {/* Cards Row */}
      <Grid item xs={12}>
        <Grid container alignItems="center" justify="space-between" spacing={3}>
          {cardsData.map((data) => {
            const { icon, count, title } = data;
            return (
              <Grid key={title} item xs={12} sm={12} md={3}>
                <Card icon={icon} count={count} title={title} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      {/* Cards Row End */}
      {/* Chart + Meter Row */}
      <Grid item xs={12}>
        <Grid container alignItems="flex-start" justify="space-between" spacing={8}>
          {/* Chart Column  */}
          <Grid item xs={12} sm={12} md={8}>
            <Typography className={classes.title}>Session Health</Typography>
            {/* Chart Data Display Box Row */}
            <Grid
              container
              alignItems="center"
              justify="space-between"
              className={classes.chartDataWrapper}
              spacing={6}>
              <Grid item>
                <Typography className={classes.chartDataCount}>{purchaseInfo.totalPurchases}</Typography>
                <Typography className={classes.chartDataTitle}>Total Purchases</Typography>
              </Grid>
              <Divider orientation="vertical" style={{ height: 40 }} />
              <Grid item>
                <Typography className={clsx(classes.chartDataCount, classes.blueText)}>
                  {purchaseInfo.purchaseAttempted}
                </Typography>
                <Typography className={classes.chartDataTitle}>Purchases Attempted</Typography>
              </Grid>
              <Grid item>
                <Typography className={clsx(classes.chartDataCount, classes.cyanText)}>
                  {purchaseInfo.purchaseCompleted}
                </Typography>
                <Typography className={classes.chartDataTitle}>Purchases Completed</Typography>
              </Grid>
            </Grid>
            {/* Chart */}
            <div className={classes.chartWrapper}>
              <Grid container>
                <Grid item xs={12}>
                  <PurchaseChart />
                </Grid>
              </Grid>
            </div>
          </Grid>
          {/* Meter Column */}
          <Grid item xs={12} sm={12} md={4}>
            <Typography className={classes.title}>Purchases</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      {/* Other Charts Row */}
      <Grid item xs={12}>
        <Grid container alignItems="flex-start" justify="space-between" spacing={5}>
          <Grid item xs={12} sm={12} md={4}>
            <Typography className={classes.title}>Active Sessions</Typography>
            <div className={classes.bottomChartWrapper}>
              <ActiveSessionsChart />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography className={classes.title}>Subscribed</Typography>
            <div className={classes.bottomChartWrapper}>
              <SubscribedChart />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <Typography className={classes.title}>Purchases platform</Typography>
              </Grid>
              <Grid item>
                <Link className={classes.link} to="/">
                  View all
                </Link>
              </Grid>
            </Grid>
            <div className={classes.purchasesPlatform}>
              <PurchasesPlatform />
            </div>
          </Grid>
        </Grid>
      </Grid>

      <SaveCardModal visible={visible} handleCancel={() => setVisible(false)} onSuccess={createSubscripton} />
    </Grid>
  );
};

export default observer(DashboardView);
