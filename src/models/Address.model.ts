import { makeAutoObservable } from 'mobx';
import { RootStore } from 'stores';

export interface IAddressModel {
  id?: string;
  street: string;
  secondAddressLine?: string;
  city: string;
  state: number | string;
  postalCode: string;
  userId: string;
  isShipping: boolean;
}

export class AddressModel implements IAddressModel {
  private readonly rootStore: RootStore;

  id?: string;
  street: string;
  secondAddressLine?: string;
  city: string;
  state: number | string;
  postalCode: string;
  userId: string;
  isShipping: boolean;

  constructor(address: IAddressModel, rootStore: RootStore) {
    this.rootStore = rootStore;

    this.id = address.id;
    this.street = address.street;
    this.secondAddressLine = address.secondAddressLine;
    this.city = address.city;
    this.state = address.state;
    this.postalCode = address.postalCode;
    this.userId = address.userId;
    this.isShipping = address.isShipping;

    makeAutoObservable(this);
  }

  get asJSON(): IAddressModel {
    return {
      id: this.id,
      street: this.street,
      secondAddressLine: this.secondAddressLine,
      city: this.city,
      state: this.state,
      postalCode: this.postalCode,
      userId: this.userId,
      isShipping: this.isShipping,
    };
  }

  get addressText(): string {
    return `${this.street}, ${this.city}, ${this.state}, ${this.postalCode}`;
  }
}
