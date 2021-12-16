import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import image from "../imgs/Crowd.jpg";
const TrendingStocks = () => {
  let history = useHistory();
  const { region } = useParams();
  const [trandingStocks, setTrandingStocks] = useState(null);
  useEffect(() => {
    fetch(`/api/getTrendingStocks/${region}`)
      .then((res) => res.json())
      .then((data) => setTrandingStocks(data.data.finance.result[0].quotes));
  }, [region]);
  return (
    <Wrapper>
      <Theimg src={image} />
      <TrendingStockContainer>
        <h1 style={{ fontSize: "25px" }}>{region} Market </h1>
        {trandingStocks?.map((ele) => (
          <Thequote
            style={{ fontSize: "20px" }}
            onClick={() => history.push(`/Stockdetail/${ele.symbol}`)}
          >
            {ele.symbol}
          </Thequote>
        ))}
      </TrendingStockContainer>
    </Wrapper>
  );
};
const Thequote = styled.p`
  :hover {
    transform: scale(110%);
  }
  cursor: pointer;
`;
const Theimg = styled.img`
  width: 1000px;
  height: 530px;
  box-shadow: 0 0 8px #f2f3f4;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TrendingStockContainer = styled.div`
  width: 160px;
  height: 530px;
  border: black solid 1px;
  position: absolute;
  margin-left: 820px;
  background-color: white;
  box-shadow: 0 0 8px white;
  border: none;
  border-radius: 5px;
  opacity: 75%;
  display: grid;
  justify-content: center;
  align-items: center;
`;
export default TrendingStocks;
