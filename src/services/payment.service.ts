import { ApiServiceFactory } from 'factories';
import { IUserModel } from 'models';
import { SubscriptionType } from 'models/SubscriptionType.model';
import { ICardType, IStripeSubscriptionType, ISubscriptionStatusForUser } from 'types';

class PaymentService extends ApiServiceFactory {
  private readonly controllerName = 'payment-methods';

  async getPaymentIntentSecret(): Promise<string> {
    const { data } = await this.api.get<string>(`${this.controllerName}/createSetupIntent`);

    return data;
  }

  async saveCard(payload: ICardType): Promise<boolean> {
    const { data } = await this.api.post(`${this.controllerName}`, payload);

    return data;
  }

  async getAllCardsForUser(userId: string): Promise<ICardType[]> {
    const { data } = await this.api.get<ICardType[]>(`${this.controllerName}/user/${userId}`);

    return data;
  }

  async makeDefaultCard(id: string): Promise<boolean> {
    const { data } = await this.api.patch<boolean>(`${this.controllerName}/${id}`);

    return data;
  }
  async updateCard(payload: ICardType): Promise<boolean> {
    const { status } = await this.api.patch<boolean>(`${this.controllerName}/${payload.id}`, payload);

    return status === 200;
  }

  async deleteCardByID(id: string): Promise<boolean> {
    const { data } = await this.api.delete<boolean>(`${this.controllerName}/${id}`);

    return data;
  }

  async getSubscriptions(): Promise<IStripeSubscriptionType[]> {
    const { data } = await this.api.get<IStripeSubscriptionType[]>(`${this.controllerName}/subscriptions`);

    return data;
  }

  async getSubscriptionTiers(): Promise<SubscriptionType[]> {
    const { data } = await this.api.get<{ prices: SubscriptionType[] }>(`payments/subscription-tiers`);

    return data.prices;
  }

  async createSubscripton(payload: { payment_method: string; priceId: string }): Promise<IUserModel> {
    const { data } = await this.api.post<IUserModel>(`${this.controllerName}/subscriptions`, payload);

    return data;
  }

  async cancelSubscription(subscriptionId: string): Promise<boolean> {
    const { status } = await this.api.post<IUserModel>(`payments/cancel-subscription-at-period-end`, {
      subscriptionId,
    });

    return status === 204;
  }

  async getSubscriptionStatusForUser(userId: string): Promise<ISubscriptionStatusForUser> {
    const { data } = await this.api.get<ISubscriptionStatusForUser>(`payments/subscription-status/user/${userId}`);

    return data;
  }
}

export const paymentService = new PaymentService();
