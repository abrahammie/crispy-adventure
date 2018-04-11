const express = require('express');
const path = require('path');
const Gdax = require('gdax');
const publicClient = new Gdax.PublicClient();
const websocket = new Gdax.WebsocketClient(['BTC-USD']/*, 'wss://ws-feed.gdax.com', null, {
    'channels': [
        'level2',
    ]
}*/);

const app = express();

const port = process.env.PORT || 1999;

app.use(express.static(path.join(__dirname, '../client/dist')));

websocket.on('message', data => {
  console.log(data);
});
websocket.on('error', err => {
  console.log(err);
});
websocket.on('close', () => {

});

/*
publicClient.getProducts((error, response, data) => {
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
});
*/



// get product order book (level 2 - top 50 bids and asks)
  // ==> what's an appropriate data structure to save order book, binary search tree? will have to be searching, adding and removing sorted entries.

// listen on gdax websocket and make any changes to order book

// open local websocket

// subscribe client to live updates of top 5 from order book

  // ==> need to save and update more than top 5. what if cancellations knock out top 5? if we're not saving enough historical open bids data will be undefined or inaccurate (only based on new orders that are streaming in)




app.listen(port, () => console.log('Listening on port', port));