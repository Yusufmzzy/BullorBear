const path = require("path");
const express = require("express");
const PORT = 8000;
const {
  getSingleQuote,
  getAutoComplete,
  getInsights,
  getMarketSummary,
  getTrendingStocks,
  getPopularStocks,
  getSimilarStocks,
  getNews,
} = require("./handlers");
const {
  createAnUser,
  userLogin,
  addWatchList,
  getTheWatchList,
  deleteFromWatchList,
} = require("./usersHandlers");
express()
  .use(express.json())
  .get("/api/quotes/:symbol", getSingleQuote) // stockDetailspage.
  .get("/api/autocomplete", getAutoComplete) // navBar.
  .get("/api/getInsights/:symbol", getInsights) // stockDetailspage.
  .get("/api/getMarketSummary", getMarketSummary) //left side of the website.
  .get("/api/getTrendingStocks/:region", getTrendingStocks) // Trending stocks.
  .get("/api/getPopularStocks/:category", getPopularStocks) // Popular stocks.
  .get("/api/getSimilarStocks/:symbol", getSimilarStocks) // Similar stocks(in Stock detail page).
  .post("/api/users", createAnUser) // create an user.
  .post("/api/login", userLogin) // create an user.
  .get("/api/news", getNews)
  .post("/api/addWatchList", addWatchList)
  .get("/api/getWatchlist/:username", getTheWatchList)
  .delete("/api/deleteWatchList", deleteFromWatchList)
  .listen(PORT, function () {
    console.info("🌍 Listening on port " + PORT);
  });
