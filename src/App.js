import React, { Component } from 'react';
import Navbar from "./Nav"
import Web3 from 'web3';
import Color from './abis/Color.json'
import Main from './Main';


export default class App extends Component {
  // // component will mount
async componentWillMount(){
  await this.loadWeb3() 
  await this.loadBlockchainData()
}
// Load Web3
  async loadWeb3(){
    window.addEventListener('load', async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
          const web3 = window.web3
          // // load accounts
          const accounts = await web3.eth.getAccounts() // returns all the account in our wallet 
          console.log(accounts)

          // console.log("Window Ethereum Enabled")
      }
      // Legacy dapp browsers...
      else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider);
          
      }
      else {
          alert("Non-Ethereum browser detected. You should consider trying MetaMask!")
          console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
  });
  }

//   //  Load Blockchain Data
   async loadBlockchainData(){
    // console.log(SocialNetwork)
    window.web3 = new Web3(window.ethereum)
    const web3 = window.web3
//     // // load accounts
    const accounts = await web3.eth.getAccounts() // returns all the account in our wallet 
    this.setState({account:accounts[0]})
    // console.log(accounts)

//     // // detects the network dynamically 
    const networkId = await web3.eth.net.getId()

//     // // get network data
    const networkData = Color.networks[networkId]

    if(networkData){
      const ColorDapp = new web3.eth.Contract(Color.abi, networkData.address) // loads the smart contract
      console.log(ColorDapp)


      const colorCount = await ColorDapp.methods.totalSupply().call() 

      this.setState({ColorDapp}) // updates the state
      // this.setState({dapp_name}) // updates the state
      this.setState({colorCount})

//       // Load Posts
      for(var j=1; j <= colorCount; j++){
        const color = await ColorDapp.methods.colors(j - 1).call()
        this.setState({
          colors:[...this.state.colors, color]
        })
      }
      console.log({colors:this.state.colors})
//     
  }else {
          window.alert("Marketplace contract is not deployed to the network")
        }
}


createPost(title, content){
  
  // this.createPost = this.createPost.bind(this)
}
constructor(props) {
   super(props);
   this.state ={
    account:'',
    ColorDapp:'',
    colors:[],
    colorCount:0
   }
  }

  render() {
    return (
      <div>
        <Navbar 
        account={this.state.account}/>

        <Main 
        colors = {this.state.colors}
        // createPost = {this.createPost}
        account={this.state.account}
        ColorDapp= {this.state.ColorDapp}
        />

      </div>
    );
  }
}

    


//   render() {
//     return (

//     );
//   }
// }