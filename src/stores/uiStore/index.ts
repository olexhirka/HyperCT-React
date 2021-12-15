import { RootStore } from 'stores';
import { NotificationStore } from './notification.store';

export class UIStore {
  notificationStore: NotificationStore;

  constructor(rootStore: RootStore) {
    this.notificationStore = new NotificationStore(rootStore);
  }
}
