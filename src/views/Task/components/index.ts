import { lazy } from 'react';

export const TasksList = lazy(() => import('./TasksList/TasksList.component'));
export const TaskAddForm = lazy(() => import('./TaskAddForm/TaskAddForm.component'));
export const TaskEditForm = lazy(() => import('./TaskEditForm/TaskEditForm.component'));
