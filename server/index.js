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
   asks: books.bitcoinBook.asks.slice(0, 3).reverse(),
   bids: books.bitcoinBook.bids.slice(0, 3),
  });
}, 500);

http.listen(port, () => console.log('Listening on:', port));
