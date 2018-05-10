const Gdax = require('gdax');
const publicClient = new Gdax.PublicClient();
const websocket = new Gdax.WebsocketClient(['BTC-USD', 'ETH-USD', 'ETH-BTC']);
const halp = require('./helpers.js');


let orders = {
  'BTC-USD': {},
  'ETH-USD': {},
  'ETH-BTC': {},
};

// populate BTC-USD order book
async function populateOrderBooks() {
  let ordersBTC = publicClient.getProductOrderBook('BTC-USD', { level: 2 })
  let ordersBTCETH = publicClient.getProductOrderBook('ETH-BTC', { level: 2 })
  let ordersETH = publicClient.getProductOrderBook('ETH-USD', { level: 2 })

  let btcResult = await ordersBTC;
  orders['BTC-USD'].asks = btcResult.asks.slice(0, 25);
  orders['BTC-USD'].bids = btcResult.bids.slice(0, 25);

  let ethBtcResult = await ordersBTCETH;
  orders['ETH-BTC'].asks = ethBtcResult.asks.slice(0, 25);
  orders['ETH-BTC'].bids = ethBtcResult.bids.slice(0, 25);

  let ethResult = await ordersETH;
  orders['ETH-USD'].asks = ethResult.asks.slice(0, 25);
  orders['ETH-USD'].bids = ethResult.bids.slice(0, 25);
};

// // populate ETH-USD order book
// publicClient.getProductOrderBook('ETH-USD', { level: 2 }, (error, data) => {
//   if (error) {
//     console.log('Error retrieving ETH-USD order book:', error );
//   } else {
//     // create ether book
//     orders['ETH-USD'].asks = JSON.parse(data.body).asks.slice(0, 25);
//     orders['ETH-USD'].bids = JSON.parse(data.body).bids.slice(0, 25);
//   }
// });

// // populate ETH-BTC order book
// publicClient.getProductOrderBook('ETH-BTC', { level: 2 }, (error, data) => {
//   if (error) {
//     console.log('Error retrieving ETH-BTC order book:', error );
//   } else {
//     // create ether-bitcoin book
//     orders['ETH-BTC'].asks = JSON.parse(data.body).asks.slice(0, 25);
//     orders['ETH-BTC'].bids = JSON.parse(data.body).bids.slice(0, 25);
//   }
// });
// }


populateOrderBooks().then(() => {
  // start updating order book
  websocket.on('message', data => {
    console.log(data);

    // if data.type open, order was filled, so delete from book
    if (data.type === 'open') {
      if (data.side === 'buy') {
        // todo
      } else if (data.side === 'sell') {
        // todo
      }

    // if data.type done and order was cancelled, delete from book
    } else if (data.type === 'done' && data.reason === 'cancelled') {
      if (data.side === 'sell') {
        // orders[data.product_id].asks = halp.removeFromAsks(orders[data.product_id].asks, [data.price, data.size, 1]);
      } else if (data.side === 'buy') {
        // orders[data.product_id].bids = halp.removeFromBids(orders[data.product_id].asks, [data.price, data.size, 1]);
      }

      // if matching order comes in, remove from opposite book

    } else if (data.type === 'match') {
      if (data.side === 'buy') {
        // remove from asks of appropriate book
        // orders[data.product_id].asks = halp.removeFromAsks(orders[data.product_id].asks, [data.price, data.size, 1]);
      } else if (data.side === 'sell') {
        // orders[data.product_id].bids = halp.removeFromBids(orders[data.product_id].asks, [data.price, data.size, 1]);
      }

    // if data.type received and limit order received, add to book (order_type: market also exists)
    } else if (data.type === 'received' && data.order_type === 'limit') {
      if (data.side === 'buy') {
        // add to bids of appropriate book
        orders[data.product_id].bids = halp.addToBids(orders[data.product_id].bids, [data.price, data.size, 1]);
      } else if (data.side === 'sell') {
        // add to asks of appropriate book
        orders[data.product_id].asks = halp.addToAsks(orders[data.product_id].asks, [data.price, data.size, 1]);
      }

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
});

module.exports.orders = orders;
