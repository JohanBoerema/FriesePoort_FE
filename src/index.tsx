import React from 'react'
import ReactDOM from 'react-dom'
import App from 'App/App'
import reportWebVitals from './reportWebVitals'
import { QueryClientProvider, QueryClient } from 'react-query'
import { HelmetProvider } from 'react-helmet-async'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider as ReduxProvider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { store } from './App/store'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './Styles/global.scss'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
})

let persistor = persistStore(store)

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </HelmetProvider>
      </PersistGate>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
