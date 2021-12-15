import { auth } from 'factories';
import firebase from 'firebase';
import { removeAuthToken, setAuthToken } from 'helpers';
import { makeAutoObservable, runInAction } from 'mobx';
import { AuthUserModel, UserModel } from 'models';
import { authService, paymentService, userService } from 'services';
import { RootStore } from 'stores';
import { IAuthResetPassword, IAuthType, IPasswordType, IProfileType } from 'types';

export class AuthStore {
  private rootStore: RootStore;

  loading = false;

  authUser: AuthUserModel | null = null;

  user: UserModel | null = null;

  priceId = '';

  productNotifiedOnce = false;

  initialLoad = true;

  triggerForTokenPersistence: NodeJS.Timeout | undefined;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    this.checkLoggedInUser();

    makeAutoObservable(this);
  }

  checkLoggedInUser = async (): Promise<void> => {
    auth.onAuthStateChanged(async (fbUser) => {
      if (this.triggerForTokenPersistence) {
        clearInterval(this.triggerForTokenPersistence);
      }
      if (fbUser) {
        const authToken = await fbUser.getIdToken(true);
        setAuthToken(authToken);
        if (authToken) {
          if (!this.user) {
            const user = await userService.getUserByFirebaseUid(fbUser.uid, authToken);
            runInAction(() => {
              this.user = new UserModel(user, this.rootStore);
            });
          }
        }
        this.triggerForTokenPersistence = setInterval(() => {
          fbUser.getIdToken(true).then(async (authToken) => {
            setAuthToken(authToken);
          });
        }, 50 * 60 * 1000);
        runInAction(() => {
          this.authUser = new AuthUserModel(fbUser, this.rootStore);
        });
      }
      runInAction(() => {
        this.initialLoad = false;
      });
    });
  };

  private setLoading = (status = false): void => {
    runInAction(() => {
      this.loading = status;
    });
  };

  loginApi = async ({ email, password }: IAuthType, cb?: () => void): Promise<void> => {
    try {
      if (this.authUser) throw new Error('You are already logged in');
      this.setLoading(true);
      await auth
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(async () => {
          const authResponse = await auth.signInWithEmailAndPassword(email, password);
          if (authResponse.user) {
            await this.login(authResponse.user);
          }
        })
        .catch((error) => {
          runInAction(() => {
            this.rootStore.uiStore.notificationStore.handleError(error);
          });
        });

      if (cb && typeof cb === 'function') cb();
    } catch (err: any) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }

    this.setLoading();
  };

  logoutApi = async (): Promise<void> => {
    try {
      await auth.signOut();
      removeAuthToken();

      runInAction(() => {
        this.authUser = null;
        this.user = null;
      });
    } catch (err: any) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }
  };

  resetPasswordApi = async ({ email }: IAuthResetPassword, cb: () => void): Promise<void> => {
    try {
      if (this.authUser) throw new Error('You are already logged in!');

      this.setLoading(true);

      await authService.resetPassword(email);

      this.rootStore.uiStore.notificationStore.sendNotification(
        'Password reset link sent to your email successfully.',
        'success',
      );

      cb();
    } catch (err: any) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }
    this.setLoading();
  };

  login = async (fbUser: firebase.User): Promise<void> => {
    try {
      const authToken = await fbUser.getIdToken(true);
      setAuthToken(authToken);

      if (!this.user) {
        const user = await userService.getUserByFirebaseUid(fbUser.uid, authToken);
        if (!user) {
          throw new Error('No user found!');
        }

        if (!user.stripeSubscriptionId) {
          throw new Error('No subscription found for user')
        }

        const { isSubscriptionActiveForUser } = await paymentService.getSubscriptionStatusForUser(user.id);
        if (!isSubscriptionActiveForUser) {
          throw new Error('User subscription is inactive');
        }
        this.user = new UserModel(user, this.rootStore);
      }

      runInAction(() => {
        this.authUser = new AuthUserModel(fbUser, this.rootStore);
        this.initialLoad = false;
      });
    } catch (err: any) {
      await this.logoutApi();
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
        this.initialLoad = false;
      });
    }
  };

  updateProfileApi = async ({ firstName, lastName }: IProfileType, cb: () => void): Promise<void> => {
    try {
      this.setLoading(true);
      const status = await authService.updateProfile({ firstName, lastName });

      if (status) {
        cb();
        runInAction(() => {
          if (this.user) {
            this.user.firstName = firstName;
            this.user.lastName = lastName;
            this.rootStore.uiStore.notificationStore.sendNotification('Profile updated successfully', 'success');
          }
        });
      }
    } catch (err: any) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }

    this.setLoading();
  };

  updatePasswordApi = async ({ currentPassword, newPassword }: IPasswordType, cb: () => void): Promise<void> => {
    try {
      this.setLoading(true);

      const { currentUser } = auth;
      if (!currentUser || !currentUser.email) throw new Error('User is not authorized');

      const { user } = await auth.signInWithEmailAndPassword(currentUser.email, currentPassword);
      if (!user) throw new Error('Current password is invalid');

      await user.updatePassword(newPassword);

      cb();

      runInAction(() => {
        this.rootStore.uiStore.notificationStore.sendNotification('Password updated successfully', 'success');
        this.authUser = new AuthUserModel(user, this.rootStore);
      });
    } catch (err: any) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }

    this.setLoading();
  };

  updateEmailApi = async ({ email, password }: IAuthType, cb: () => void): Promise<void> => {
    try {
      this.setLoading(true);

      const { currentUser } = auth;
      if (!currentUser || !currentUser.email) throw new Error('User is not authorized');

      if (email.toLowerCase() === currentUser.email.toLowerCase())
        throw new Error('Old email and new email cannot be same');

      const emailNotExists = await authService.validateEmail(email);

      if (!emailNotExists) throw new Error('Email already in use');

      const { user } = await auth.signInWithEmailAndPassword(currentUser.email, password);
      if (!user) throw new Error('Current password is invalid');

      await user.updateEmail(email);

      const updatedToken = await user.getIdToken();

      setAuthToken(updatedToken);

      await authService.updateEmail(email);

      cb();

      runInAction(() => {
        this.rootStore.uiStore.notificationStore.sendNotification('Email updated successfully', 'success');
        this.authUser = new AuthUserModel(user, this.rootStore);
        if (this.user) this.user.email = email;
      });
    } catch (err: any) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }

    this.setLoading();
  };

  createSubscripton = async (payment_method: string): Promise<void> => {
    try {
      if (!this.priceId || this.user?.stripeSubscriptionId || this.productNotifiedOnce) return;
      if (!this.authUser) throw new Error('User is not authorized');

      const user = await paymentService.createSubscripton({
        priceId: this.priceId,
        payment_method,
      });
      if (!user) throw new Error('Unable to create subscription');

      runInAction(() => {
        this.user = new UserModel(user, this.rootStore);
      });
    } catch (err: any) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }
  };
}
