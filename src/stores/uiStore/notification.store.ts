import { Color } from '@material-ui/lab';
import { makeAutoObservable } from 'mobx';
import { get } from 'lodash';
import { INotificationModel, NotificationModel } from 'models';
import { RootStore } from 'stores';

export class NotificationStore {
  private rootStore: RootStore;

  notifications: NotificationModel[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this);
  }

  sendCustomNotification = (notification: INotificationModel): void => {
    this.notifications.push(new NotificationModel(notification, this.rootStore));
  };

  sendNotification = (message: string, type: Color = 'error'): void => {
    this.sendCustomNotification({ message, type });
  };

  handleError = (err: Error | string = 'Something went wrong!'): void => {
    const message = typeof err === 'string'
      ? err
      : get(err, 'response.data', err.message || 'Something went wrong!') as string;

    this.sendNotification(message);
  };

  removeNotification = (id: string): void => {
    const index = this.notifications.findIndex((u) => u.id === id);
    if (index < 0) return;

    this.notifications.splice(index, 1);
  };
}
