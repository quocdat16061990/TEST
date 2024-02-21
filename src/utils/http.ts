import axios, { AxiosError, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import config from 'src/constants/config'
import { AuthResponse } from 'src/types/auth.type'
import { URL_LOGIN, URL_REGISTER } from 'src/apis/auth.api'
import { getAccessTokenFromLS, setAccessTokenToLS, clearLS, setAccessTokenToSS } from './auth'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './util'
import { RootState, store } from 'src/store'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { ErrorResponse } from 'src/types/util.type'
import { setIsAuthenticateChecked } from 'src/features/Auth/authSlice'
export class Http {
  instance: AxiosInstance
  private accessToken: string

  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 60 * 60 * 24
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = `Bearer ${this.accessToken}`
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === URL_LOGIN || url === URL_REGISTER) {
          const data = response.data as AuthResponse
          this.accessToken = data.accessToken
        }
        return response
      },
      (error: AxiosError) => {
        // Chỉ toast lỗi không phải 422 và 401
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
        }

        // Lỗi Unauthorized (401) có rất nhiều trường hợp
        // - Token không đúng
        // - Không truyền token
        // - Token hết hạn*

        // Nếu là lỗi 401
        if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {
          const config = error.response?.config || { headers: {}, url: '' }
          const { url } = config
          clearLS()

          store.dispatch(setIsAuthenticateChecked(false))
        }
        return Promise.reject(error)
      }
    )
  }
}
const http = new Http().instance
export default http
