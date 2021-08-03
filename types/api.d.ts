export declare namespace API {
  export interface ResponseType<T = unknown> {
    code: number;
    msg: string;
    obj: T;
  }

  export enum UserType {
    商家 = 1,
    店铺 = 2
  }

  export interface CurrentUser {
    pwdIsSet?: boolean;
    avatar?: string;
    name?: string;
    account?: string;
    title?: string;
    group?: string;
    signature?: string;
    tags?: {
      key: string;
      label: string;
    }[];
    userid?: string;
    access?: "user" | "guest" | "admin";
    unreadCount?: number;
    userType: UserType;
  }

  export interface LoginStateType {
    status?: "ok" | "error";
    type?: string;
  }
}
