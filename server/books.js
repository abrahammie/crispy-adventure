const Gdax = require('gdax');
const publicClient = new Gdax.PublicClient();
const websocket = new Gdax.WebsocketClient(['BTC-USD', 'ETH-USD', 'ETH-BTC']);
const halp = require('./helpers.js');


// populate BTC-USD order book
let bitcoinBook = {
  asks: [],
  bids: [],
};

publicClient.getProductOrderBook('BTC-USD', { level: 2 }, (error, data) => {
  if (error) {
    console.log('Error retrieving BTC-USD order book:', error );
  } else {
    // create bitcoin book
    bitcoinBook.asks = JSON.parse(data.body).asks.slice(0, 25);
    bitcoinBook.bids = JSON.parse(data.body).bids.slice(0, 25);
  }
});

// populate ETH-USD order book
let etherBook = {
  asks: [],
  bids: [],
};

publicClient.getProductOrderBook('ETH-USD', { level: 2 }, (error, data) => {
  if (error) {
    console.log('Error retrieving ETH-USD order book:', error );
  } else {
    // create ether book
    etherBook.asks = JSON.parse(data.body).asks.slice(0, 25);
    etherBook.bids = JSON.parse(data.body).bids.slice(0, 25);
  }
});

// populate ETH-BTC order book
let etherBitcoinBook = {
  asks: [],
  bids: [],
};

publicClient.getProductOrderBook('ETH-BTC', { level: 2 }, (error, data) => {
  if (error) {
    console.log('Error retrieving ETH-BTC order book:', error );
  } else {
    // create ether-bitcoin book
    etherBitcoinBook.asks = JSON.parse(data.body).asks.slice(0, 25);
    etherBitcoinBook.bids = JSON.parse(data.body).bids.slice(0, 25);
  }
});


// start updating order book
websocket.on('message', data => {
  console.log(data);

  // if data.type open, order was filled, so delete from book
  if (data.type === 'open') {
    if (data.side === 'buy') {
      // search bitcoinBook[asks] for data.price(rounded to 2)

        // if found and order size matches
          // delete from array

        // if found but order size greater
          // decrement order size
        // if found but order size less
          // console.log('ERROR order size mismatch');
        // if not found
          // if order price NOT outside bounds of book
            // console.log('ERROR order price not found in book')

    } else if (data.side === 'sell') {
      // search bitcoinBook[bids] for data.price(rounded)
      // if found and order size matches
        // delete from array
      // if found but order size greater
        // decrement order size
      // if found but order size less
        // console.log('ERROR order size mismatch');
      // if not found
        // if order price NOT outside bounds of book
          // console.log('ERROR order price not found in book')

    }
  // if data.type done, order was cancelled, delete from book
  } else if (data.type === 'done') {


  // if data.type received, limit order received, add to book
  } else if (data.type === 'received') {
    // manage length of array, max 25


  // something else came through
  } else {
    console.log('UNEXPECTED DATA:', data);
  }

});

websocket.on('error', err => {
  console.log('GDAX websocket error:', err);
});
websocket.on('close', c => {
  console.log('Closed websocket:', c);
});


module.exports.bitcoinBook = bitcoinBook;
module.exports.etherBook = etherBook;
module.exports.etherBitcoinBook = etherBitcoinBook;
