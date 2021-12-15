import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { UserContext } from "./Context/UserContext";
import { WatchListContext } from "./Context/watchListContext";
import image from "../imgs/Oldmarket.jpg";
import { FiX } from "react-icons/fi";
const Profile = () => {
  let history = useHistory();
  const { currentUser } = useContext(UserContext);
  const { userWatchList } = useContext(WatchListContext);
  //   const [deleteOne, setDeleteOne] = useState(null);
  !currentUser && history.push("/Login");
  const deletethatOne = (symbol) => {
    fetch("/api/deleteWatchList", {
      method: "DELETE",
      body: JSON.stringify({
        username: currentUser.username,
        symbol: symbol,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
//   console.log(deleteOne);
  return (
    <Wrapper
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <Container>
        <UserContainer>
          <h1>Username: {currentUser?.username}</h1>
          <h2>BULL&BEAR ID: {currentUser?._id}</h2>
          <h3>Email: {currentUser?.email}</h3>
        </UserContainer>
        <WatchlistContainer>
          <h1 style={{ fontSize: "25px", marginLeft: "8px" }}>
            Your watchlist:
          </h1>
          <div style={{ display: "flex" }}>
            {userWatchList?.map((ele) => (
              <>
                <EachSymbol
                  onClick={() => history.push(`/Stockdetail/${ele.symbol}`)}
                >
                  <Thep>{ele.symbol}</Thep>
                </EachSymbol>
                <StyledFiX
                  onClick={() => {
                    deletethatOne(ele.symbol);
                  }}
                />
              </>
            ))}
          </div>
        </WatchlistContainer>
      </Container>
    </Wrapper>
  );
};
const StyledFiX = styled(FiX)`
  font-size: 25px;
  :hover {
    transform: scale(110%);
  }
`;
const Thep = styled.p`
  :hover {
    transform: scale(108%);
  }
  color: #9d0208;
`;
const EachSymbol = styled.div`
  width: 60px;
  margin-top: 10px;
  font-size: 20px;
  margin-left: 10px;
  cursor: pointer;
  font-weight: bold;
`;
const WatchlistContainer = styled.div`
  height: 50%;
  width: 100%;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 0 0 8px black;
`;
const UserContainer = styled.div`
  width: 100%;
  height: 30%;
  margin-left: 50px;
  margin-top: 50px;
  display: grid;
  font-size: 25px;
`;

const Container = styled.div`
  width: 30%;
  height: 80%;
  border: black solid 2px;
  margin-right: 650px;
  background-color: white;
  opacity: 75%;
  box-shadow: 0 0 8px white;
  border: none;
  border-radius: 5px;
`;
export default Profile;
