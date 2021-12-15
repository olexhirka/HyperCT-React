import { RootStore } from 'stores';
import { AddressStore } from './address.store';
import { AuthStore } from './auth.store';
import { MerchantStore } from './merchant.store';
import { PaymentStore } from './payment.store';
import { ProductStore } from './product.store';
import { TaskStore } from './task.store';

export class DataStore {
  addressStore: AddressStore;

  authStore: AuthStore;

  merchantStore: MerchantStore;

  paymentStore: PaymentStore;

  productStore: ProductStore;

  taskStore: TaskStore;

  constructor(rootStore: RootStore) {
    this.authStore = new AuthStore(rootStore);
    this.addressStore = new AddressStore(rootStore);
    this.merchantStore = new MerchantStore(rootStore);
    this.paymentStore = new PaymentStore(rootStore);
    this.productStore = new ProductStore(rootStore);
    this.taskStore = new TaskStore(rootStore);
  }
}
