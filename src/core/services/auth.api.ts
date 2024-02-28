import { AuthResponse } from 'src/shared/types/auth.type'
import http from 'src/shared/utils/http'
import User from 'src/shared/types/user.type'
export const URL_LOGIN = 'auth/login'
export const URL_REGISTER = 'auth/register'

type UserLogin = Omit<User, 'firstName' | 'lastName' | 'confirm_password' | 'phone'>
export const authApi = {
  registerAccount(body: User) {
    return http.post<AuthResponse>(URL_REGISTER, body)
  },
  loginAccount(body: UserLogin) {
    return http.post<AuthResponse>(URL_LOGIN, body)
  }
}
