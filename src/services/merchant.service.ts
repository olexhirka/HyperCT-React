import { IMerchantModel } from 'models';
import { ApiServiceFactory } from 'factories';

class MerchantService extends ApiServiceFactory {
  private readonly controllerName = 'merchants';

  async getAll() : Promise<IMerchantModel[]> {
    const { data } = await this.api.get<IMerchantModel[]>(this.controllerName);

    return data;
  }

  async addOne(merchant: IMerchantModel) : Promise<IMerchantModel> {
    const { data } = await this.api.post<IMerchantModel>(this.controllerName, merchant);

    return data;
  }

  async getByID(id: string) : Promise<IMerchantModel> {
    const { data } = await this.api.get<IMerchantModel>(`${this.controllerName}/${id}`);

    return data;
  }

  async updatedByID(id: string, merchant: IMerchantModel) : Promise<boolean> {
    const { status } = await this.api.patch<IMerchantModel>(`${this.controllerName}/${id}`, merchant);

    return status === 200;
  }

  async deleteByID(id: string): Promise<boolean> {
    const { status } = await this.api.delete(`${this.controllerName}/${id}`);

    return status === 200;
  }
}

export const merchantService = new MerchantService();
