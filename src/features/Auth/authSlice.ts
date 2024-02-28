import { createAsyncThunk, createSlice, AsyncThunk } from '@reduxjs/toolkit'
import User from 'src/shared/types/user.type'
import http from 'src/shared/utils/http'
import { URL_LOGIN, URL_REGISTER } from 'src/core/services/auth.api'
interface UserState {
  isAuthenticatedLS?: any
  data: any
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
  error: null,
  username: null
}
type RegisterAccountThunk = AsyncThunk<User, User, {}>

export const registerAccount: RegisterAccountThunk = createAsyncThunk('auth/register', async (data: User, thunkAPI) => {
  try {
    const response = await http.post<User>(`${URL_REGISTER}`, data, {
      signal: thunkAPI.signal
    })
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const loginAccount = createAsyncThunk(`${URL_LOGIN}`, async (data: UserLogin, thunkAPI) => {
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
   
    logout: (state, action) => {
      state.data = ''
      localStorage.removeItem('accessToken')
    },
    clearTokenOnExpiration: (state) => {
      state.data = '' 
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
        localStorage.setItem('accessToken', action.payload.accessToken || '')
      })
      .addCase(loginAccount.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})
export const { logout } = userSlice.actions
const authReducer = userSlice.reducer
export default authReducer
