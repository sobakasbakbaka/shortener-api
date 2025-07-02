import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  AppThemeProvider,
  ReactQueryProvider,
  AppRouter,
} from '@/app/providers';

import '@mantine/core/styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryProvider>
      <AppThemeProvider>
        <AppRouter />
      </AppThemeProvider>
    </ReactQueryProvider>
  </StrictMode>,
);
