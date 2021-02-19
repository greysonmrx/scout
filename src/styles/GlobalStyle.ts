import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    color: ${(props) => props.theme.colors.grey};
    background: ${(props) => props.theme.colors.background};
  }

  body, input, button {
    font: 400 16px Exo_2, sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
  }
`;
