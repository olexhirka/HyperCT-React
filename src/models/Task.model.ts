import firebase from 'firebase';
import { taskStatusEnum } from 'models/enums';
import { makeAutoObservable } from 'mobx';
import { RootStore } from 'stores';
import { findEnumKeyByValue } from 'helpers';
import { IProductModel } from './Product.model';

export interface ITaskUsage {
  numberOfTasksInUse: number;
  numberOfTotalAllowedTasks: number;
}

export interface IOrderConfirmation {
  id: string;
  orderDateUtc: string;
  paymentMethodLast4Digits: string;
  quantityOrdered: number;
  orderPrice: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  merchantId: string;
  userMerchantAccountId: string;
  productId: string;
}

export interface ITaskModel {
  id: string;
  userId: string;
  productId: string;
  productName: string;
  product?: IProductModel | null;
  targetQuantity: number;
  status: number;
  taskType: number;
  isCheckoutProcessing: boolean;
  isRunning: boolean;
  attemptedPurchases?: number;
  unitsPurchased: number;
}

export class TaskModel implements ITaskModel {
  rootStore: RootStore;
  id: string;
  userId: string;
  productId: string;
  productName: string;
  product: IProductModel | null = null;
  targetQuantity: number;
  status: number;
  taskType: number; // needs to be here, because required in post and patch requests.
  isRunning: boolean;
  isCheckoutProcessing: boolean;
  attemptedPurchases: number = 0;
  unitsPurchased: number = 0;

  constructor(task: ITaskModel, rootStore: RootStore) {
    this.rootStore = rootStore;
    this.userId = task.userId;
    this.id = task.id;
    this.targetQuantity = task.targetQuantity;
    this.status = task.status;
    this.taskType = task.taskType;
    this.isRunning = task.isRunning;
    this.productId = task.productId;
    this.productName = task.productName;
    this.isCheckoutProcessing = task.isCheckoutProcessing;

    this.getProductFromReference(task.productId);

    makeAutoObservable(this);
  }

  get asJSON(): ITaskModel {
    return {
      id: this.id,
      userId: this.userId,
      productId: this.productId,
      productName: this.productName,
      targetQuantity: this.targetQuantity,
      status: this.status,
      taskType: this.taskType,
      isRunning: this.isRunning,
      isCheckoutProcessing: this.isCheckoutProcessing,
      attemptedPurchases: this.attemptedPurchases,
      unitsPurchased: this.unitsPurchased,
    };
  }

  private getProductFromReference = (ref: firebase.firestore.DocumentReference | string) => {
    if (typeof ref === 'string') return;

    ref
      .get()
      .then((doc) => {
        if (doc.exists) this.product = doc.data() as IProductModel;
      })
      .finally(() => null);
  };

  // get typeOfTask(): string {
  // return findEnumKeyByValue(taskTypeEnum, this.taskType);
  // }

  get statusOfTask(): string {
    return findEnumKeyByValue(taskStatusEnum, this.status);
  }
}
