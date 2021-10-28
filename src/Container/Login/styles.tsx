import styled from "styled-components";

const LoginWrapper = styled.div`
  min-width: 1360px;
  height: 100vh;
  .background-image {
    width: 100%;
    height: 100vh;
    background-image: url("https://www2.deloitte.com/content/dam/Deloitte/global/Images/promo_images/gx-ccg-information-technology-risk-700x700.gif");
    background-position: center;
    background-repeat: inherit;
    background-attachment: inherit;
    background-size: cover;
  }
  .login-wrapper {
    width: 100%;
    height: 100vh;
    background-color: #ffff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .login {
    width: 100%;
  }
  .item {
    display: flex;
    justify-content: center;
  }
  .label {
    color: black;
    margin-bottom: 0px;
  }
  .forgot-password {
    float: right;
  }
  .row-button {
    justify-content: center;
    margin-top: 30px;
  }
  .sign-in {
    width: 100%;
    height: 50px;
    font-size: 17px;
    background: #2d3748;
    font-weight: 700;
    color: #ffffff;
    border-color: #2d3748;

    &:focus {
      border-color: #2d3748;
    }
    &:hover {
      border-color: #2d3748;
    }
  }
  .register {
    width: 100%;
    height: 50px;
    font-size: 17px;
    font-weight: 700;
    background: #04c35c;
    color: #ffffff;
    border-color: #04c35c;
    &:focus {
      border-color: #04c35c;
    }
    &:hover {
      border-color: #04c35c;
    }
  }
  .input-username {
    height: 40px;
  }
  .input-password {
    height: 40px;
  }

  .title-login {
    display: block;
    color: black;
    font-size: 24px;
    font-weight: 500;
    text-align: center;
    font-family: system-ui;
  }

  .footer {
    font-size: 14px;
    color: black;
    display: block;
  }
`;
export default LoginWrapper;
