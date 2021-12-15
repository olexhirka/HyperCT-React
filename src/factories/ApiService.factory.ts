import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { apiBaseURL } from 'config';
import { getAuthToken } from 'helpers';

abstract class ApiServiceFactory {
  readonly baseApiUrl = apiBaseURL;

  readonly api: AxiosInstance;

  constructor() {
    this.api = this.getAxios();
  }

  private reqHandling = (config: AxiosRequestConfig) => {
    const obj = { ...config };
    const bearerTokenString = this.getBearerTokenStringFromLocalStorage();

    const headers = {
      ...(obj.headers || {}),
      Authorization: bearerTokenString,
    } as Record<string, string>;

    obj.headers = headers;

    return obj;
  };

  private getAxios = (): AxiosInstance => {
    const bearerTokenString = this.getBearerTokenStringFromLocalStorage();
    const axiosInstance = axios.create({
      baseURL: this.baseApiUrl,
      headers: { Authorization: bearerTokenString },
    });

    axiosInstance.interceptors.request.use(this.reqHandling, (error) => Promise.reject(error));
    return axiosInstance;
  };

  private getBearerTokenStringFromLocalStorage = () => {
    const token = getAuthToken();
    return `Bearer ${token?.toString() ?? ''}`;
  }

  // public setBearerToken(token: string) {
  //   this.api.defaults.headers.Authorization = `Bearer ${token}`;
  // }

  // todo
  // config default set, get, update, delete request via interface comp
}

export default ApiServiceFactory;
