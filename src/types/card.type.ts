export interface ICardType {
  id?: string;
  encryptedCardNumber: string;
  cardholderName: string;
  expirationMonth: string;
  expirationYear: string;
  addressId: string;
  isPrimary: boolean;
  userId: string;
}
export interface ISaveCardPayloadType {
  payment_method: string;
  isDefault: boolean;
}

export interface IStripeSubscriptionType {
  name: string;
  amount: string;
  productId: string;
  priceId: string;
}

export interface ISubscriptionStatusForUser {
  isSubscriptionActiveForUser: boolean;
  isSubscriptionSetToCancelAtPeriodEnd: boolean;
  subscriptionPrice: {
    displayPrice: string;
    recurrence: string;
  };
  periodEndDate: string;
}
