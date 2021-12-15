export const merchantSupportLevelEnum = {
  InventoryAlert: 0,
  AddToCart: 10,
  AutoCheckout: 20,
};

export const productAvailabilityEnum = {
  Unknown: 0,
  'Out-of-stock': 1,
  'In-stock': 2,
};

export const restockProbabilityEnum = {
  Low: 0,
  Rumor: 10,
  Confirmed: 20,
};

export const sessionStatusEnum = {
  Healthy: 0,
  Ok: 10,
  Severe: 20,
  Critical: 99,
};

export const supportedMerchantsEnum = {
  // tech & gaming
  Walmart: 'walmart',
  BestBuy: 'best buy',
  Target: 'target',
  Sony: 'sony',
  Newegg: 'newegg',
  Amazon: 'amazon',
  GameStop: 'gamestop',
  MicroCenter: 'micro center',
  Microsoft: 'microsoft',
  AntOnline: 'ant online',

  // shoes
  Nike: 'nike',
  FinishLine: 'finish line',
  FootLocker: 'foot locker',
};

export const taskStatusEnum = {
  Open: 0,
  PartiallyFilled: 20,
  Filled: 30,
  Rejected: 90,
};

export const taskTypeEnum = {
  Alert: 0,
  AddToCart: 10,
  Checkout: 20,
};
