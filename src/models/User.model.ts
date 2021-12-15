import firebase from 'firebase';
import { makeAutoObservable } from 'mobx';
import { RootStore } from 'stores';
import { IStripeSubscriptionModel } from './StripeSubscription.model';

export interface IUserModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  stripeSubscriptionId: string | firebase.firestore.DocumentReference;
  stripeCustomerId: string;
  subscriptionTierId: string;
  role: number;
}

export class UserModel implements IUserModel {
  private readonly rootStore: RootStore;

  id: string;

  firstName: string;

  lastName: string;

  email: string;

  subscription: IStripeSubscriptionModel | null = null;

  stripeSubscriptionId: string;

  stripeCustomerId: string;

  subscriptionTierId: string;

  role: number;

  constructor(user: IUserModel, rootStore: RootStore) {
    this.rootStore = rootStore;
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.stripeCustomerId = user.stripeCustomerId;
    this.subscriptionTierId = user.subscriptionTierId;
    this.role = user.role;

    if (typeof user.stripeSubscriptionId === 'string') {
      this.stripeSubscriptionId = user.stripeSubscriptionId;
    } else if (user.stripeSubscriptionId?.path) {
      this.stripeSubscriptionId = user.stripeSubscriptionId.path.replace('stripe-subscriptions/', '') || '';
    } else {
      this.stripeSubscriptionId = '';
    }

    this.getSubscriptionFromReference(this.stripeSubscriptionId);

    makeAutoObservable(this);
  }

  get asJSON(): IUserModel {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      stripeSubscriptionId: this.stripeSubscriptionId,
      stripeCustomerId: this.stripeCustomerId,
      subscriptionTierId: this.subscriptionTierId,
      role: this.role,
    };
  }

  private getSubscriptionFromReference = (ref: firebase.firestore.DocumentReference | string) => {
    if (typeof ref === 'string') return;

    ref
      .get()
      .then((doc) => {
        if (doc.exists) this.subscription = doc.data() as IStripeSubscriptionModel;
      })
      .finally(() => null);
  };

  get displayName(): string {
    return `${this.firstName || ''} ${this.lastName || ''}`.trim() || 'Guest User';
  }
}
