const AUTH_TOKEN = 'AUTH_TOKEN';

export const setAuthToken = (token: string): void => localStorage.setItem(AUTH_TOKEN, token);

export const getAuthToken = (): string | null => localStorage.getItem(AUTH_TOKEN);

export const removeAuthToken = (): void => localStorage.removeItem(AUTH_TOKEN);
