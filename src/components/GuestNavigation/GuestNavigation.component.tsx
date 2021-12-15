import { ReactElement, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
// Material-UI Styles
import { useTheme } from '@material-ui/core/styles';
// Material-UI Components
import { Drawer, List, CssBaseline, IconButton, ListItem, ListItemIcon, ListItemText, Grid } from '@material-ui/core';
// Material-UI Icons
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// Custom icons
import {
  // Merchants, Tasks, ProductTracker, Settings,
  Dashboard,
} from 'icons';
// Styles
import { navigationStyles } from './GuestNavigation.styles';

export const GuestNavigation = (): ReactElement => {
  const theme = useTheme();
  const classes = navigationStyles();
  const [open, setOpen] = useState(true);

  const { pathname } = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function getTabIcon(tab: string): ReactElement {
    switch (tab) {
      case 'login':
        return <Dashboard />;
      default:
        return <></>;
    }
  }

  return (
    <>
      <CssBaseline />
      <Drawer
        elevation={3}
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}>
        <Grid container alignItems="center" justify="center">
          <Grid item>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}>
              <MenuIcon />
            </IconButton>
          </Grid>
        </Grid>
        <div className={clsx({ [classes.toolbar]: true, [classes.hide]: !open })}>
          <Grid container justify="space-between" alignItems="center" className={classes.menuGrid}>
            <Grid item>
              <img
                src="https://lun-us.icons8.com/a/wULTwLSi80uf44fZ4Uiolw/mQtoXqHwHkGwKP3YIUY04Q/HyperCart.png"
                alt="logo"
                className={clsx({ [classes.hide]: !open })}
              />
            </Grid>
            <Grid item>
              <IconButton
                onClick={handleDrawerClose}
                className={clsx({ [classes.hide]: !open, [classes.chevronIconButton]: true })}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </Grid>
          </Grid>
        </div>
        <List>
          {['Login'].map((name) => {
            const text = name.replace(/\s+/g, '-').toLowerCase();

            let selected = false;
            switch (text) {
              case 'login':
                selected = pathname === '/login';
                break;
              default:
                selected = pathname === `/dashboard/${text}`;
            }

            return (
              <ListItem
                className={classes.focusVisible}
                focusVisibleClassName={classes.focusVisible}
                button
                key={text}
                component={Link}
                selected={selected}
                to={`/${text}`}>
                <ListItemIcon className={classes.icon}>{getTabIcon(text)}</ListItemIcon>
                <ListItemText color="blue" primary={name} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
};
