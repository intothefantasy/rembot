const config = require('../config.json');
const API = require('currency-conversion');
const moment = require('moment-timezone');

var currencyAPI = new API({
  access_key: process.env.CURRENCY_ACCESS_KEY,
  secure: true
});

function processResultsinArray(results) {
  let resultArray = [];
  let lastUpdateDateCurrency = moment().tz(config.timeZone).format(config.dbFormatDate);
  resultArray.push(lastUpdateDateCurrency);
  resultArray.push(results.quotes.USDMYR);
  let convertCurrencyJPY = results.quotes.USDMYR / results.quotes.USDJPY;
  resultArray.push(convertCurrencyJPY);
  let convertCurrencyAUD = results.quotes.USDMYR / results.quotes.USDAUD;
  resultArray.push(convertCurrencyAUD);
  let convertCurrencySGD = results.quotes.USDMYR / results.quotes.USDSGD;
  resultArray.push(convertCurrencySGD);
  let convertCurrencyTHB = results.quotes.USDMYR / results.quotes.USDTHB;
  resultArray.push(convertCurrencyTHB);
  let convertCurrencyTWD = results.quotes.USDMYR / results.quotes.USDTWD;
  resultArray.push(convertCurrencyTWD);
  let convertCurrencyCNY = results.quotes.USDMYR / results.quotes.USDCNY;
  resultArray.push(convertCurrencyCNY);
  console.log("Processed Result => " + JSON.stringify(resultArray));
  return resultArray;
}

module.exports = {
  getLatestUpdate: function(callback) {
    currencyAPI.live(config.currencyliveQuery, function(err, result) {
      if (err) {
        return console.log('Live Callback (Error): ' + JSON.stringify(err));
      }
      console.log('Live Callback (Result): ' + JSON.stringify(result));
      return callback(processResultsinArray(result));
    });
  },
  testCurrencyAPI: function() {
    currencyAPI.live(config.currencyliveQuery, function(err, result) {
      if (err) {
        return console.log('Live Callback (Error): ' + JSON.stringify(err));
      }
      console.log('Live Callback (Result): ' + JSON.stringify(result));
    });
  }
};
