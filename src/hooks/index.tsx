import React from 'react';

import { ToastProvider } from './toast';
import { AuthProvider } from './auth';
import { AdvancedSearchProvider } from './advancedSearch';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <AdvancedSearchProvider>{children}</AdvancedSearchProvider>
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;
