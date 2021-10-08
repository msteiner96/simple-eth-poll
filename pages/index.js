import Head from 'next/head'
import Web3 from 'web3'
import { useState, useEffect } from 'react'
import { abi, contractAddress } from '../constants/abi';
import { Button, Container, Row, Col, Table, InputGroup, FormControl } from 'react-bootstrap';

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
        getHelloListing(c)
        // Else throw error
      }).catch((err) => console.log(err))
      : console.log("Please install MetaMask")
  }, [])

  /**
   * Create a new hello string
   */
  function createHello(hello) {
    contract.methods.CreateHello(hello).send({ from: address })
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
  function getHelloListing(c) {
    c = c ?? contract
    c.methods.GetHelloListing().call().then(result => setAllHellos(result))
  }

  /**
   * Vote for a hello
   */
  function voteHello(hello) {
    contract.methods.VoteHello(hello).send({ from: address })
    getHelloListing();
  }

  // Markup
  return (
    <div>
      <Head>
        <title>Simple ETH Polling</title>
      </Head>

      <main>
        <Container>
          <Row>
            <h1>Hello World Voting!</h1>
            <InputGroup className="mb-3">
              <FormControl
                defaultValue="New Hello World"
                id="test"
              />
              <Button onClick={() => createHello(document.getElementById('test').value)} variant="outline-secondary">
                Create new!
              </Button>
            </InputGroup>
            </Row>
            <Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Message</th>
                  <th>Votes</th>
                </tr>
              </thead>
              <tbody>
                {allHellos ? allHellos.map((data, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{data[0]}</td>
                    <td>{data[1]}</td>
                    <td><Button onClick={() => voteHello(i)}>Vote!</Button></td>
                  </tr>
                )) : <tr></tr>}
              </tbody>
            </Table>
          </Row>
        </Container>
      </main>

      <footer>
      </footer>
    </div>
  )
}
