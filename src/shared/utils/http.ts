import axios, { AxiosError, type AxiosInstance } from 'axios'
import config from 'src/shared/constants/config'
import { AuthResponse } from 'src/shared/types/auth.type'
import { URL_LOGIN, URL_REGISTER } from 'src/core/services/auth.api'
import { getAccessTokenFromLS, setAccessTokenToLS, clearLS, setAccessTokenToSS } from './auth'
import {  isAxiosUnauthorizedError } from './util'
import HttpStatusCode from 'src/shared/constants/httpStatusCode.enum'
import { ErrorResponse } from 'src/shared/types/util.type'

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
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
        }


        if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {
          const config = error.response?.config || { headers: {}, url: '' }
          const { url } = config
          clearLS()
        }
        return Promise.reject(error)
      }
    )
  }
}
const http = new Http().instance
export default http
