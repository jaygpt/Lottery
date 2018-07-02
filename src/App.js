import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
  /* constructor(props){
    super(props);
    this.state = { manager: ''};
    
  } */
  state = {
    manager : '',
    Players : [],
    balance: ''
  };
  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const Players = await lottery.methods.seeAllplayer().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    // we don't needs to write from since mattamask is intelligent enough

    this.setState({manager,Players,balance});
  }
  
  render() {

    web3.eth.getAccounts().then(console.log);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Lottery App to try your Luck</h1>
        </header>
        <div>
        <p>This contract is managed by Jay Gupta(A/C: {this.state.manager})</p>
        <p>There are total {this.state.Players.length} Players</p>
        <p> With Total Balance In it {web3.utils.fromWei(this.state.balance, 'ether')} ether</p>
      </div>
      </div>
      
    );
  }
}

export default App;
