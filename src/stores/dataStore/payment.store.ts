import { makeAutoObservable, runInAction } from 'mobx';
import { Stripe, StripeCardElement } from '@stripe/stripe-js';
import { RootStore } from 'stores';
import { paymentService } from 'services';
import { ICardType, IStripeSubscriptionType, ISubscriptionStatusForUser } from 'types';
import { SubscriptionType } from 'models/SubscriptionType.model';

interface IAddCardPayload {
  stripe: Stripe;
  card: StripeCardElement;
  isDefault: boolean;
}

export class PaymentStore {
  private rootStore: RootStore;
  public subscriptions: IStripeSubscriptionType[] = [];
  public subscriptionTiers: SubscriptionType[] = [];
  public paymentMethods: ICardType[] = [];
  public userHasStoredPaymentMethod = false;
  public isSubscriptionSetToCancel = false;
  public recurringFee?: string = undefined;
  public recurringInterval?: string = undefined;
  public periodEndDate?: string = undefined;

  paymentFormValues: ICardType = {
    id: '',
    encryptedCardNumber: '',
    cardholderName: '',
    expirationMonth: '',
    expirationYear: '',
    addressId: '',
    isPrimary: false,
    userId: '',
  };

  loading = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.userHasStoredPaymentMethod = false;

    this.getSubscriptionTiers();

    makeAutoObservable(this);
  }

  setLoading = (status = false): void => {
    runInAction(() => {
      this.loading = status;
    });
  };

  storeFormData = (formValues: ICardType): void => {
    this.paymentFormValues = formValues;
  };

  getSubscriptionTiers = async (): Promise<void> => {
    try {
      const tiers = await paymentService.getSubscriptionTiers();

      runInAction(() => {
        this.subscriptionTiers = tiers;
      });
    } catch (err: any) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }
  };

  setSubscriptionStatusForUser = async (userId: string): Promise<void> => {
    try {
      const subscriptionStatusForUser = await paymentService.getSubscriptionStatusForUser(userId);

      runInAction(() => {
        this.isSubscriptionSetToCancel = subscriptionStatusForUser?.isSubscriptionSetToCancelAtPeriodEnd;
        this.recurringFee = subscriptionStatusForUser?.subscriptionPrice.displayPrice;
        this.recurringInterval = subscriptionStatusForUser?.subscriptionPrice.recurrence;
        this.periodEndDate = subscriptionStatusForUser?.periodEndDate;
      });
    } catch (err: any) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }
  };

  getAllCardsForUser = async (userId: string): Promise<void> => {
    try {
      const cards = await paymentService.getAllCardsForUser(userId);
      if (cards.length > 0 && Array.isArray(cards)) {
        runInAction(() => {
          this.paymentMethods = cards;
          this.userHasStoredPaymentMethod = true;
        });
      }
    } catch (err: any) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }
  };

  addNewCard = async (card: ICardType, cb: () => void): Promise<void> => {
    try {
      this.setLoading(true);
      delete card.id;

      const createdCard = await paymentService.saveCard(card);
      if (!createdCard) throw new Error('Unable to save card!');

      cb();

      runInAction(() => {
        this.rootStore.uiStore.notificationStore.sendNotification('Card saved successfully!', 'success');
        this.paymentFormValues = {
          id: '',
          encryptedCardNumber: '',
          cardholderName: '',
          expirationMonth: '',
          expirationYear: '',
          addressId: '',
          isPrimary: false,
          userId: '',
        };
      });

      this.getAllCardsForUser(card.userId).finally(() => null);
    } catch (err: any) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }

    this.setLoading();
  };

  updateCardAsync = async (card: ICardType, cb: () => void): Promise<void> => {
    try {
      this.setLoading(true);

      const updatedCard = await paymentService.updateCard(card);
      if (!updatedCard) throw new Error('Unable to save card!');

      cb();

      runInAction(() => {
        this.rootStore.uiStore.notificationStore.sendNotification('Card updated successfully!', 'success');
        this.paymentFormValues = {
          id: '',
          encryptedCardNumber: '',
          cardholderName: '',
          expirationMonth: '',
          expirationYear: '',
          addressId: '',
          isPrimary: false,
          userId: '',
        };
      });

      this.getAllCardsForUser(card.userId).finally(() => null);
    } catch (err: any) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }

    this.setLoading();
  };

  addNewCardAndRegister = async (
    { card, stripe }: IAddCardPayload,
    cb: (paymentMethod: string) => Promise<void>,
  ): Promise<void> => {
    try {
      this.setLoading(true);

      const secret = await paymentService.getPaymentIntentSecret();
      if (!secret) throw new Error('Unable to initiate save card process!');

      const { setupIntent, error } = await stripe.confirmCardSetup(secret, { payment_method: { card } });

      if (error?.message || !setupIntent) throw new Error(error?.message || 'Something went wrong!');

      if (!setupIntent.payment_method || setupIntent.status !== 'succeeded') {
        throw new Error('Unable to save your card details!');
      }

      await cb(setupIntent.payment_method);
    } catch (err: any) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }

    this.setLoading();
  };

  updateDefaultCard = async (id: string): Promise<void> => {
    try {
      this.setLoading(true);

      const status = await paymentService.makeDefaultCard(id);
      if (!status) throw new Error('Unable to update default card!');

      runInAction(() => {
        this.paymentMethods = this.paymentMethods.map((pm) => ({ ...pm, isDefault: pm.id === id }));
        this.rootStore.uiStore.notificationStore.sendNotification('Default card updated successfully!', 'success');
      });
    } catch (err: any) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }

    this.setLoading();
  };

  deleteCardByID = async (id: string): Promise<void> => {
    try {
      this.setLoading(true);

      const status = await paymentService.deleteCardByID(id);
      if (!status) throw new Error('Unable to delete card!');

      runInAction(() => {
        this.paymentMethods = this.paymentMethods.filter((pm) => pm.id !== id);
        if (this.paymentMethods.length === 0) {
          this.userHasStoredPaymentMethod = false;
        }
        this.rootStore.uiStore.notificationStore.sendNotification('Card deleted successfully!', 'success');
      });
    } catch (err: any) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }

    this.setLoading();
  };

  getAllSubscriptions = async (): Promise<void> => {
    try {
      const subscriptions = await paymentService.getSubscriptions();

      if (subscriptions && Array.isArray(subscriptions)) {
        runInAction(() => {
          this.subscriptions = subscriptions;
        });
      }
    } catch (err: any) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }
  };

  cancelSubscription = async (subscriptionId: string): Promise<void> => {
    try {
      const wasCancellationSuccessful = await paymentService.cancelSubscription(subscriptionId);
      if (!wasCancellationSuccessful) throw new Error('Unable to cancel Subscription!');

      this.isSubscriptionSetToCancel = true;

      runInAction(() => {
        this.rootStore.uiStore.notificationStore.sendNotification(
          'Your Subscription has been successfully cancelled. You can continue using Hypercart until the end of your subscription!',
          'success',
        );
      });
    } catch (err: any) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }
  };
}
