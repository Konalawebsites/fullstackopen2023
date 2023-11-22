import ReactDOM from 'react-dom/client'
import App from './App'
import {
    BrowserRouter as Router
} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './context/NotificationContext'

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <NotificationContextProvider>
            <Router>
                <App />
            </Router>
        </NotificationContextProvider>
    </QueryClientProvider>
)