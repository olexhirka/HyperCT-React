import env from 'env-var';

export const firebaseConfig = {
  apiKey: env.get('REACT_APP_FIREBASE_API_KEY').required().asString(),
  authDomain: env.get('REACT_APP_AUTH_DOMAIN').required().asString(),
  projectId: env.get('REACT_APP_PROJECT_ID').required().asString(),
  storageBucket: env.get('REACT_APP_STORAGE_BUCKET').required().asString(),
  messagingSenderId: env.get('REACT_APP_MESSAGING_SENDER_ID').required().asString(),
  appId: env.get('REACT_APP_APP_ID').required().asString(),
  measurementId: env.get('REACT_APP_MEASUREMENT_ID').required().asString(),
};

export const apiBaseURL = env.get('REACT_APP_API_BASE_URL').required().asString();

export const stripePublicKey = env.get('REACT_APP_STRIPE_PUBLIC_KEY').required().asString();

export const websiteURL = env.get('REACT_APP_WEBSITE_URL').required().asString();
export const websocketEndpoint = env.get('REACT_APP_NOTIFICATION_ENDPOINT').required().asString();
