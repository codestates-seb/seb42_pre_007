import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  font-size: 100%;
  font: inherit;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}
  
ol,ul {
  list-style: none;
}

em {
  font-size: normal;
}

img {
  vertical-align: top;
  outline: none;
}

input,select,textarea,button {
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  background: none;
  border: none;
  border-radius: 0;
  margin: 0;
  padding: 0;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  background: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: white;
}

textarea {
  resize: none;
}

::placeholder {
  font: inherit;
}

a {
  text-decoration: none;
  color: inherit;
  }

a:visited {
  background: none;
  color:inherit;
  }
  
a:active {
  background: none;
  color:inherit;
  }
`;
