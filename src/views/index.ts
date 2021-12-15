import { lazy } from 'react';
import { authViews } from './auth';

// Route Variables
const merchants = '/dashboard/merchants';
const productTracker = '/dashboard/product-tracker';
const tasks = '/dashboard/tasks';
const accountSettings = '/dashboard/settings';

export const dashboardViews = [
  { path: '/dashboard', component: lazy(() => import('./Dashboard/DashboardHub.view')) },
  // Merchant Views
  { path: `${merchants}`, component: lazy(() => import('./Merchant/Merchants.view')) },
  { path: `${merchants}/add`, component: lazy(() => import('./Merchant/MerchantAdd/MerchantAdd.view')) },
  { path: `${merchants}/edit/:id`, component: lazy(() => import('./Merchant/MerchantEdit/MerchantEdit.view')) },
  // Product-Tracker Views
  { path: `${productTracker}`, component: lazy(() => import('./ProductTracker/ProductTracker.view')) },
  { path: `${productTracker}/add`, component: lazy(() => import('./ProductTracker/ProductCreate/ProductCreate.view')) },
  {
    path: `${productTracker}/details/:id`,
    component: lazy(() => import('./ProductTracker/ProductDetail/ProductDetail.view')),
  },
  {
    path: `${productTracker}/edit/:id`,
    component: lazy(() => import('./ProductTracker/ProductEdit/ProductEdit.view')),
  },
  // Task Views
  { path: `${tasks}`, component: lazy(() => import('./Task/Tasks.view')) },
  { path: `${tasks}/add`, component: lazy(() => import('./Task/TaskCreate/TaskCreate.view')) },
  { path: `${tasks}/details/:id`, component: lazy(() => import('./Task/TaskDetails/TaskDetails.view')) },
  { path: `${tasks}/edit/:id`, component: lazy(() => import('./Task/TaskEdit/TaskEdit.view')) },
  // Account Settings
  { path: `${accountSettings}`, component: lazy(() => import('./AccountSettings/AccountSettings.view')) },
  {
    path: `${accountSettings}/profile`,
    component: lazy(() => import('./AccountSettings/EditProfile/EditProfile.view')),
  },
  {
    path: `${accountSettings}/update-email`,
    component: lazy(() => import('./AccountSettings/EditEmail/EditEmail.view')),
  },
  {
    path: `${accountSettings}/update-password`,
    component: lazy(() => import('./AccountSettings/EditPassword/EditPassword.view')),
  },
  {
    path: `${accountSettings}/add-address`,
    component: lazy(() => import('./AccountSettings/AddAddress/AddAddress.view')),
  },
  {
    path: `${accountSettings}/update-address/:id`,
    component: lazy(() => import('./AccountSettings/EditAddress/EditAddress.view')),
  },
  {
    path: `${accountSettings}/add-payment-method`,
    component: lazy(() => import('./AccountSettings/AddPaymentMethod/AddPaymentMethod.view')),
  },
  {
    path: `${accountSettings}/edit-payment-method/:id`,
    component: lazy(() => import('./AccountSettings/EditPaymentMethod/EditPaymentMethod.view')),
  },
  { path: '/', component: lazy(() => import('./auth/Login/Login.view')) },
  ...authViews,
  // Pricing
  // Terms of Agreement & Privacy Policy
  { path: '/terms', component: lazy(() => import('./Terms.view')) },
  { path: '/privacy-policy', component: lazy(() => import('./PrivacyPolicy.view')) },
];

export const views = [
  // { path: '/pricing', component: lazy(() => import('./Pricing/Pricing.view')) },
  { path: '/not-found', component: lazy(() => import('./NotFound/NotFound.view')) },
];
