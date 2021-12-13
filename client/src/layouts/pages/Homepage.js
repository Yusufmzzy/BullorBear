import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import img from "../imgs/Wall.jpg";

const Homepage = () => {
  const [stockMarketsummary, setStockMarketsummary] = useState(null);
  const [stockNews, setStockNews] = useState(null);
  useEffect(() => {
    fetch("/api/getMarketSummary")
      .then((res) => res.json())
      .then((data) => setStockMarketsummary(data.data.marketSummaryResponse));
  }, []);
  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => setStockNews(data.data));
  }, []);
  console.log(stockNews);
  return !stockMarketsummary || !stockNews ? (
    <h1>Loading...</h1>
  ) : (
    <Wrapper>
      <SumaryDiv>
        <>
          {stockMarketsummary.result.map((ele) => (
            <Eachsumarydiv>
              <p>{ele.shortName}</p>

              <p>
                {ele.exchangeTimezoneName} {ele.regularMarketTime.fmt}
              </p>

              <h1>{ele.regularMarketPrice.fmt}</h1>

              <MarketpriceDIv
                style={
                  ele.regularMarketChangePercent.raw > 0
                    ? { backgroundColor: "#27a300" }
                    : { backgroundColor: "#ff0000" }
                }
              >
                <h1>{ele.regularMarketChangePercent.fmt}</h1>
              </MarketpriceDIv>
            </Eachsumarydiv>
          ))}
        </>
      </SumaryDiv>
      <Cotainer2>
        <Wallstrertimg alt="Wall street" src={img} />
        <Newscontainer>
          {stockNews.data.map((ele) => (
            <a href={ele.news_url} style={{textDecoration:"none", color:"black"}}>
              <SingleNewscontainer>
                <Newsimg alt="Newsimg" src={ele.image_url} />
                <ContantsContainer>
                  <h1>{ele.title}</h1>
                  <p>{ele.text}</p>
                  <p>{ele.date}</p>
                </ContantsContainer>
              </SingleNewscontainer>
           </a>
          ))}
        </Newscontainer>
      </Cotainer2>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 10px;
  display: flex;
`;
const SumaryDiv = styled.div`
  width: 25%;
  display: grid;
  height: 2300px;
  padding-left: 70px;
  border-right: 2px black solid;
`;
const Eachsumarydiv = styled.div`
  font-size: 20px;
  height: 50px;
  width: 200px;
  margin-bottom: 10px;
  cursor: pointer;
`;
const MarketpriceDIv = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  height: 30px;
  width: 75px;
  border-radius: 10px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wallstrertimg = styled.img`
  height: 150px;
  width: 350px;
  border-radius: 10px;
  transition: transform 1s ease-in 10ms;
  :hover {
    transform: scale(101%);
  }
`;
const Cotainer2 = styled.div`
  width: 60%;
  margin-left: 30px;
  display: grid;
  justify-content: space-between;
  height: 120px;
`;
const Newscontainer = styled.div`
  width: 90%;
`;
const Newsimg = styled.img`
  width: 210px;
  height: 110px;
`;
const SingleNewscontainer = styled.div`
  margin: 10px;
  height: 200px;
  display: flex;
  cursor: pointer;
`;
const ContantsContainer = styled.div`
  display: grid;
  height: 100%;
  margin-left: 10px;
`;
export default Homepage;
