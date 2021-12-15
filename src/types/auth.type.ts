export interface IAuthType {
  email: string;
  password: string;
}

export interface IAuthResetPassword {
  email: string;
}

export interface IRegisterType extends IAuthType {
  firstName: string;
  lastName: string;
}

export interface IProfileType {
  firstName: string;
  lastName: string;
}

export interface IPasswordType {
  currentPassword: string;
  newPassword: string;
  rpassword: string;
}
