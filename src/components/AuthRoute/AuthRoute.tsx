import { useStore } from 'hooks';
import React, { useEffect } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

const AuthRoute: React.FC<RouteProps> = ({ path, component }) => {
  const {
    dataStore: {
      authStore: { user },
      merchantStore: { merchants, getAll },
    },
  } = useStore();

  useEffect(() => {
    if (user) {
      const fetch = async () => {
        if (!merchants.length) {
          getAll();
        }
      };
      fetch();
    }
  }, []);

  if (!path || Array.isArray(path)) {
    return <Redirect to="/" />;
  }

  if (user) {
    if (path === '/' || path === '/login' || path === '/forgot-password') {
      return <Redirect to="/dashboard/tasks" />;
    }
    return <Route path={path} component={component} exact />;
  }
  if (
    path === '/' ||
    path === '/login' ||
    path === '/forgot-password' ||
    path === '/terms' ||
    path === '/privacy-policy'
  ) {
    return <Route key={path} path={path} component={component} exact />;
  }
  return <Redirect to="/login" />;
};

export default AuthRoute;
