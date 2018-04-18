const express = require('express');
const path = require('path');
const books = require('./books.js');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const port = process.env.PORT || 1999;

app.use(express.static(path.join(__dirname, '../client/dist')));


// websocket connection for client
io.sockets.on('connection', socket => {
  console.log('a user connected');
});

// disconnect
io.sockets.on('disconnect', socket => {
  console.log('a user disconnected');
});

// update client every 500 milli-seconds with topBTC orders
setInterval(() => {
  // get top three ask/bid
  io.sockets.emit('topBTC', {
   asks: books.orders['BTC-USD'].asks.slice(0, 3).reverse(),
   bids: books.orders['BTC-USD'].bids.slice(0, 3),
  });
}, 500);

// update client every 500 milli-seconds with topETH orders
setInterval(() => {
  // get top three ask/bid
  io.sockets.emit('topETH', {
   asks: books.orders['ETH-USD'].asks.slice(0, 3).reverse(),
   bids: books.orders['ETH-USD'].bids.slice(0, 3),
  });
}, 500);

// update client every 500 milli-seconds with topETHBTC orders
setInterval(() => {
  // get top three ask/bid
  io.sockets.emit('topETHBTC', {
   asks: books.orders['ETH-BTC'].asks.slice(0, 3).reverse(),
   bids: books.orders['ETH-BTC'].bids.slice(0, 3),
  });
}, 500);

http.listen(port, () => console.log('Listening on:', port));
