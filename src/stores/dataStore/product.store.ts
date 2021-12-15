import { makeAutoObservable, runInAction } from 'mobx';
import { ProductModel, IProductModel } from 'models';
import { RootStore } from 'stores';
import { productService } from 'services';

export class ProductStore {
  private rootStore: RootStore;

  collectionName = 'products';

  products: ProductModel[] = [];

  selectedProduct: ProductModel | null = null;

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

  getAllProductsAsync = async (): Promise<ProductModel[]> => {
    try {
      this.setLoading(true);

      const productList = await productService.getProducts();
      if (!productList) throw new Error('Something went wrong!');

      runInAction(() => {
        this.products = productList.map((product) => new ProductModel(product, this.rootStore));
      });
    } catch (err: any) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }

    this.setLoading();
    return this.products;
  };

  getAll = async (searchText?: string): Promise<void> => {
    try {
      this.setLoading(true);
      productService.getProducts(searchText).then(
        (response: any) => {
          if (response) {
            this.products = response.map((product: any) => new ProductModel(product, this.rootStore));
          } else {
            this.products = [];
          }
          this.setLoading();
        },
        (error) => {
          this.rootStore.uiStore.notificationStore.handleError(error);
          this.setLoading();
        },
      );
    } catch (err) {
      this.rootStore.uiStore.notificationStore.handleError(err);
      this.setLoading();
    }
  };

  addProductAsync = async (product: IProductModel, cb: () => void): Promise<void> => {
    try {
      this.setLoading(true);

      const data = await productService.addProduct(product);
      if (!data) throw new Error('Unable to create product!');

      cb();

      runInAction(() => {
        this.rootStore.uiStore.notificationStore.sendNotification('Product added successfully!', 'success');
      });
    } catch (err) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }

    this.setLoading();
  };

  getProduct = (id: string): void => {
    const product = this.products.find((p) => p.id === id);
    if (!product) return;

    runInAction(() => {
      this.selectedProduct = product;
    });
  };

  getProductAsync = async (id: string): Promise<ProductModel | null> => {
    try {
      this.setLoading(true);

      const product = await productService.getProductByID(id);
      if (!product) throw new Error('Something went wrong!');

      runInAction(() => {
        this.selectedProduct = new ProductModel(product, this.rootStore);
        const productToUpdate = this.products.find((p) => p.id === product.id);
        if (productToUpdate) {
          productToUpdate.availability = product.availability;
        }
      });
    } catch (err) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }

    this.setLoading();
    return this.selectedProduct;
  };

  updateProductAsync = async (product: IProductModel, cb?: () => void): Promise<void> => {
    try {
      this.setLoading(true);

      const status = await productService.updateProductByID(product.id, product);
      if (!status) throw new Error('Unable to update product!');

      if (cb) {
        cb();
      }

      runInAction(() => {
        this.rootStore.uiStore.notificationStore.sendNotification('Product updated successfully!', 'success');
      });
    } catch (err) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }

    this.setLoading();
  };

  removeProductAsync = async (id: string): Promise<void> => {
    try {
      this.setLoading(true);

      const status = await productService.deleteProduct(id);
      if (!status) throw new Error('Unable to remove product!');

      runInAction(() => {
        const index = this.products.findIndex((u) => u.id === id);
        if (index < 0) return;

        this.products.splice(index, 1);
        this.rootStore.uiStore.notificationStore.sendNotification('Product removed successfully!', 'success');
      });
    } catch (err) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }

    this.setLoading();
  };

  removeSelected = (): void => {
    this.selectedProduct = null;
  };
}
