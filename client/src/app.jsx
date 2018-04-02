import React from 'react';
import { BTC } from './BTC.jsx';
import { ETH } from './ETH.jsx';
import { BOTH } from './BTC-ETH.jsx';

const style = {
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(3, 1fr)',
    gridGap: 10,
    margin: 20,
  },
};

export class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {

    };
  };

  render() {
    return (
    <div style={style.gridContainer}>
      <div></div>
      <div></div>
      <div></div>

      <BTC {...this.props} />
      <ETH {...this.props} />
      <BOTH {...this.props} />

      <div></div>
      <div></div>
      <div></div>
    </div>
    );
  };
};