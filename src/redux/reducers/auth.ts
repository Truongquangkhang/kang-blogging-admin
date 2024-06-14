import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { GetFromLocalStorageByKey, RemoveItemByKey, SetValueToLocalStorageWithKey } from '../../utils/local_storage'

interface IAuthState {
    isLogin: boolean
    accessToken?: string
    refreshToken?: string
}

const auth = GetFromLocalStorageByKey('auth')

const initialState: IAuthState = {
    isLogin: auth !== null,
    accessToken: auth !== null? auth.accessToken : null,
    refreshToken: auth !== null? auth.refreshToken : null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<IAuthState>) {
      state.isLogin = action.payload.isLogin
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      SetValueToLocalStorageWithKey("auth", {
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
      })
    },
    logOut(state) {
      state.isLogin = false
      state.accessToken = ""
      state.refreshToken = ""
      RemoveItemByKey('auth')
    }
  },
})

export const { setAuth, logOut } = authSlice.actions
export default authSlice.reducer