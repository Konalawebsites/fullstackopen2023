import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notification: null
}

const notificationSlicer = createSlice({
  name: 'notifications', 
  initialState,
  reducers: {
    setNotification(state, action) {
      state.notification = action.payload;
      return state
    },
    clearNotification(state) {
      state.notification = null 
    }
}})

export const { setNotification, clearNotification } = notificationSlicer.actions
export default notificationSlicer.reducer