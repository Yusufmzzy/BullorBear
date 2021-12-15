import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper>
      <Breakline></Breakline>
      
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  
  height: 50px;
`;
const Breakline = styled.div`
  height: 2px;
  width: 90%;
  background-color: #080708;
  margin-left: 70px;
  margin-top: 15px;
`;
export default Footer;