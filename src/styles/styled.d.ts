import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      white: string;
      darkGrey: string;
      grey: string;
      lightGrey: string;
      blue: string;
      medium: string;
      green: string;
      orange: string;
      yellow: string;
      red: {
        enemy: string;
        error: string;
      };
      black: string;
      background: string;
    };
  }
}
