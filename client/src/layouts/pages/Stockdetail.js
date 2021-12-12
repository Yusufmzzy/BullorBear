import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";

const Stockdetail = () => {
  const { symbol } = useParams();
  const [stockDetail, setStockDetail] = useState(null);
  const [insightDetails, setInsightDetails] = useState(null);
  useEffect(() => {
    fetch(`/api/quotes/${symbol}`)
      .then((res) => res.json())
      .then((data) => setStockDetail(data.data.quoteSummary.result[0].price));
  }, [symbol]);
  console.log(stockDetail);
  useEffect(() => {
    fetch(`/api/getInsights/${symbol}`)
      .then((res) => res.json())
      .then((data) =>
        setInsightDetails(data.data.finance.result.instrumentInfo)
      );
  }, [symbol]);
  console.log(insightDetails);
  return !stockDetail ? (
    <p>Loading...</p>
  ) : (
    <>
      <Wrapper>
        <StockdetailContainer>
          <H1 style={{ fontSize: "33px" }}>
            {stockDetail.longName}
            <Pricewrapper>
              {stockDetail.regularMarketPrice.fmt}
              {stockDetail.currencySymbol}
            </Pricewrapper>
          </H1>
          <P>Currency: {stockDetail.currency}</P>
          <P>Currency symbol: {stockDetail.currencySymbol}</P>
          <H3>regular market price: {stockDetail.regularMarketPrice.fmt}</H3>
          <H3>
            regular market change percent:{" "}
            <PersentDiv
              style={
                stockDetail.regularMarketChangePercent.raw > 0
                  ? { backgroundColor: "#27a300" }
                  : { backgroundColor: "#ff0000" }
              }
            >
              {stockDetail.regularMarketChangePercent.fmt}
            </PersentDiv>
          </H3>

          <H3>regular market volume: {stockDetail.regularMarketVolume.fmt}</H3>
          <H3>regular market Change: {stockDetail.regularMarketChange.fmt}</H3>
          <P>Regular market day open: {stockDetail.regularMarketOpen.fmt}</P>
          <P>Regular market day high: {stockDetail.regularMarketDayHigh.fmt}</P>
          <P>Regular market day low: {stockDetail.regularMarketDayLow.fmt}</P>
          <P>
            Regular market previous close:{" "}
            {stockDetail.regularMarketPreviousClose.fmt}
          </P>
          <P>post market price: {stockDetail.postMarketPrice.fmt}</P>
          <P>post market change: {stockDetail.postMarketChange.fmt}</P>
          <P>
            post market change percent:{" "}
            {stockDetail.postMarketChangePercent?.fmt}
          </P>
          <Break />
          <P>Exchange: {stockDetail.exchangeName}</P>
          <P>Market state: {stockDetail.marketState}</P>
          <P>Market cap: {stockDetail.marketCap.fmt}</P>
          <P>
            10 days average volume: {stockDetail.averageDailyVolume10Day.fmt}
          </P>
          <P>
            90 days average volume: {stockDetail.averageDailyVolume3Month.fmt}
          </P>

          <P>post market source: {stockDetail.postMarketSource}</P>
          <P>price hint: {stockDetail.priceHint.fmt}</P>
          <P>Quote type: {stockDetail.quoteType}</P>
        </StockdetailContainer>
        <InsightDetailscontainer></InsightDetailscontainer>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StockdetailContainer = styled.div`
  border-right: 1px black solid;
  height: 95%95cm;
  width: 500px;
`;
const InsightDetailscontainer = styled.div`
  height: 85%;
  width: 500px;
`;
const Break = styled.div`
  height: 1px;
  width: 100%;
  background-color: black;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const PersentDiv = styled.div`
  height: 25px;
  width: 60px;
  align-items: center;
  justify-content: center;
  display: flex;
  color: white;
  border-radius: 5px;
  margin-left: 5px;
`;
const H3 = styled.h3`
  width: 100%;
  display: flex;
  align-items: center;
  height: 25px;
`;
const P = styled.p`
  height: 22px;
`;
const H1 = styled.h1`
  margin-bottom: 10px;
  display: inline-flex;
`;
const Pricewrapper = styled.div`
  margin-left: 130px;
  
`;
export default Stockdetail;
