import { ReactElement, useState, MouseEvent, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import clsx from 'clsx';
// Material-UI Styles
import { useTheme } from '@material-ui/core/styles';
// Material-UI Components
import {
  Drawer,
  List,
  CssBaseline,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Typography,
  ButtonBase,
  Menu,
  MenuItem,
} from '@material-ui/core';
// Material-UI Icons
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { observer } from 'mobx-react-lite';
// Custom icons
import { Merchants, Tasks, ProductTracker, Settings, Dashboard } from 'icons';
import { useStore } from 'hooks';
// Styles
import { navigationStyles } from './Navigation.styles';
import { UserModel } from 'models';

const NavigationItems = ['Dashboard', 'Merchants', 'Tasks', 'Product Tracker', 'Settings'];

const Navigation = (): ReactElement => {
  const theme = useTheme();
  const classes = navigationStyles();
  const [open, setOpen] = useState(true);
  const [navItems, setNavItems] = useState(NavigationItems);

  const {
    dataStore: {
      authStore: { logoutApi, user },
    },
  } = useStore();

  const { pathname } = useLocation();
  const history = useHistory();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // User Menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    logoutApi().finally(() => history.push('/'));
  };

  const dashboardDoesNotExistInNavItems = (navItems: string[]): boolean => navItems.indexOf('Dashboard') === -1;

  const userExistsAndIsAnAdmin = (user: UserModel | null): boolean => !!user && user.role === 1;

  /**
   * hook to detect if use has admin role
   * role === 1 is admin role
   * add `Dashboard` menu item at first position if admin role
   */
  useEffect(() => {
    if (userExistsAndIsAnAdmin(user) && dashboardDoesNotExistInNavItems(navItems)) {
      setNavItems(['Dashboard', ...navItems]);
    }
  }, [user && user.role]);

  function getTabIcon(tab: string): ReactElement {
    switch (tab) {
      case 'dashboard':
        return <Dashboard />;
      case 'merchants':
        return <Merchants />;
      case 'tasks':
        return <Tasks />;
      case 'product-tracker':
        return <ProductTracker />;
      case 'settings':
        return <Settings />;
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
            <Grid item className={classes.logoContainer}>
              <img src="/logo.svg" alt="logo" className={clsx({ [classes.hide]: !open }, classes.logo)} />
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

        <div className={clsx(classes.userInfoContainer, classes.toolbar)}>
          <ButtonBase className={classes.userInfoButtonWrapper} onClick={handleClick}>
            <Grid container justify="space-between" alignItems="center" className={classes.userInfoButton}>
              <Grid item>
                <Grid container alignItems="flex-start" spacing={1}>
                  <Grid item className={clsx({ [classes.hide]: !open })}>
                    <Typography className={clsx({ [classes.name]: true })}>{user?.displayName}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={clsx({ [classes.hide]: !open })}>
                <img
                  src="https://lun-us.icons8.com/a/wULTwLSi80uf44fZ4Uiolw/7WXn4R-Jtkmzq3N-abW7xQ/arrow-down-sign-to-navigate.png"
                  alt=""
                />
              </Grid>
            </Grid>
          </ButtonBase>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PopoverClasses={{
              paper: classes.menu,
            }}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <MenuItem className={classes.linkStyle} onClick={handleClose} component={Link} to="/dashboard/settings">
              Settings
            </MenuItem>
            <MenuItem className={classes.linkStyle} onClick={handleLogout}>
              Logout
            </MenuItem>
          </Menu>
        </div>
        <List>
          {navItems.map((name) => {
            const text = name.replace(/\s+/g, '-').toLowerCase();

            let selected = false;
            switch (text) {
              case 'dashboard':
                selected = pathname === '/dashboard';
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
                to={text === 'dashboard' ? '/dashboard' : `/dashboard/${text}`}>
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

export default observer(Navigation);
