import React from "react";
import Wrapper from "./styles";

// eslint-disable-next-line react/prefer-stateless-function
const Spinner = () => {
  return (
    <Wrapper>
      <div className="loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </Wrapper>
  );
};

export default Spinner;
