import React from 'react';
import { Order } from './order.jsx';

export const BTC = (props) => {
  return (
    <div className="card">
      <h5 className="card-header">BTC - USD</h5>
      <div className="card-body">
        {props.asks.map(ask => (
          <Order
            type="ask"
            key={ask[0]}
            price={ask[0]}
            size={ask[1]}
          />
        ))}
        <br/>
        {props.bids.map(bid => (
          <Order
            type="bid"
            key={bid[0]}
            price={bid[0]}
            size={bid[1]}
          />
        ))}
      </div>
    </div>
  );
};