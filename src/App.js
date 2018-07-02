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
    balance: '',
    value: '',
    message: ''
  };
  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const Players = await lottery.methods.seeAllplayer().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    // we don't needs to write from since mattamask is intelligent enough

    this.setState({manager,Players,balance});
  }
 
onSubmit = async (event) => {
  event.preventDefault();
  const accounts = await web3.eth.getAccounts();
  this.setState({message: ' Waiting for transcation...'})
  await lottery.methods.enter().send({
    from: accounts[0],
    value: web3.utils.toWei(this.state.value, 'ether')
  });
  this.setState({message: ' Transcation is complete you are enter...'})
};

onClick = async () => {
  const accounts = await web3.eth.getAccounts();
  this.setState({message: 'Waiting for winner and transcation'})
  await lottery.methods.pickwinner().send({
    from: accounts[0]
  })
  this.setState({message: 'Transaction Complete'});
}


// another way to create a create a method is 
/*
OnSubmit(){
  this....
}
but in version of babel you can get rid of it
*/

  render() {

    //web3.eth.getAccounts().then(console.log);
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
        <hr />
        <form onSubmit = {this.onSubmit}>
        <h4>Want to test your luck </h4>
        <div>
          <label>Amount to be enter in pool </label>
          <input 
            value = {this.state.value}
            onChange = {event => this.setState({ value: event.target.value})}
          />
          <button>Enter</ button>
          </div>
        </form>
        <hr />
        <h1>{this.state.message}</h1>
        <hr />
        <h4> Pick Winner </h4>
        <button onClick = {this.onClick} >Pick The Winner</button>
      </div>
      </div>
      
    );
  }
}

export default App;
