import { AuthResponse } from "src/types/auth.type";
import http from "src/utils/http";
import User from "src/types/user.type";
export const URL_LOGIN = 'auth/users'
export const URL_REGISTER = 'api/user/register'

type UserLogin = Omit<User,'fullname'|'email'>
export const authApi = {
  registerAccount(body: User) {
    return http.post<AuthResponse>(URL_REGISTER,body)
  },
  loginAccount(body:UserLogin) {
    return http.post<AuthResponse>(URL_LOGIN,body)
  }
}