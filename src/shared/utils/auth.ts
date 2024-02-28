import User from 'src/shared/types/user.type'

export const LocalStorageEventTarget = new EventTarget()

export const getAccessTokenFromLS = () => localStorage.getItem('accessToken') || ''

export const setAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}
export const setUserNameToLs = (username: string) => {
  localStorage.setItem('user_name', username)
}
export const setAccessTokenToSS = (access_token: string) => {
  sessionStorage.setItem('access_token', access_token)
}
export const setUserNameToSS = (username: string) => {
  sessionStorage.setItem('user_name', username)
}

export const clearLS = () => {
  localStorage.removeItem('accessToken')
  const clearLSEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}

export const clearSS = () => {
  sessionStorage.removeItem('access_token')

  const clearLSEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}
