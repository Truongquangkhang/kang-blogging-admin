import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { INotify } from '../../interfaces/model/notify'

const initialState: INotify = {
    title: "",
    description: "",
    mustShow: false
}

const notifySlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    setNotify(state, action: PayloadAction<INotify>) {
      state.mustShow = action.payload.mustShow
      state.description = action.payload.description
      state.title = action.payload.title
    },
  },
})

export const { setNotify } = notifySlice.actions
export default notifySlice.reducer