import { ReactElement, ReactNode, useState } from 'react';
import { AppBar, Grid, Tab, Tabs, Typography, useTheme, withStyles } from '@material-ui/core';
import clsx from 'clsx';
import { useStyles } from './AccountSettings.styles';
import { Subscription, PaymentMethods, ShippingInformation } from './Components';

// Custom Tab
const CustomTabs = withStyles(
  {
    indicator: {
      backgroundColor: '#00b0a7',
    },
  },
  { index: 1 },
)(Tabs);

interface TabPanelProps {
  children?: ReactNode;
  dir?: string;
  index: number;
  value: number;
}

const TabPanel = ({ children, value, index, dir }: TabPanelProps) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`full-width-tabpanel-${index}`}
    aria-labelledby={`full-width-tab-${index}`}
    dir={dir}>
    {value === index && <>{children}</>}
  </div>
);

const tabs = ['Shipping Address', 'Payment Method', 'Subscription'];

const getTabIndex = (queryString: string) => {
  const tab = parseInt(queryString, 10) || 0;
  if (tab > 0 && tab <= 3) return tab;

  return 0;
};

const AccountSettings = (): ReactElement => {
  const tabIndex = getTabIndex(new URLSearchParams(window.location.search).get('tab') || '0');

  const [value, setValue] = useState(tabIndex);

  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Typography variant="h1" className={clsx(classes.titleText, classes.whiteText)}>
          Account Management
        </Typography>
      </Grid>

      <Grid item xs={12} md={12} lg={8} xl={8}>
        <AppBar position="static" color="default" className={clsx(classes.tabBar)}>
          <CustomTabs
            value={value}
            onChange={(_, i) => setValue(i)}
            variant="fullWidth"
            aria-label="full width tabs example">
            {tabs.map((text, i) => (
              <Tab
                label={<Typography className={clsx(classes.whiteText)}>{text}</Typography>}
                key={text}
                id={`full-width-tab-${i}`}
                aria-controls={`full-width-tabpanel-${i}`}
              />
            ))}
          </CustomTabs>
        </AppBar>

        <TabPanel value={value} index={0} dir={theme.direction}>
          <ShippingInformation />
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction}>
          <PaymentMethods />
        </TabPanel>

        <TabPanel value={value} index={2} dir={theme.direction}>
          <Subscription />
        </TabPanel>
      </Grid>
    </Grid>
  );
};

export default AccountSettings;
