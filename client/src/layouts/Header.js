import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import image from "./imgs/Logo.png";
import { BiUser } from "react-icons/bi";
const Header = () => {
  return (
    <Wrapper>
      <Logodiv>
        <Link to="/">
          <Logo alt="logo" src={image} />
        </Link>
        <Profilediv>
          <p>Profile</p>
          <BiUser />
          <Link to="/Login">
            <p>Sign in</p>
          </Link>
        </Profilediv>
      </Logodiv>
      <Navdiv>
        <Populardiv>
          <h2>Popular Stocks</h2>
        </Populardiv>
        <Trendingdiv>
          <h2>Trending Stocks</h2>
        </Trendingdiv>
      </Navdiv>
      <Breakline></Breakline>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: flex;
  flex-direction: column;
  height: 120px;
`;
const Logo = styled.img`
  height: 100px;
  width: 100px;
  cursor: pointer;
  opacity: 80%;
  :hover {
    opacity: 100%;
  }
  display: flex;
`;
const Logodiv = styled.div`
  margin-left: 50px;
  display: flex;
`;
const Navdiv = styled.div`
  display: flex;
  margin-left: 300px;
  width: 300px;
`;
const Populardiv = styled.div``;
const Trendingdiv = styled.div`
  padding-left: 20px;
`;
const Breakline = styled.div`
  height: 2px;
  width: 90%;
  background-color: #080708;
  margin-left: 70px;
  margin-top: 5px;
`;
const Profilediv = styled.div`
display: flex;
margin-left: 1070px;
margin-top: 50px;
font-size: 25px;

`
export default Header;
