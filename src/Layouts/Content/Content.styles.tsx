import styled from "styled-components";

export default styled.main`
  .loading-dashboard {
    width: 100vw;
    height: 100vh;
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;

    .loading-inner {
      text-align: center;
      font-family: "Oswald", sans-serif;
      color: #06aeee;
      font-size: 23px;
      text-transform: uppercase;
    }
  }

  // display: flex;
  // .main {
  //   width: calc(100% - 52px);
  //   height: calc(100% - 77px);
  // }
`;
