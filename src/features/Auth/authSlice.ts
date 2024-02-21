import { createAsyncThunk, createSlice, AsyncThunk } from '@reduxjs/toolkit'
import User from 'src/types/user.type'
import http from 'src/utils/http'
import { payloadCreator } from 'src/utils/helper'
interface UserState {
  data: any
  isAuthenticatedLS: boolean
  isAuthenticatedSS: boolean
  loading: boolean
  error: string | null
  username: string | null
}
interface UserLogin {
  username: string
  password: string
  accessToken?: string
}
const initialState: UserState = {
  data: localStorage.getItem('accessToken') || '',
  loading: false,
  isAuthenticatedLS: localStorage.getItem('isAuthenticatedLS') === 'true',
  isAuthenticatedSS: sessionStorage.getItem('isAuthenticatedSS') === 'true',
  error: null,
  username: null
}
type RegisterAccountThunk = AsyncThunk<User, User, {}>

export const registerAccount: RegisterAccountThunk = createAsyncThunk('auth/register', async (data: User, thunkAPI) => {
  try {
    const response = await http.post<User>('api/user/register', data, {
      signal: thunkAPI.signal
    })
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const loginAccount = createAsyncThunk('auth/login', async (data: UserLogin, thunkAPI) => {
  try {
    const response = await http.post<UserLogin>('auth/users', data, {
      signal: thunkAPI.signal
    })
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthenticateChecked: (state, action) => {
      state.isAuthenticatedLS = action.payload
      localStorage.setItem('isAuthenticatedLS', action.payload ? 'true' : 'false')
    },
    setIsAuthenticateUnChecked: (state, action) => {
      state.isAuthenticatedSS = action.payload
      sessionStorage.setItem('isAuthenticatedSS', action.payload ? 'true' : 'false')
    },
    logout: (state, action) => {
      state.isAuthenticatedLS = false
      state.isAuthenticatedSS = false
      state.data = ''
      localStorage.removeItem('accessToken')
    },
    clearTokenOnExpiration: (state) => {
      state.isAuthenticatedLS = false
      state.data = '' // Clear token
      localStorage.removeItem('accessToken')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAccount.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerAccount.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(registerAccount.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(loginAccount.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(loginAccount.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload.accessToken
        state.username = action.meta.arg.username
        state.isAuthenticatedLS = true
        localStorage.setItem('accessToken', action.payload.accessToken || '')
      })
      .addCase(loginAccount.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})
export const { setIsAuthenticateChecked, setIsAuthenticateUnChecked, logout } = userSlice.actions
const authReducer = userSlice.reducer
export default authReducer
