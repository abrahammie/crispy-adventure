import React from 'react';

export const Order = (props) => {
  return (
    <div className="card-text">
      <p style={{ float: 'left', margin: 0 }}>{props.price}</p>
      <p style={{ float: 'right', margin: 0 }}>{props.size}</p>
      <div style={{ clear: 'both' }}></div>
    </div>
  );
};