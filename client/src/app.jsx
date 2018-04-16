import React from 'react';
import io from 'socket.io-client';
var socket = io();
import { BTC } from './BTC.jsx';
import { ETH } from './ETH.jsx';
import { BOTH } from './BTC-ETH.jsx';
// import { Market } from './market.jsx';

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
      BTCasks: [],
      BTCbids: [],
    };
  };

  componentWillMount() {
    socket.on('topBTC', top => {
      this.setState({ BTCasks: top.asks },  () => {
        console.log('top asks:', this.state.BTCasks);
      });
      this.setState({ BTCbids: top.bids }, () => {
        console.log('top bids:', this.state.BTCbids);
      });
    });
  }


  render() {
    return (
    <div style={style.gridContainer}>
      <div></div>
      <div></div>
      <div></div>
      {/*
        this.state.markets.forEach((m) => {
          <Market {...this.props} />
        })
      */}

      <BTC asks={this.state.BTCasks} bids={this.state.BTCbids} />
      <ETH {...this.props} />
      <BOTH {...this.props} />

      <div></div>
      <div></div>
      <div></div>
    </div>
    );
  };
};