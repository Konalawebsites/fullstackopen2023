import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notification: null
}

const notificationSlicer = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification(state, action) {
      state.notification = action.payload
      return state
    },
    clearNotification(state) {
      state.notification = null
    }
  }
})

export const { setNotification, clearNotification } = notificationSlicer.actions
export default notificationSlicer.reducer

export const setNotificationTimeOut = (message, timeout) => {
  return async (dispatch) => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout)
  }
}
