import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react';
import App from './App'
import axios from 'axios'

const promise = axios.get('http://localhost:3001/api/persons')
console.log(promise)

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
  <App /> 
  </StrictMode>
  );