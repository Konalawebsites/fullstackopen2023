import { createContext, useReducer } from 'react'

const initialUserState = {
  user: null, // You might store user information here when logged in
}

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {

  case 'SET_USER':
    return {
      ...state,
      user: action.payload.user,
    }
  case 'LOGOUT':
    return null

  default:
    return state
  }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null)

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext