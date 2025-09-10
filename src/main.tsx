import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import { RouterProvider } from 'react-router/dom';
import { router } from './routes/Router.tsx';
import { store } from './redux/store/store.ts';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './components/theme-provider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster />
    <Provider store={store}>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
