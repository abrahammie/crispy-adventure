const express = require('express');
const path = require('path');
const Gdax = require('gdax');
const publicClient = new Gdax.PublicClient();
const websocket = new Gdax.WebsocketClient(['BTC-USD'], 'wss://ws-feed.gdax.com', null, {
    'channels': [
        'level2',
    ]
});

const app = express();

const port = process.env.PORT || 1999;

app.use(express.static(path.join(__dirname, '/../client/dist/')));

/*
websocket.on('message', data => {
  console.log(data);
});
websocket.on('error', err => {
  console.log(error);
});
websocket.on('close', () => {

});

publicClient.getProducts((error, response, data) => {
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
});
*/


app.listen(port, () => console.log('Listening on port', port));