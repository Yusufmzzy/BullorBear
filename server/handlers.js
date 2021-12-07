require("dotenv").config();
const { Api_KEY } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const axios = require("axios").default;

const getSingleQuote = (req, res) => {
  const { symbol } = req.params;
  const options = {
    method: "GET",
    url: `https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v11/finance/quoteSummary/${symbol}`,
    params: { modules: "summaryDetail,price" },
    headers: {
      "x-rapidapi-host": "stock-data-yahoo-finance-alternative.p.rapidapi.com",
      "x-rapidapi-key": Api_KEY,
    },
  };
  axios
    .request(options)
    .then((response) => {
      response && res.status(200).json({ status: 200, data: response.data });
    })
    .catch((error) => {
      res.status(404).json({ status: "Error", message: error });
    });
};
// "url": "https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v6/finance/autocomplete?query=appl&lang=en",
const getAutoComplete = (req, res) => {
  const { symbol } = req.query;
  const options = {
    method: "GET",
    url: "https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v6/finance/autocomplete",
    params: { query: symbol, lang: "en" },
    headers: {
      "x-rapidapi-host": "stock-data-yahoo-finance-alternative.p.rapidapi.com",
      "x-rapidapi-key": Api_KEY,
    },
  };
  axios
    .request(options)
    .then((response) => {
      response && res.status(200).json({ status: 200, data: response.data });
    })
    .catch((error) => {
      res.status(404).json({ status: "Error", message: error });
    });
};

const getInsights = (req, res) => {
  const { symbol } = req.params;
  const options = {
    method: "GET",
    url: "https://stock-data-yahoo-finance-alternative.p.rapidapi.com/ws/insights/v1/finance/insights",
    params: { symbol: symbol },
    headers: {
      "x-rapidapi-host": "stock-data-yahoo-finance-alternative.p.rapidapi.com",
      "x-rapidapi-key": Api_KEY,
    },
  };

  axios
    .request(options)
    .then((response) => {
      response && res.status(200).json({ status: 200, data: response.data });
    })
    .catch((error) => {
      res.status(404).json({ status: "Error", message: error });
    });
};

const getMarketSummary = (req, res) => {
  const options = {
    method: "GET",
    url: "https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v6/finance/quote/marketSummary",
    params: { region: "US", lang: "en" },
    headers: {
      "x-rapidapi-host": "stock-data-yahoo-finance-alternative.p.rapidapi.com",
      "x-rapidapi-key": Api_KEY,
    },
  };

  axios
    .request(options)
    .then((response) => {
      response && res.status(200).json({ status: 200, data: response.data });
    })
    .catch((error) => {
      res.status(404).json({ status: "Error", message: error });
    });
};

const getTrendingStocks = (req, res) => {
  const { region } = req.params;
  const options = {
    method: "GET",
    url: `https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v1/finance/trending/${region}`,
    headers: {
      "x-rapidapi-host": "stock-data-yahoo-finance-alternative.p.rapidapi.com",
      "x-rapidapi-key": Api_KEY,
    },
  };

  axios
    .request(options)
    .then((response) => {
      response && res.status(200).json({ status: 200, data: response.data });
    })
    .catch((error) => {
      res.status(404).json({ status: "Error", message: error });
    });
};

const getPopularStocks = (req, res) => {
  const { category } = req.params;
  const options = {
    method: "GET",
    url: "https://stock-data-yahoo-finance-alternative.p.rapidapi.com/ws/screeners/v1/finance/screener/predefined/saved",
    params: { scrIds: category, count: "10" },
    headers: {
      "x-rapidapi-host": "stock-data-yahoo-finance-alternative.p.rapidapi.com",
      "x-rapidapi-key": Api_KEY,
    },
  };
  axios
    .request(options)
    .then((response) => {
      response && res.status(200).json({ status: 200, data: response.data });
    })
    .catch((error) => {
      res.status(404).json({ status: "Error", message: error });
    });
};
const getSimilarStocks = (req, res) => {
  const { symbol } = req.params;
  const options = {
    method: "GET",
    url: `https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v6/finance/recommendationsbysymbol/${symbol}`,
    headers: {
      "x-rapidapi-host": "stock-data-yahoo-finance-alternative.p.rapidapi.com",
      "x-rapidapi-key": Api_KEY,
    },
  };
  axios
    .request(options)
    .then((response) => {
      response && res.status(200).json({ status: 200, data: response.data });
    })
    .catch((error) => {
      res.status(404).json({ status: "Error", message: error });
    });
};

module.exports = {
  getSingleQuote,
  getAutoComplete,
  getInsights,
  getMarketSummary,
  getTrendingStocks,
  getPopularStocks,
  getSimilarStocks,
};
