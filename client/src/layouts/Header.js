import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import image from "./imgs/Logo.png";
import { BiUser } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { UserContext } from "./pages/Context/UserContext";

const Header = () => {
  let history = useHistory();
  const [inputValue, setInputValue] = useState("");
  const handleChange = (ev) => {
    setInputValue(ev.target.value);
  };
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [recievedVlues, setRecievedVlues] = useState("");

  const [selectedStock, setSelectedStock] = useState(null);

  const [isDropped, setIsDropped] = useState(false);

  const [selectedPopular, setSelectedPopular] = useState(null);
  selectedPopular && history.push(`/PopularStocks/${selectedPopular}`);

  useEffect(() => {
    fetch(`/api/autocomplete?symbol=${inputValue}`)
      .then((res) => res.json())
      .then((data) => setRecievedVlues(data.data?.ResultSet.Result));
  }, [inputValue]);

  let searchRef = useRef();
  const handleClick = (symbol) => {
    setSelectedStock(symbol);
  };
  selectedStock && history.push(`/Stockdetail/${selectedStock}`);

  useEffect(() => {
    let handler = (ev) => {
      if (
        !searchRef.current.contains(ev.target) ||
        searchRef.current.contains(ev.target)
      ) {
        // console.log(ev.target);
        // console.log(searchRef.current.contains(ev.target));
        setInputValue("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const handleClicking = () => {
    setCurrentUser(null);
    sessionStorage.clear();
  };

  // let droppedRef = useRef();
  const handleDroppedDownClick = (ev) => {
    ev.stopPropagation();
    setIsDropped(!isDropped);
  };

  // useEffect(() => {
  //   let Droppedhandler = (ev) => {
  //     if (
  //       !droppedRef.current.contains(ev.target) ||
  //       droppedRef.current.contains(ev.target)
  //     ) {
  //       setIsDropped(false);
  //     }
  //     // console.log(ev.target);
  //     // console.log(droppedRef);
  //     // console.log(searchRef);
  //   };
  //   document.addEventListener("mousedown", Droppedhandler);
  //   return () => {
  //     document.removeEventListener("mousedown", Droppedhandler);
  //   };
  // }, []);

  
  return (
    <Wrapper>
      <Logodiv>
        <Link to="/">
          <Logo alt="logo" src={image} />
        </Link>
        <Profilediv>
          <SearchBarcontainer>
            <Inputdiv>
              <Searchbar
                placeholder="  Enter any stock or crypto symbol..."
                onChange={(ev) => handleChange(ev)}
              />
              <Fidiv>
                <FiSearch />
              </Fidiv>
            </Inputdiv>
            <SearchBarValuescontainer
              ref={searchRef}
              style={
                recievedVlues && recievedVlues.length > 0
                  ? { boxShadow: "0 0 3px grey", backgroundColor: "white" }
                  : null
              }
            >
              {recievedVlues
                ? recievedVlues.map((ele) => (
                    <ValueContainer
                      value={ele.symbol}
                      onClick={() => handleClick(ele.symbol)}
                    >
                      <h2>{ele.name}</h2>
                      <p style={{ color: "grey" }}>{ele.exchDisp}</p>
                    </ValueContainer>
                  ))
                : null}
            </SearchBarValuescontainer>
          </SearchBarcontainer>
          <Profilecontainer>
            {currentUser === null ? (
              <Link
                to="/Login"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Signin>Sign in</Signin>
              </Link>
            ) : (
              <>
                <StyledLink
                  to="/Profile"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <p style={{ cursor: "pointer" }}>Profile</p>
                  <BiUser />
                </StyledLink>
                <Logout onClick={() => handleClicking()}>Log out</Logout>
              </>
            )}
          </Profilecontainer>
        </Profilediv>
      </Logodiv>
      <Navdiv>
        <Populardiv>
          {/* // ref={droppedRef}
           > */}
          <TheOption
            onClick={(ev) => handleDroppedDownClick(ev)}
            onMouseEnter={() => setIsDropped(true)}
            onMouseLeave={() => {
              setIsDropped(false);
              setSelectedPopular(null);
            }}
          >
            Popular Stocks
          </TheOption>
          {isDropped && (
            <Buttondiv
              onMouseEnter={() => setIsDropped(true)}
              onMouseLeave={() => {
                setIsDropped(false);
                setSelectedPopular(null);
              }}
            >
              <Thebutton
                value="day_gainers"
                onClick={(ev) => setSelectedPopular(ev.target.value)}
              >
                Day gainers
              </Thebutton>
              <Thebutton
                value="day_losers"
                onClick={(ev) => setSelectedPopular(ev.target.value)}
              >
                Day losers
              </Thebutton>
            </Buttondiv>
          )}
        </Populardiv>
        <Trendingdiv>
          <TheOption>Trending Stocks</TheOption>
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
  margin-left: 700px;
  margin-top: 50px;
  font-size: 25px;
`;
const Searchbar = styled.input`
  margin-right: 5px;
  width: 300px;
  height: 30px;
  border: none;
  box-shadow: 0 0 2px grey;
  border-radius: 3px;
`;
const SearchBarcontainer = styled.div`
  position: absolute;
`;
const SearchBarValuescontainer = styled.div`
  max-height: 420px;
  width: 303px;
  position: relative;
`;
const Profilecontainer = styled.div`
  position: relative;
  margin-left: 400px;
  display: flex;
`;
const ValueContainer = styled.button`
  margin-top: 0;
  margin-left: 2px;
  width: 99%;
  max-height: 38px;
  align-items: center;
  font-size: 13px;
  cursor: pointer;
  background-color: white;
  border: none;
  :hover {
    transform: scale(101%);
    box-shadow: 0 0 3px grey;
  }
`;
const Fidiv = styled.div`
  margin-top: 3px;
`;
const Inputdiv = styled.div`
  display: flex;
`;
const Logout = styled.p`
  margin-left: 15px;
  cursor: pointer;
  :hover {
    transform: scale(108%);
  }
`;
const StyledLink = styled(Link)`
  display: flex;
  :hover {
    transform: scale(108%);
  }
`;
const Signin = styled.p`
  :hover {
    transform: scale(108%);
  }
`;
const TheOption = styled.h2`
  :hover {
    transform: scale(108%);
  }
  cursor: pointer;
`;
const Buttondiv = styled.div`
  width: 110px;
  height: 50px;
  box-shadow: 0 0 2px grey;
  position: absolute;
  background-color: white;
  margin-top: 3px;
`;
const Thebutton = styled.button`
  border: none;
  background-color: white;
  font-size: 18px;
  :hover {
    background-color: grey;
    color: white;
  }
  width: 110px;
`;
export default Header;
