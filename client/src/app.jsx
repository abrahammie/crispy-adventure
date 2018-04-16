import React from 'react';
import io from 'socket.io-client';
var socket = io();
import { Market } from './market.jsx';

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
      ETHasks: [],
      ETHbids: [],
      ETHBTCasks: [],
      ETHBTCbids: [],
    };
  };

  componentWillMount() {
    socket.on('topBTC', top => {
      this.setState({ BTCasks: top.asks },  () => {
      });
      this.setState({ BTCbids: top.bids }, () => {
      });
    });
    socket.on('topETH', top => {
      this.setState({ ETHasks: top.asks },  () => {
      });
      this.setState({ ETHbids: top.bids }, () => {
      });
    });
    socket.on('topETHBTC', top => {
      this.setState({ ETHBTCasks: top.asks },  () => {
      });
      this.setState({ ETHBTCbids: top.bids }, () => {
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

      <Market head={'BTC-USD'} asks={this.state.BTCasks} bids={this.state.BTCbids} decimal={2}/>
      <Market head={'ETH-USD'} asks={this.state.ETHasks} bids={this.state.ETHbids} decimal={2}/>
      <Market head={'ETH-BTC'} asks={this.state.ETHBTCasks} bids={this.state.ETHBTCbids} decimal={5}/>

      <div></div>
      <div></div>
      <div></div>
    </div>
    );
  };
};