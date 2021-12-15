import { IUserModel } from 'models';
import { apiBaseURL } from 'config';

import axios from 'axios';

class UserService {
  private readonly controllerName = 'users';

  async getUserByFirebaseUid(firebaseUid: string, authToken: string): Promise<IUserModel> {
    const bearerTokenString = `Bearer ${authToken}`;
    const axiosInstance = axios.create({
      baseURL: apiBaseURL,
      headers: { Authorization: bearerTokenString },
    });

    const { data } = await axiosInstance.get<IUserModel>(`${this.controllerName}/firebase-uid/${firebaseUid}`);

    return data;
  }
}

export const userService = new UserService();
