import { lazy } from 'react';

export const authViews = [
  { path: '/login', component: lazy(() => import('./Login/Login.view')) },
  { path: '/forgot-password', component: lazy(() => import('./ForgotPassword/ForgotPassword.view')) },
];
