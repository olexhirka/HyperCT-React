import { makeAutoObservable, runInAction } from 'mobx';
import { AddressModel, IAddressModel } from 'models';
import { RootStore } from 'stores';
import { addressService } from 'services';

export class AddressStore {
  private rootStore: RootStore;

  public userHasStoredShippingAddress: boolean = false;

  collectionName = 'addresses';

  userAddresses: AddressModel[] = [];

  createdAddress: AddressModel | null = null;

  selectedAddress: AddressModel | null = null;

  loading = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this);
  }

  private setLoading = (status = false): void => {
    runInAction(() => {
      this.loading = status;
    });
  };

  getAllAddressForUserAsync = async (userId: string): Promise<AddressModel[]> => {
    try {
      this.setLoading(true);

      const rawUserAddresses = await addressService.getAllForUser(userId);
      if (!rawUserAddresses) throw new Error('Something went wrong!');

      runInAction(() => {
        this.userAddresses = rawUserAddresses.map((a) => new AddressModel(a, this.rootStore));

        if (this.doesShippingAddressExist(this.userAddresses)) {
          this.userHasStoredShippingAddress = true;
        }
      });
    } catch (err) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }

    this.setLoading();
    return this.userAddresses;
  };

  addAddressAsync = async (address: IAddressModel, cb?: () => void): Promise<void> => {
    try {
      this.setLoading(true);

      const data = await addressService.addOne(address);
      if (!data) throw new Error('Unable to create address!');

      const newAddress = new AddressModel(data, this.rootStore);

      if (cb) {
        cb();
      }

      runInAction(() => {
        this.createdAddress = newAddress;
        this.userAddresses = [newAddress, ...this.userAddresses].sort();
        this.rootStore.uiStore.notificationStore.sendNotification('Address added successfully!', 'success');
      });
    } catch (err) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }

    this.setLoading();
  };

  getAddress = (id: string): void => {
    const address = this.userAddresses.find((p) => p.id === id);
    if (!address) return;

    runInAction(() => {
      this.selectedAddress = address;
    });
  };

  getAddressAsync = async (id: string): Promise<void> => {
    try {
      this.setLoading(true);

      const address = await addressService.getByID(id);
      if (!address) throw new Error('Something went wrong!');

      runInAction(() => {
        this.selectedAddress = new AddressModel(address, this.rootStore);
      });
    } catch (err) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }

    this.setLoading();
  };

  updateAddressAsync = async (address: IAddressModel, cb: () => void): Promise<void> => {
    try {
      this.setLoading(true);

      const status = await addressService.updatedByID(address.id!, address);
      if (!status) throw new Error('Unable to update address!');

      cb();

      runInAction(() => {
        this.rootStore.uiStore.notificationStore.sendNotification('Address updated successfully!', 'success');
      });
    } catch (err) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }

    this.setLoading();
  };

  removeAddressAsync = async (id: string): Promise<void> => {
    try {
      this.setLoading(true);

      const status = await addressService.deleteByID(id);
      if (!status) throw new Error('Unable to remove address!');

      runInAction(() => {
        const index = this.userAddresses.findIndex((u) => u.id === id);
        if (index < 0) return;

        this.userAddresses.splice(index, 1);
        this.rootStore.uiStore.notificationStore.sendNotification('Address removed successfully!', 'success');
      });
    } catch (err) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }

    this.setLoading();
  };

  removeSelected = (): void => {
    this.selectedAddress = null;
  };

  private doesShippingAddressExist(addresses: AddressModel[]): boolean {
    return !!addresses.find(address => address.isShipping);
  }
}
