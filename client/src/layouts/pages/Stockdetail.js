import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "./Context/UserContext";

const Stockdetail = () => {
  let history = useHistory();

  const { symbol } = useParams();

  const [stockDetail, setStockDetail] = useState(null);

  const [insightDetails, setInsightDetails] = useState(null);

  const { currentUser } = useContext(UserContext);

  const [similarStocks, setSimilarStocks] = useState(null);


  // selectedRecomand && history.push(`/Stockdetail/${selectedRecomand}`)

  useEffect(() => {
    fetch(`/api/quotes/${symbol}`)
      .then((res) => res.json())
      .then((data) => setStockDetail(data.data.quoteSummary.result[0].price));
  }, [symbol]);

  useEffect(() => {
    fetch(`/api/getInsights/${symbol}`)
      .then((res) => res.json())
      .then((data) =>
        setInsightDetails(data.data.finance.result.instrumentInfo)
      );
  }, [symbol]);

  useEffect(() => {
    fetch(`/api/getSimilarStocks/${symbol}`)
      .then((res) => res.json())
      .then((data) =>
        setSimilarStocks(data.data?.finance.result[0].recommendedSymbols)
      );
  }, [symbol]);

  return !stockDetail || !insightDetails ? (
    <p>Loading...</p>
  ) : (
    <>
      <Wrapper>
        <Recommendation>
          {similarStocks?.map((ele) => (
            <Therecomand
              onClick={() => history.push(`/Stockdetail/${ele.symbol}`)}
            >
              {ele.symbol}
            </Therecomand>
          ))}
        </Recommendation>
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
        {!insightDetails || !stockDetail ? (
          <p>Loading...</p>
        ) : (
          <InsightDetailscontainer>
            {currentUser ? (
              <>
                <p
                  style={{
                    fontSize: "25px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  Key technicals
                </p>
                <p>Provider: {insightDetails.keyTechnicals.provider}</p>
                <p>stopLoss: {insightDetails.keyTechnicals.stopLoss}</p>
                <p>support: {insightDetails.keyTechnicals.support}</p>
                <Break />
                <p
                  style={{
                    fontSize: "25px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  Technical events
                </p>
                <p>provider: {insightDetails.technicalEvents.provider}</p>
                <p>Short term: {insightDetails.technicalEvents.shortTerm}</p>
                <p>Mid term: {insightDetails.technicalEvents.midTerm}</p>
                <p>Long term: {insightDetails.technicalEvents.longTerm}</p>
                <Break />
                <p
                  style={{
                    fontSize: "25px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  Recommendation
                </p>
                <p>provider: {insightDetails.recommendation?.provider}</p>
                <p>Rating: {insightDetails.recommendation?.rating}</p>
                <p>
                  Target price: {insightDetails.recommendation?.targetPrice}
                </p>
                <Break />
                <p
                  style={{
                    fontSize: "25px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  Valuation
                </p>
                <p>provider: {insightDetails.valuation?.provider}</p>
                <p>Color: {insightDetails.valuation?.color}</p>
                <p>Description: {insightDetails.valuation?.description}</p>
                <p>Discount: {insightDetails.valuation?.discount}</p>
                <p>Relative value: {insightDetails.valuation?.relativeValue}</p>
              </>
            ) : (
              <p style={{ fontSize: "23px" }}>
                <Link to="/Login"> Sign</Link> in for more insight analysis.
              </p>
            )}
          </InsightDetailscontainer>
        )}
      </Wrapper>
    </>
  );
};
const Therecomand = styled.h2`
  cursor: pointer;
  :hover {
    transform: scale(107%);
  }
`;
const Recommendation = styled.div`
  width: 100px;
  height: 100%;
  border-right: 1px solid black;
  margin-right: 20px;
  display: grid;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StockdetailContainer = styled.div`
  border-right: 1px black solid;
  height: 95%;
  width: 500px;
`;
const InsightDetailscontainer = styled.div`
  height: 85%;
  width: 500px;
  margin-left: 25px;
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
