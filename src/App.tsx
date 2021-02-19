import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { render } from 'react-dom';

import { GlobalStyle } from './styles/GlobalStyle';
import { defaultTheme } from './styles/theme';

import DefaultLayout from './layouts/Default';

import Routes from './routes';

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

const App: React.FC = () => {
  useEffect(() => {
    document.title = 'Scout';
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <DefaultLayout>
          <Routes />
        </DefaultLayout>
        <GlobalStyle />
      </ThemeProvider>
    </BrowserRouter>
  );
};

render(<App />, mainElement);
