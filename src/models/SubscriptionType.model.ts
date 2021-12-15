export interface SubscriptionType {
  id: string;
  name: string;
  productId: string;
  priceId: string;
  setupFeePriceId: string;
  displayPrice: string;
  submitButtonText: string;
  isSubmitButtonEnabled: boolean;
  taskLimit: number;
  createdAt: string;
  updatedAt: string;
  promotionLines: string[];
}
