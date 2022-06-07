const _ = require("lodash");
const Alpaca = require("@alpacahq/alpaca-trade-api");
const SMA = require("technicalindicators").SMA;

const start = "2022-05-17T00:00:00Z";
const end = "2022-05-17T23:59:59Z";

const tradeStart = "2022-05-17T00:00:00Z";
const tradeEnd = "2022-05-17T00:14:00Z";

const dateNow = new Date();
const minutesToAdd = 14;
const fiftenMinsEarlier = new Date(dateNow.getTime() - minutesToAdd * 60000);

const alpaca = new Alpaca({
  keyId: process.env.API_KEY,
  secretKey: process.env.SECRET_API_KEY,
  paper: true,
  usePolygon: false,
});

// To print Account details;
// alpaca.getAccount().then((account) => {
//   console.log("Current Account:", account);
// });
// // Calls GET /account/portfolio/history and returns portfolio history.
// alpaca
//   .getPortfolioHistory({
//     // date_start: Date,
//     // date_end: Date,
//     // period: '1M' | '3M' | '6M' | '1A' | 'all' | 'intraday',
//     // timeframe: '1Min' | '5Min' | '15Min' | '1H' | '1D',
//     date_start: start,
//     date_end: end,
//     period: "all",
//     timeframe: "1Min",
//     extended_hours: false,
//   })
//   .then((portfolioHist) => {
//     console.log("Portfolio History:", portfolioHist);
//   });

// get paginated trades. 15 mins max windows for free accounts
// async function getPaginatedTrades() {
//   let symbol = "TMF";
//   const trades = alpaca.getTradesV2(symbol, { dateNow, fiftenMinsEarlier  });
//   let data = [];
//   // Due to the pagination setup in the actual API, the SDK returns async generators
//   // for functions like getTradesV2. If you want to get results out of the generator
//   // it is recommend you use a for await loop like below.
//   if(trades.length > 0)
//   {
//     for await (const t of trades) {
//       data.push(t);
//     }
//   }

//   if(trades.length > 0){
//     console.log("Trades for TMF");
//     console.table(data.slice(0, 5));
//   }else{
//     console.log("No Trades was found for TMF");
//   }
// }
// console.log("DateNow",dateNow)
// console.log("15Mins earlier",fiftenMinsEarlier)
// getPaginatedTrades();

// get all watchlists
// alpaca.getWatchlists().then((response) => {
//   console.log(response)
// })

// get latest trades
// async function getLatestTrade(){
//   const trade = await alpaca.getLatestTrade('AAPL');
//   console.log(trade);
// }

// // getLatestTrade();
// async function getMultiTradesV2() {
//   const trades = await alpaca.getMultiTradesV2(["PFE", "SPY"], {
//     start: "2022-04-18T08:30:00Z",
//     end: "2022-04-18T08:45:00Z",
//     limit: 200, // default 1k
//   });
//   console.log(trades);
// }

// getMultiTradesV2();

async function getMultiQuotesAsyncV2() {
  const trades = await alpaca.getMultiQuotesAsyncV2(["PFE", "SPY"], {
        start: "2022-04-18T08:30:00Z",
        end: "2022-04-18T08:45:00Z",
        // limit: 200, // default 1k
      });
      console.log(trades);
}

getMultiQuotesAsyncV2();

// alpaca.getAccountActivities({activityTypes: any, // Any valid activity type
// until: Date,
// after: Date,
// direction: string,
// date: Date,
// pageSize: number,
// pageToken: string}).then((accountActivity) => {
//   console.log('Account:', accountActivity)
// })

let sma20, sma50;
let lastOrder = "SELL";

// async function initializeAverages() {
//   const initialData = await alpaca.getBars(
//     '1Min',
//     'SPY',
//     {
//       limit: 50,
//       until: new Date()
//     }
//   );

//   const closeValues = _.map(initialData.SPY, (bar) => bar.closePrice);

//   sma20 = new SMA({ period: 20, values: closeValues });
//   sma50 = new SMA({ period: 50, values: closeValues });

//   console.log(`sma20: ${sma20.getResult()}`);
//   console.log(`sma50: ${sma50.getResult()}`);
// }

// initializeAverages();

// const client = alpaca.data_ws;

// client.onConnect(() => {
//   client.subscribe(['alpacadatav1/AM.SPY']);
//   setTimeout(() => client.disconnect(), 6000*1000);
// });

// client.onStockAggMin((subject, data) => {
//   const nextValue = data.closePrice;

//   const next20 = sma20.nextValue(nextValue);
//   const next50 = sma50.nextValue(nextValue);

//   console.log(`next20: ${next20}`);
//   console.log(`next50: ${next50}`);

//   if (next20 > next50 && lastOrder !== 'BUY') {
//     alpaca.createOrder({
//       symbol: 'SPY',
//       qty: 300,
//       side: 'buy',
//       type: 'market',
//       time_in_force: 'day'
//     });

//     lastOrder = 'BUY';
//     console.log('\nBUY\n');
//   } else if (next20 < next50 && lastOrder !== 'SELL') {
//     alpaca.createOrder({
//       symbol: 'SPY',
//       qty: 300,
//       side: 'sell',
//       type: 'market',
//       time_in_force: 'day'
//     });

//     lastOrder = 'SELL';
//     console.log('\nSELL\n');
//   }
// });

// client.connect();
