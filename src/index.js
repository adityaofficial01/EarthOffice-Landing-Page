import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import App from './App';

// Ant Design
import { ConfigProvider } from 'antd';

// React Toastify
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Redux and PersistGate
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';

// Custom Ant Design Theme
import { AntdThemeColors } from 'utils/AntdThemeStyle';

// Initialize Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 5, // Retry failed queries up to 5 times
      refetchOnReconnect: true, // Refetch when network reconnects
      staleTime: 60 * 60 * 1000, // Mark data as fresh for 60 minutes
      refetchOnWindowFocus: true, // Refetch when window regains focus
      refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    {/* Persist state across reloads */}
    <PersistGate loading={null} persistor={persistor}>
      {/* Query Client for TanStack Query */}
      <QueryClientProvider client={queryClient}>
        {/* Ant Design Theme */}
        <ConfigProvider theme={AntdThemeColors}>
          {/* Main App */}
          <App />
          {/* Toast Notifications */}
          <ToastContainer 
            closeOnClick={true} 
            autoClose={2000} 
            pauseOnFocusLoss 
            draggable 
          />
        </ConfigProvider>
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);
