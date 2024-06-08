import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUSerMetadata } from '../../interfaces/model/user_metadata'
import { GetFromLocalStorageByKey, RemoveItemByKey, SetValueToLocalStorageWithKey } from '../../utils/local_storage'

interface userState{
    user?: IUSerMetadata | null
} 

const user = GetFromLocalStorageByKey("user")

const initialState: userState ={
    user: user
}

const userSlice = createSlice({
  name: 'user',
  initialState ,
  reducers: {
    setUser(state, action: PayloadAction<IUSerMetadata>) {
        state.user = action.payload
        SetValueToLocalStorageWithKey("user", action.payload)
    },
    removeUser(state){
      state.user = null
      RemoveItemByKey('user')
    } 
  },
})

export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer