import React, { Component } from "react";
import ChainFacesABI from "./contracts/ChainFacesABI.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, seedNumber: 42 };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();


      // Get the contract instance.
      // const networkId = await web3.eth.net.getId();s
      // const deployedNetwork = ChainFacesABI.networks[networkId];
      const contractAddress = "0x91047abf3cab8da5a9515c8750ab33b4f1560a7a";
      const instance = new web3.eth.Contract(
        ChainFacesABI,
        contractAddress,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  onSeedChange(value){
      this.setState({
           seedNumber: value
      });
  }

  createFace = async () => {
    const { accounts, contract } = this.state;
    console.log(this.state.seedNumber);
    // Stores a given value, 5 by default.
    await contract.methods.createFace(this.state.seedNumber).send({value: 8000000000000000, from: accounts[0]});
    // await contract.methods.createFace().then(function(instance) {
    // instance.deposit.sendTransaction(myData, {value: 8000000000000000, from: myAccount, to: instance.address});

    // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    // Update state with the result.
    // this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Create your very own Chain Face!</h1>
        <label>Seed Number: <input type="number" placeholder="42" onChange={e => this.onSeedChange(e.target.value)}></input></label>
        <button onClick={this.createFace}>Create Face</button>
        

        <h2>Good Luck!</h2>
      </div>
    );
  }
}

export default App;
