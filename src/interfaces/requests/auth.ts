export interface ILoginBody {
  username: string;
  password: string;
}

export interface IForgotPasswordBody {
  email: string;
}

export interface INewPasswordBody {
  code: string;
  email: string;
  password: string;
}
