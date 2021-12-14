import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import img from "../imgs/Bull.jpg";

const PopularStocks = () => {
  const { day_status } = useParams();
  const [recievedQuotes, setRecievedQuotes] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);
  let history = useHistory();

  selectedStock && history.push(`/Stockdetail/${selectedStock}`);
  useEffect(() => {
    fetch(`/api/getPopularStocks/${day_status}`)
      .then((res) => res.json())
      .then((data) => setRecievedQuotes(data.data?.finance.result[0].quotes));
  }, [day_status]);

  console.log(recievedQuotes);
  return !recievedQuotes ? (
    <p>Loading...</p>
  ) : (
    <Wrapper>
      {recievedQuotes?.map((ele) => (
        <EachQuoteContainer>
          <Thename
            style={{ fontSize: "25px" }}
            onClick={() => setSelectedStock(ele.symbol)}
          >
            {ele.longName}
          </Thename>
          <Thepercent
            style={
              day_status === "day_losers"
                ? { backgroundColor: "#ff0000" }
                : { backgroundColor: "#27a300" }
            }
          >
            {ele.regularMarketChangePercent.toFixed(2)} %
          </Thepercent>
          <Thepricediv>
            <h2 style={{width:"110px"}}>
              {ele.regularMarketPrice.toFixed(2)} {ele.currency}
            </h2>
          </Thepricediv>

          <Exchange>exchange: {ele.exchange}</Exchange>
        </EachQuoteContainer>
      ))}

      <img
        src={img}
        alt="Bull and bear"
        style={{
          width: "260px",
          height: "140px",
          marginLeft: "630px",
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;
const EachQuoteContainer = styled.div`
  height: 30px;
  width: 80%;
  border-bottom: 1px black solid;
  margin-left: 150px;
  margin-top: 10px;
  display: flex;
`;
const Thepercent = styled.p`
  width: 90px;
  border-radius: 5px;
  color: white;
  height: 25px;
  display: flex;
  align-items: center;
  font-size: 20px;
  box-shadow: 0 0 2px black;
  padding-left:3px ;
`;
const Thepricediv = styled.div`
  margin-left: 50px;
  font-size: 20px;
  box-shadow: 0 0 2px black;
  height: 25px;
  border-radius: 3px;
  color: black;
  padding-left:5px ;
`;
const Thename = styled.h1`
  :hover {
    transform: scale(105%);
    cursor: pointer;
  }
  width: 800px;
`;
const Exchange = styled.h3`
  margin-left: 50px;
  width: 200px;
`;
export default PopularStocks;
