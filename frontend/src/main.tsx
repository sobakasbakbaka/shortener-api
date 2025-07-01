import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@mantine/core/styles.css';
import { App } from '@/app/App.tsx';
import { AppThemeProvider, ReactQueryProvider } from '@/app/providers';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryProvider>
      <AppThemeProvider>
        <App />
      </AppThemeProvider>
    </ReactQueryProvider>
  </StrictMode>,
);
