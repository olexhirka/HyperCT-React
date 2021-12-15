import { ICardType } from 'types';

export const createPaymentMethodText = ({
  encryptedCardNumber,
  expirationMonth,
  expirationYear,
}: ICardType): string => {
  const expiry = expirationMonth && expirationYear ? `${expirationMonth}/${expirationYear}` : 'NA';

  return `Card ending in ${encryptedCardNumber.slice(-4)} expiring ${expiry}`;
};
