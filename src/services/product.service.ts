import { IProductModel } from 'models';
import { ApiServiceFactory } from 'factories';

class ProductService extends ApiServiceFactory {
  private readonly controllerName = 'products';

  async getProducts(searchText?: string): Promise<IProductModel[]> {
    const queryString = searchText ? `?name=@${searchText.trim()}` : '';

    const { data } = await this.api.get<IProductModel[]>(`${this.controllerName}${queryString}`);

    return data;
  }

  async getProductsQuery(qs: string): Promise<IProductModel[]> {
    const { data } = await this.api.get<IProductModel[]>(`${this.controllerName}?name=@${qs}`);

    return data;
  }

  async addProduct(product: IProductModel): Promise<IProductModel> {
    const { data } = await this.api.post<IProductModel>(this.controllerName, product);

    return data;
  }

  async getProductByID(id: string): Promise<IProductModel> {
    const { data } = await this.api.get<IProductModel>(`${this.controllerName}/${id}`);

    return data;
  }

  async updateProductByID(id: string, product: IProductModel): Promise<boolean> {
    const { status } = await this.api.patch<IProductModel>(`${this.controllerName}/${id}`, product);

    return status === 200;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const { status } = await this.api.delete(`${this.controllerName}/${id}`);

    return status === 200;
  }
}

export const productService = new ProductService();
