import React from "react";
import styled from "styled-components";
import {
  FiInstagram,
  FiLinkedin,
  FiLink,
  FiHome,
  FiFacebook,
} from "react-icons/fi";
const Footer = () => {
  return (
    <Wrapper>
      <Breakline />
      <LogosContainer>
        <StyledFihome />
        <StyledFiLinkedin />
        <StyledFiInstagram />
        <StyledFiFacebook />
        <StyledFiLink />
      </LogosContainer>
    </Wrapper>
  );
};
const StyledFiLink = styled(FiLink)`
  cursor: pointer;
  transition: transform 1s ease-in 10ms;
  :hover {
    transform: scale(115%);
  }
`;

const StyledFiFacebook = styled(FiFacebook)`
  cursor: pointer;
  transition: transform 1s ease-in 10ms;
  :hover {
    transform: scale(115%);
  }
`;

const StyledFiInstagram = styled(FiInstagram)`
  cursor: pointer;
  transition: transform 1s ease-in 10ms;
  :hover {
    transform: scale(115%);
  }
`;

const StyledFiLinkedin = styled(FiLinkedin)`
  cursor: pointer;
  transition: transform 1s ease-in 10ms;
  :hover {
    transform: scale(115%);
  }
`;

const StyledFihome = styled(FiHome)`
  cursor: pointer;
  transition: transform 1s ease-in 10ms;
  :hover {
    transform: scale(115%);
  }
`;

const LogosContainer = styled.div`
  width: 400px;
  height: 70%;
  margin-left: 550px;
  margin-top: 5px;
  display: flex;
  font-size: 25px;
  align-items: center;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  height: 50px;
`;
const Breakline = styled.div`
  height: 2px;
  width: 90%;
  background-color: #080708;
  margin-left: 70px;
  margin-top: 10px;
`;
export default Footer;
