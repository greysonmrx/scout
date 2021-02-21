import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { render } from 'react-dom';
import { Helmet } from 'react-helmet';

import { GlobalStyle } from './styles/GlobalStyle';
import { defaultTheme } from './styles/theme';

import DefaultLayout from './layouts/Default';

import Routes from './routes';

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

const App: React.FC = () => (
  <BrowserRouter>
    <ThemeProvider theme={defaultTheme}>
      <Helmet>
        <title>Scout</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;600;700;900&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <DefaultLayout>
        <Routes />
      </DefaultLayout>
      <GlobalStyle />
    </ThemeProvider>
  </BrowserRouter>
);

render(<App />, mainElement);
