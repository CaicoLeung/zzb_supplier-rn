import { Login } from "@/types/login";
import fetch from "@/libs/fetch";

export function login(params: Login.LoginForm) {
  return fetch.post<Login.LoginResult>("/common/user/login", params);
}

export async function getUserInfo() {
  return fetch.get<Login.InitialState>("/common/user/menu");
}
