import { UserType } from "#/helpers/user";
import type { API } from "./api";

export declare namespace Login {
  export interface LoginForm {
    username: string;
    password: string;
    user_type: UserType;
    openid: string;
    captcha_id: string;
    captcha_code: string;
  }
  export interface PhoneLoginForm {
    phone: string;
    code: string;
    openid: string;
  }

  export interface LoginResult {
    realName: string;
    token: string;
    username: string;
  }

  export interface InitialState {
    menu: MenuItem[];
    opMenu: string[];
    token: string;
    username: string;
    originName: string;
    realName: string;
    pwdIsSet: boolean;
    userType: API.UserType;
  }

  export interface MenuItem {
    id: string;
    key: string;
    title: string;
    children: MenuItem[];
  }

  export interface CaptchaRes {
    data: string;
    id: string;
  }
}
