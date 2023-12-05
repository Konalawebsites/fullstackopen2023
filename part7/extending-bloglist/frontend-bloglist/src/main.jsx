import ReactDOM from 'react-dom/client'
import App from './App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    blogs: blogReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    < App />
  </Provider>)
