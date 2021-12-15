import { v4 as uuidv4 } from 'uuid';
import { Color } from '@material-ui/lab';
import { makeAutoObservable } from 'mobx';
import { RootStore } from 'stores';

type VerticalPositionType = 'top' | 'bottom';

type HorizontalPositionType = 'left' | 'center' | 'right';

export interface INotificationModel {
  message: string;
  type?: Color;
  open?: boolean;
  vertical?: VerticalPositionType;
  horizontal?: HorizontalPositionType;
}

export class NotificationModel {
  rootStore: RootStore;

  id: string;

  message: string;

  type: Color;

  open: boolean;

  vertical: VerticalPositionType;

  horizontal: HorizontalPositionType;

  constructor(notification: INotificationModel, rootStore: RootStore) {
    this.rootStore = rootStore;

    this.id = uuidv4();
    this.message = notification.message;
    this.type = notification.type || 'error';
    this.open = notification.open || true;
    this.vertical = notification.vertical || 'top';
    this.horizontal = notification.horizontal || 'center';

    makeAutoObservable(this);
  }

  remove = (): void => {
    this.rootStore.uiStore.notificationStore.removeNotification(this.id);
  };
}
