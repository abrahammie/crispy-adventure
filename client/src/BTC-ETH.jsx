import React from 'react';

export const BOTH = (props) => {
  return (
    <div className="card">
      <h5 className="card-header">BTC - ETH</h5>
      <div className="card-body">
        <small className="card-text">Bid 3</small><br/>
        <small className="card-text">Bid 2</small><br/>
        <strong className="card-title">Best ask</strong>
        <br/>
        <br/>
        <strong className="card-title">Best bid</strong><br/>
        <small className="card-text">Bid 2</small><br/>
        <small className="card-text">Bid 3</small>
      </div>
    </div>
  );
};