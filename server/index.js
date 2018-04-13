const express = require('express');
const path = require('path');
const Gdax = require('gdax');
const publicClient = new Gdax.PublicClient();
const websocket = new Gdax.WebsocketClient(['BTC-USD']/*, 'wss://ws-feed.gdax.com', null, {
    'channels': [
        'level2',
    ]
}*/);
const halp = require('./helpers.js');

const app = express();

const port = process.env.PORT || 1999;

app.use(express.static(path.join(__dirname, '../client/dist')));


// get BTC-USD order book
publicClient.getProductOrderBook('BTC-USD', { level: 2 }, (error, data) => {
  if (error) {
    console.log('Error retrieving BTC-USD order book:', error );
  } else {
    // create bitcoin book, and top bids/asks
    let bitcoinBook = data.body;
    let topBTCBid = bitcoinBook.bids[book.bids.length-1][0];
    let secondBTCBid = bitcoinBook.bids[book.bids.length-2][0];
    let thirdBTCBid = bitcoinBook.bids[book.bids.length-3][0];

    // once we have a static book we need to start updating it
    websocket.on('message', data => {
      halp.handleFeed(bitcoinBook, data);
    });
    websocket.on('error', err => {
      console.log('GDAX BTC websocket error:', err);
    });
  }
});




/*
websocket.on('message', data => {
  console.log(data);
});
websocket.on('error', err => {
  console.log('GDAX websocket error:', err);
});
websocket.on('close', c => {
  console.log('Closed websocket:', c);
});
*/


// get product order book (level 2 - top 50 bids and asks)
  // ==> what's an appropriate data structure to save order book, binary search tree? will have to be searching, adding and removing sorted entries.

// listen on gdax websocket and make any changes to order book

// open local websocket

// subscribe client to live updates of top 5 from order book

  // ==> need to save and update more than top 5. what if cancellations knock out top 5? if we're not saving enough historical open bids data will be undefined or inaccurate (only based on new orders that are streaming in)




app.listen(port, () => console.log('Listening on port', port));