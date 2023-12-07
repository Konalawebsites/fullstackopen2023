import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'LIKE':
    state = 'you liked a blog ! '
    return state
  case 'CREATE':
    state = 'you created a blog! '
    return state
  case 'DELETE':
    state = 'you deleted a blog ! '
    return state
  case 'ERROR1':
    state = 'ERROR: adding blog didnt pass thru ! :( '
    return state
  case 'ERROR2':
    state = 'ERROR: username and/or password wrong '
    return state
  case 'ERROR3':
    state = 'ERROR: liking blog didnt pass thru ! :( '
    return state
  case 'CLEAR':
    return null
  default:
    return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext