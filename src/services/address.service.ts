import { IAddressModel } from 'models';
import { ApiServiceFactory } from 'factories';

class AddressService extends ApiServiceFactory {
  private readonly controllerName = 'addresses';

  async getAll() : Promise<IAddressModel[]> {
    const { data } = await this.api.get<IAddressModel[]>(this.controllerName);

    return data;
  }

  async getAllForUser(userId: string) : Promise<IAddressModel[]> {
    const { data } = await this.api.get<IAddressModel[]>(`${this.controllerName}/user/${userId}`);

    return data;
  }

  async addOne(address: IAddressModel) : Promise<IAddressModel> {
    const { data } = await this.api.post<IAddressModel>(this.controllerName, address);

    return data;
  }

  async getByID(id: string) : Promise<IAddressModel> {
    const { data } = await this.api.get<IAddressModel>(`${this.controllerName}/${id}`);

    return data;
  }

  async updatedByID(id: string, address: IAddressModel) : Promise<boolean> {
    const { status } = await this.api.patch<IAddressModel>(`${this.controllerName}/${id}`, address);

    return status === 200;
  }

  async deleteByID(id: string): Promise<boolean> {
    const { status } = await this.api.delete(`${this.controllerName}/${id}`);

    return status === 200;
  }
}

export const addressService = new AddressService();
