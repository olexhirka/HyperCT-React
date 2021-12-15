import { lazy } from 'react';

export * from './formFields';

export { default as Navigation } from './Navigation/Navigation.component';
export { GuestNavigation } from './GuestNavigation/GuestNavigation.component';
export { NotificationComponent } from './Notification/Notification.component';

export const PricingCard = lazy(() => import('./PricingCard/PricingCard.component'));
export const NotFound = lazy(() => import('./NotFound/NotFound.component'));
export const SaveCardModal = lazy(() => import('./SaveCardModal/SaveCardModal.component'));
