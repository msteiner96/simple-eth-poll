import Head from 'next/head'
import Web3 from 'web3'
import { useState, useEffect } from 'react'
import { abi, contractAddress } from '../constants/abi';

export default function Home() {

  /**
   * States
   */
  const [contract, setContract] = useState(null) // Contract State
  const [address, setAddress] = useState(null) // Wallet Address State
  const [allHellos, setAllHellos] = useState(null) // All Hellos State
  const [bestHello, setBestHello] = useState(null) // Highest voted Hello State

  useEffect(() => {
    
    // Get eth accounts & contract
    window.ethereum ?
      ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
        setAddress(accounts[0])
        let w3 = new Web3(ethereum)
        let c = new w3.eth.Contract(abi, contractAddress)
        setContract(c)

        // Else throw error
      }).catch((err) => console.log(err))
      : console.log("Please install MetaMask")
  }, [])

  /**
   * Create a new hello string
   */
  function createHello() {
    contract.methods.CreateHello('Hello World').send({from:address})
  }

  /**
   * Get the hello with the most votes
   */
  function getHello() {
    contract.methods.GetHello().call().then(result => setBestHello(result))
  }

  /**
   * Get all submited hellos including their votings
   */
  function GetHelloListing() {
    contract.methods.GetHelloListing().call().then(result => setAllHellos(result))
  }

  // Markup
  return (
    <div>
      <Head>
        <title>Simple ETH Polling</title>
      </Head>

      <main>
        <h1>Hello</h1>
        <button onClick={createHello}>Create Hello!</button>
        <button onClick={getHello}>Get most voted Hello!</button>
        <button onClick={GetHelloListing}>Get all Hellos!</button>
      </main>

      <footer>
      </footer>
    </div>
  )
}
