import moment from 'moment';
import firebase from 'firebase';
import { makeAutoObservable } from 'mobx';
import { RootStore } from 'stores';
import { findEnumKeyByValue } from 'helpers';
import { productAvailabilityEnum, restockProbabilityEnum } from './enums';
import { IMerchantModel } from './Merchant.model';

export interface IProductModel {
  id: string;
  merchantId: string;
  merchantRef?: firebase.firestore.DocumentReference;
  merchant?: IMerchantModel | null;
  name: string;
  merchantProductName: string | null;
  url: string;
  lastSeenUtc: string | null;
  lastCheckedUtc: string | null;
  hasUnitRestrictions: boolean;
  price: number | null;
  isInStoreOnly: boolean;
  restockProbability: number;
  availability: number;
  category: number;
}

export interface UIProduct extends IProductModel {
  merchantName?: string;
}

export class ProductModel implements IProductModel {
  private readonly rootStore: RootStore;

  id: string;

  merchantId: string;

  merchantRef?: firebase.firestore.DocumentReference;

  merchant: IMerchantModel | null = null;

  name: string;

  merchantProductName: string | null;

  url: string;

  lastSeenUtc: string | null;

  lastCheckedUtc: string | null;

  hasUnitRestrictions: boolean;

  price: number | null;

  isInStoreOnly: boolean;

  restockProbability: number;

  availability: number;

  category: number;

  constructor(product: IProductModel, rootStore: RootStore) {
    this.rootStore = rootStore;

    this.id = product.id;
    this.name = product.name;
    this.merchantProductName = product.merchantProductName || '';
    this.url = product.url;
    this.lastSeenUtc = product.lastSeenUtc || null;
    this.lastCheckedUtc = product.lastCheckedUtc || null;
    this.hasUnitRestrictions = product.hasUnitRestrictions;
    this.price = product.price || 0;
    this.isInStoreOnly = product.isInStoreOnly;
    this.restockProbability = product.restockProbability;
    this.availability = product.availability;
    this.category = product.category;
    this.merchantId = product.merchantId;
    this.merchantRef = product.merchantRef;

    this.getMerchantFromReference(product.merchantRef);

    makeAutoObservable(this);
  }

  get asJSON(): IProductModel {
    return {
      id: this.id,
      merchantId: this.merchantId,
      merchantRef: this.merchantRef,
      name: this.name,
      merchantProductName: this.merchantProductName,
      url: this.url,
      lastSeenUtc: this.lastSeenUtc,
      lastCheckedUtc: this.lastCheckedUtc,
      hasUnitRestrictions: this.hasUnitRestrictions,
      price: this.price,
      isInStoreOnly: this.isInStoreOnly,
      restockProbability: this.restockProbability,
      availability: this.availability,
      category: this.category,
    };
  }

  // TODO: look for somewhat better way to implement the same
  private getMerchantFromReference = (ref: firebase.firestore.DocumentReference | undefined) => {
    if (!ref) {
      return;
    }

    ref
      .get()
      .then((doc) => {
        if (doc.exists) this.merchant = doc.data() as IMerchantModel;
      })
      .finally(() => null);
  };

  get lastChecked(): string {
    if (!this.lastCheckedUtc) return 'NA';

    return moment(this.lastCheckedUtc).format('DD MMM, YY');
  }

  get availabilityText(): string {
    return findEnumKeyByValue(productAvailabilityEnum, this.availability);
  }

  get restockProbabilityText(): string {
    return findEnumKeyByValue(restockProbabilityEnum, this.restockProbability);
  }
}
