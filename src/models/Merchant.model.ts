import { makeAutoObservable } from 'mobx';
import { RootStore } from 'stores';

export interface IMerchantModel {
  id: string;
  domain: string;
  name: string;
  imagePath: string;
  isFlagged: boolean;
  isSupported: boolean;
  supportLevel: number;
  hasGuestCheckout: boolean;
}

export class MerchantModel implements IMerchantModel {
  private readonly rootStore: RootStore;

  id: string;

  domain: string;

  name: string;

  imagePath: string;

  isFlagged: boolean;

  isSupported: boolean;

  supportLevel: number;

  hasGuestCheckout: boolean;

  constructor(merchant: IMerchantModel, rootStore: RootStore) {
    this.rootStore = rootStore;

    this.id = merchant.id;
    this.domain = merchant.domain;
    this.name = merchant.name;
    this.imagePath = merchant.imagePath;
    this.isFlagged = merchant.isFlagged;
    this.isSupported = merchant.isSupported;
    this.supportLevel = merchant.supportLevel;
    this.hasGuestCheckout = merchant.hasGuestCheckout;

    makeAutoObservable(this);
  }

  get asJSON(): IMerchantModel {
    return {
      id: this.id,
      domain: this.domain,
      name: this.name,
      imagePath: this.imagePath,
      isFlagged: this.isFlagged,
      isSupported: this.isSupported,
      supportLevel: this.supportLevel,
      hasGuestCheckout: this.hasGuestCheckout,
    };
  }
}
