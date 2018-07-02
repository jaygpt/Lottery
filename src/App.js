import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
  constructor(props){
    super(props);
    this.state = { manager: ''};
    
  }
  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    // we don't needs to write from since mattamask is intelligent enough

    this.setState({manager: manager});
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
      </div>
      </div>
      
    );
  }
}

export default App;
