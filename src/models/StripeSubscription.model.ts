export interface IStripeSubscriptionModel {
  id: string;
  current_period_end: number;
  current_period_start: number;
  customer: string;
  payment_method: string;
  planId: string;
  active: boolean;
  amount: number;
  product: string;
  status: string;
}
