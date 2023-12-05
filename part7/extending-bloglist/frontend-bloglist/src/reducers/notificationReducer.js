import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notification: null,
  isError: false
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
    },
    setError(state, action) {
      state.isError = action.payload
    },
  }
})

export const { setNotification, clearNotification, setError } = notificationSlicer.actions
export default notificationSlicer.reducer

export const setNotificationTimeOut = (message, timeout, isError) => {
  return async (dispatch) => {
    if (isError) {
      dispatch(setError(true))
    }
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
      dispatch(setError(false))
    }, timeout)
  }
}
