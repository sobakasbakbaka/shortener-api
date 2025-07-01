import { MantineProvider } from '@mantine/core';
import type { ReactNode } from 'react';

export const AppThemeProvider = ({ children }: { children: ReactNode }) => (
  <MantineProvider defaultColorScheme="dark">{children}</MantineProvider>
);
