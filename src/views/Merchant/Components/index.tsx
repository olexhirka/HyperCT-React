import { lazy } from 'react';

export const MerchantAddForm = lazy(() => import('./MerchantAddForm/MerchantAddForm.component'));
export const MerchantCard = lazy(() => import('./MerchantCard/MerchantCard.component'));
export const MerchantEditForm = lazy(() => import('./MerchantEditForm/MerchantEditForm.component'));
export const MerchantSearch = lazy(() => import('./MerchantSearch/MerchantSearch.component'));

export { EditAddCard } from './EditAddCard.component';
