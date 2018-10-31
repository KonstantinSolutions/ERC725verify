import React, { Component } from "react";
import getWeb3 from "./utils/getWeb3";

import Navigation from './components/Navigation'
import FormContainer from './components/FormContainer'
import Footer from './components/Footer'

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, network: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();


      const network = await web3.eth.net.getId();

      // Set web3, accounts, and contract to the state

      this.setState({ web3, accounts, network });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <Navigation network={this.state.network}/>
        <FormContainer web3={this.state.web3}/>
        <Footer />
      </div>
    );
  }
}

export default App;
