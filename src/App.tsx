import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import './App.css'

const contractAddress = "0x41624D541489dDB9C8249feFF080d67B366B9dF0";

function App() {

  const [ hasWallet, setHasWallet ] = useState(false);
  const [ isWalletConnected, setIsWalletConnected ] = useState(false);

  const [ message, setMessage ] = useState("");
  const [currentGreeting, setCurrentGreeting] = useState("");

  async function connect() {
    await window.ethereum.request({ method: 'eth_requestAccounts' })  
    if (window.ethereum.isConnected() && window.ethereum.selectedAddress !== null) {
      setIsWalletConnected(true);
    }    
  }

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' })  
  }

  async function fetchGreeting() {
    if (typeof window.ethereum !== undefined || typeof window.ethereum !== "undefined") {

      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, Greeter.abi, provider);

      try {
        const data = await contract.greet();
        console.log("data:", data);
        setCurrentGreeting(data);

      } catch (error) {
        console.log('Error', error)
      }

    }
  }

  async function setGreeting() {
    if (!message) return;

    if (typeof window.ethereum !== undefined || typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const nonce = await signer.getNonce();

      const contract = new ethers.Contract(contractAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(message, { nonce });

      setMessage("");
      await transaction.wait();
      fetchGreeting();
    }
  }

  useEffect(() => {
    try {
      if (typeof window.ethereum !== "undefined" || typeof window.ethereum !== undefined) {
        setHasWallet(true)
        if (window.ethereum.selectedAddress !== null) {
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
      <div className="container">
        <div className="row">
          <h2>Transaction Logging</h2>
          <p>A blockchain proof of concept</p>
        </div>
        <div className="row">

          <div className="col-md-6 mb-3">
            <div className="card">
                {
                  hasWallet 
                    ? <>
                      {
                        isWalletConnected
                          ? <>
                          <input 
                            type="text" 
                            placeholder='Enter value' 
                            onChange={(e) =>  setMessage(e.target.value)}
                            value={message}
                            className="form-control mb-3"/>
                          <button 
                            className="btn btn-info mb-3"
                            onClick={setGreeting}>Set</button>

                          <button 
                            className="btn btn-success mb-3"
                            onClick={fetchGreeting}>Fetch</button>
                          </>
                          :
                          <button 
                            className="btn btn-primary mb-3"
                            onClick={connect}>Connect Wallet</button>
                      }
                    </>
                    : <div className="alert alert-warning" role="alert">
                      <strong>
                        <a href="https://metamask.io/download/">
                          Please install a Metamask Wallet</a>
                        </strong>
                    </div>                  
                }

                {/* Current Value stored on Blockchain */}
                <h2 className="greeting">Greeting: {currentGreeting}</h2>

            </div>
          </div>

          <div className="col-md-6">
            <div className="alert alert-primary" role="alert">              
              <p>
                <strong>
                The purpose of this demo is to showcase the feasibility of storing and retrieving business transactions in the blockchain.
                </strong>
              </p>
            </div>
            <div>
              <p className="read-the-docs">
                Pilmico Foods Corporation © 2023. All rights reserved.
              </p>
            </div>
          </div>

        </div>

      </div>

    </>
  )
}

export default App
