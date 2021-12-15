import { makeAutoObservable, runInAction } from 'mobx';
import { IMerchantModel, MerchantModel } from 'models';
import { RootStore } from 'stores';
import { merchantService } from 'services';

export class MerchantStore {
  private rootStore: RootStore;

  merchants: MerchantModel[] = [];

  selectedMerchant: MerchantModel | null = null;

  loading = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  private hideUnsupportedMerchants = () => {
    const isAdmin = this.rootStore.dataStore.authStore.user?.role === 1;

    runInAction(() => {
      this.merchants = this.merchants.filter((m) => isAdmin || m.isSupported);
    });
  };

  private setLoading = (status = false): void => {
    runInAction(() => {
      this.loading = status;
    });
  };

  addMerchantAsync = async (merchant: IMerchantModel, cb: () => void): Promise<void> => {
    try {
      this.setLoading(true);

      const data = await merchantService.addOne(merchant);
      if (!data) throw new Error('Unable to create merchant!');

      cb();

      runInAction(() => {
        this.rootStore.uiStore.notificationStore.sendNotification('Merchant added successfully!', 'success');
      });
    } catch (err: any) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }

    this.setLoading();
  };

  deleteByID = async (id: string): Promise<void> => {
    try {
      this.setLoading(true);

      const isAdmin = this.rootStore.dataStore.authStore.user?.role === 1;

      if (!isAdmin) return;

      const status = await merchantService.deleteByID(id);
      if (!status) throw new Error('Unable to delete!');
    } catch (err: any) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }

    this.setLoading();
  };

  getAll = async (): Promise<MerchantModel[]> => {
    try {
      this.setLoading(true);
      const merchants = await merchantService.getAll();
      if (!merchants) throw new Error('Something went wrong!');

      const merchantListWithImages = merchants.map((merchant) => {
        return {
          ...merchant,
          imagePath: `/assets/merchants/${merchant.name.toLowerCase()}.svg`,
        };
      });

      runInAction(() => {
        this.merchants = merchantListWithImages.map((merchant) => new MerchantModel(merchant, this.rootStore));
      });
    } catch (err: any) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }

    this.setLoading();
    return this.merchants;
  };

  getByID = async (id: string): Promise<void> => {
    try {
      this.setLoading(true);

      const isAdmin = this.rootStore.dataStore.authStore.user?.role === 1;

      if (!isAdmin) return;

      const merchant = await merchantService.getByID(id);

      runInAction(() => {
        this.selectedMerchant = new MerchantModel(merchant, this.rootStore);
      });
    } catch (err: any) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }

    this.setLoading();
  };

  updateByID = async (merchant: IMerchantModel, cb: () => void): Promise<void> => {
    try {
      this.setLoading(true);

      const isAdmin = this.rootStore.dataStore.authStore.user?.role === 1;

      if (!isAdmin) return;

      const status = await merchantService.updatedByID(merchant.id, merchant);
      if (!status) throw new Error('Unable to update merchant!');

      cb();

      runInAction(() => {
        this.selectedMerchant = null;
      });
    } catch (err: any) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }

    this.setLoading();
  };
}
