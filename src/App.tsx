import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { render } from 'react-dom';
import { Helmet } from 'react-helmet';

import { GlobalStyle } from './styles/GlobalStyle';
import { defaultTheme } from './styles/theme';

import AppProvider from './hooks';

import Routes from './routes';

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

const App: React.FC = () => {
  useEffect(() => {
    Yup.setLocale({
      mixed: {
        required: 'Este campo é obrigatório',
      },
      number: {
        min: 'Precisa ser maior ou igual a ${min}',
        max: 'Precisa ser menor ou igual a ${max}',
      },
    });
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <Helmet>
          <title>Scout</title>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
        </Helmet>
        <AppProvider>
          <Routes />
          <GlobalStyle />
        </AppProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

render(<App />, mainElement);
