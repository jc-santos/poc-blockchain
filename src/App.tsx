import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import Logger from "./artifacts/contracts/TransactionLogger.sol/TransactionLogger.json";
import pilmicoLogo from "./assets/pilmico-logo.png";
import './App.css'

// JC HARDHAT LOCALHOST
// const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

// JC ALCHEMY ACCOUNT
// const contractAddress = "0x41624D541489dDB9C8249feFF080d67B366B9dF0";

// JC ABOITIZ ALCHEMY ACCOUNT
const contractAddress = "0xDee7055478A2D0004A685B3d080f0772a7Ae7f45";


function App() {

  const [ hasWallet, setHasWallet ] = useState(false);
  const [ isWalletConnected, setIsWalletConnected ] = useState(false);
  const [ walletAddress, setWalletAddress ] = useState("");

  const [ message, setMessage ] = useState("");
  const [currentGreeting, setCurrentGreeting] = useState("");

  async function connect() {
    await window.ethereum.request({ method: 'eth_requestAccounts' })  
    if (window.ethereum.isConnected() && window.ethereum.selectedAddress !== null) {
      let firstTwoChar = window.ethereum.selectedAddress.substring(0, 2);
      let lastFourChar = window.ethereum.selectedAddress.slice(-4);
      let shortenedWalletAddress = `${firstTwoChar}...${lastFourChar}`;
      setWalletAddress(shortenedWalletAddress);
      setIsWalletConnected(true);
    }    
  }

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' })  
  }

  async function fetchData() {
    if (typeof window.ethereum !== undefined || typeof window.ethereum !== "undefined") {

      const provider = new ethers.BrowserProvider(window.ethereum);
      // const contract = new ethers.Contract(contractAddress, Greeter.abi, provider);
      const contract = new ethers.Contract(contractAddress, Logger.abi, provider);

      try {
        // const data = await contract.greet();
        const data = await contract.fetchLoggedData();
        console.log("data:", data);
        setCurrentGreeting(data);

      } catch (error) {
        console.log('Error', error)
      }

    }
  }

  async function logData() {
    if (!message) return;

    if (typeof window.ethereum !== undefined || typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const nonce = await signer.getNonce();

      // const contract = new ethers.Contract(contractAddress, Greeter.abi, signer);
      const contract = new ethers.Contract(contractAddress, Logger.abi, signer);
      // const transaction = await contract.setGreeting(message, { nonce });
      const transaction = await contract.logData(message, { nonce });

      setMessage("");
      setCurrentGreeting("Proccessing your request, please wait...")
      await transaction.wait();
      fetchData();
    }
  }

  function resetGreeting() {
    setCurrentGreeting("");
  }

  useEffect(() => {
    try {
      if (typeof window.ethereum !== "undefined" || typeof window.ethereum !== undefined) {
        setHasWallet(true)
        if (window.ethereum.selectedAddress !== null) {
          let firstTwoChar = window.ethereum.selectedAddress.substring(0, 2);
          let lastFourChar = window.ethereum.selectedAddress.slice(-4);
          let shortenedWalletAddress = `${firstTwoChar}...${lastFourChar}`;
          setWalletAddress(shortenedWalletAddress);
          setIsWalletConnected(true);
        }
      }
    } catch (error) {

      setHasWallet(false);
      setIsWalletConnected(false);
    }

  }, [isWalletConnected, hasWallet])

  return (
    <>
        <header>
          <nav className="navbar navbar-expand-md fixed-top pilmico-background">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                <img src={pilmicoLogo} alt="Pilmico Logo" width="120"/>
              </a>
              <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="#">Home</a>
                  </li>
                </ul>
                <div>
                  {
                    hasWallet
                      ? <>
                        {
                          isWalletConnected
                            ? <a className="btn btn-outline-warning connect-wallet-button">
                              { walletAddress }</a>
                            : <button 
                              className="btn btn-primary connect-wallet-button"
                              onClick={connect}>Connect Wallet</button>
                        }
                        </>
                      : <a href="https://metamask.io/download/"
                        className="btn btn-outline-warning connect-wallet-button">
                        Please install a Metamask Wallet</a>
                  }
                </div>                  
              </div>
            </div>
          </nav>
        </header>  
        <main>
          <div className="container mt-5 main-wrapper">
            <div className="mb-5 mt-5"></div>
            <div className="row text-center">
              <h2>System Transaction Logging</h2>
              <p>
                <i>A blockchain proof of concept</i></p>
            </div>
            <div className="row">
              <div className="col-md-12">
                  <div className="alert alert-primary text-center" role="alert">              
                    <p>
                      <strong>
                      The purpose of this demo is to showcase the feasibility of storing and retrieving system transaction data in the blockchain.
                      </strong>
                    </p>
                  </div>
                </div>              
            </div>
            <div className="row">

              <div className="col-md-12 mb-3">
                {
                  hasWallet 
                    ? <>
                      {
                        isWalletConnected
                          ? <>
                            <textarea name="" 
                              id="" 
                              className="form-control mb-3" 
                              placeholder='Enter value' 
                              onChange={(e) => setMessage(e.target.value)}
                              value={message}></textarea>

                            <div>
                              <button 
                                className="btn btn-outline-primary mb-3 me-1"
                                onClick={logData}>Log Data</button>

                              <button 
                                className="btn btn-primary mb-3 me-1"
                                onClick={fetchData}>Fetch Logged Data</button>  

                              <button 
                                className="btn btn-secondary mb-3"
                                onClick={resetGreeting}>Reset</button>
                            </div>                            

                          </>
                          :
                          <div className="alert alert-warning text-center" role="alert">
                            <strong>Please connect your Metamask wallet</strong>
                          </div>
                      }
                    </>
                    : <div className="alert alert-warning text-center" role="alert">
                      <strong>Please install a Metamask wallet</strong>
                    </div>
                }

                {/* Current Value stored on Blockchain */}
                <p className="greeting">{currentGreeting}</p>
              </div>

            </div>

          </div>
          <div className="container">
            <div>
              <hr />
              <p className="text-center">
                Pilmico Foods Corporation © 2023. All rights reserved.
              </p>
            </div>
          </div>
        </main>
    </>
  )
}

export default App
