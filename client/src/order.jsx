import React from 'react';

export const Order = (props) => {
  return (
    <div className="card-text">
      <p style={{ float: 'left', margin: 0 }}>{Number.parseFloat(props.price).toFixed(props.decimal)}</p>
      <p style={{ float: 'right', margin: 0 }}>{Number.parseFloat(props.size).toFixed(8)}</p>
      <div style={{ clear: 'both' }}></div>
    </div>
  );
};