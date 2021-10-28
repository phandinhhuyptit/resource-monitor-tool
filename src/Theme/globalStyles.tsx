import { createGlobalStyle } from "styled-components";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const GlobalStyle = createGlobalStyle`
  html {
    overflow: hidden;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: Roboto,sans-serif;
    overflow: hidden;
    color: rgba(244,244,245,.9);
    background-color: rgb(31,34,37);
    background-attachment: fixed;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .notification-success{
  background-color: rgba(1,167,122,0.9) !important;
  }

  .notification-error{
    color: #FFFFFF!important;
  }

.notification {
  font-size: 12px !important;
  box-sizing: border-box;
  padding: 15px 15px 15px 58px;
  border: 1px solid #48f2c5;
  border-radius: 5px;
  color: #FFFFFF!important;
  box-shadow: none;
  cursor: pointer;
  line-height: 1.2em;
  position: relative;
  opacity: 0.9;
  margin-top: 25px;
  width: 400px;
  margin-left: auto;
  margin-right: auto;
  .title {
    color: #FFFFFF!important;
    font-size: 12px;
  }
}


.notification-container {
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%);
  width: 100%;
  color: #FFFFFF;
  
}

.notification {
  margin-top: 0px !important;
}
.notification-container {
  top: 80px !important;
  width: inherit !important;
}
  
`;

export default GlobalStyle;
