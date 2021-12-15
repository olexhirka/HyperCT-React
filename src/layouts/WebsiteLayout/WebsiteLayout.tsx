import { ReactElement, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
// Views
import { views } from 'views';
import { useStyles } from './WebsiteLayout.styles';
import AuthRoute from 'components/AuthRoute/AuthRoute';

export const WebsiteLayout = (): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <CssBaseline />
        <Suspense fallback={<>Loading...</>}>
          <Switch>
            {views.map((route) => (
              <AuthRoute key={route.path} path={route.path} component={route.component} exact />
            ))}
            <Route render={() => <Redirect to="/not-found" />} />
          </Switch>
        </Suspense>
      </main>
    </div>
  );
};
