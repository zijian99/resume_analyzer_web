import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
body {
    
    box-sizing: border-box;
    // font-family: 'Poppins', sans-serif;
    // font-family: 'Courier New',sans-serif;
    font-family: 'Lato',sans-serif;
    // font-family: "Inter",sans-serif;
    // font-optical-sizing: auto;
    // font-weight: 100;
    // font-style: normal;
    
    // background-color:blue;

    margin: 0;
    padding: 0;
    box-sizing: border-box;
    
}

html {
    // overflow-y: scroll;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #cbcaca;
}

::-webkit-scrollbar-thumb {
  background: grey;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: grey;
}
`;


export default GlobalStyles;