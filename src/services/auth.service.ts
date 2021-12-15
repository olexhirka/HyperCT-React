import { IUserModel } from 'models';
import { ApiServiceFactory } from 'factories';
import { IProfileType } from 'types';

class AuthService extends ApiServiceFactory {
  private readonly controllerName = 'auth';

  async registerUser(payload: IProfileType): Promise<IUserModel> {
    const { data } = await this.api.post<IUserModel>(`${this.controllerName}/register`, payload);

    return data;
  }

  async updateProfile(payload: IProfileType): Promise<boolean> {
    const { status } = await this.api.patch(`${this.controllerName}/profile`, payload);

    return status === 200;
  }

  async validateEmail(email: string): Promise<boolean> {
    const { data } = await this.api.post<boolean>(`${this.controllerName}/validate-email`, { email });

    return data;
  }

  async updateEmail(email: string): Promise<boolean> {
    const { data } = await this.api.patch<boolean>(`${this.controllerName}/email`, { email });

    return data;
  }

  async resetPassword(email: string): Promise<boolean> {
    const { data } = await this.api.post<boolean>(`/email-password-reset-link`, { email });

    return data;
  }
}

export const authService = new AuthService();
