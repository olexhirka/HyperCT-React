import { ReactElement, Suspense, useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
// Custom Components
import { Navigation } from 'components';
// Views
import { dashboardViews } from 'views';
import { useStyles } from './DashboardLayout.styles';
import { useStore } from 'hooks';
import AuthRoute from 'components/AuthRoute/AuthRoute';

export const DashboardLayout = (): ReactElement => {
  const classes = useStyles();
  const router = useHistory();
  const [showNavigation, setShowNavigation] = useState(true);

  const {
    dataStore: {
      authStore: { user },
    },
  } = useStore();

  useEffect(() => {
    if (router.location.pathname === '/terms' || router.location.pathname === '/privacy-policy') {
      setShowNavigation(false);
    }
  });

  return (
    <div className={classes.root}>
      {user && showNavigation && <Navigation />}
      <main className={classes.content}>
        <CssBaseline />
        <Suspense fallback={<>Loading...</>}>
          <Switch>
            {dashboardViews.map((route) => (
              <AuthRoute key={route.path} path={route.path} component={route.component} exact />
            ))}
            <Route render={() => <Redirect to="/not-found" />} />
          </Switch>
        </Suspense>
      </main>
    </div>
  );
};
