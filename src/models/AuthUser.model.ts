import firebase from 'firebase';
import { RootStore } from 'stores';
import { makeAutoObservable } from 'mobx';

export type IAuthUserModel = firebase.User;

export class AuthUserModel {
  private readonly rootStore: RootStore;

  user: IAuthUserModel | null = null;

  constructor(user: IAuthUserModel, rootStore: RootStore) {
    this.rootStore = rootStore;
    this.user = user;

    makeAutoObservable(this);
  }

  get asJSON(): IAuthUserModel | null {
    return this.user;
  }
}
