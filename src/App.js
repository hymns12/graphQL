import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [transfers, setTransfers] = useState([]);
  const QueryURL = "https://api.studio.thegraph.com/query/72140/spidy_of_lagos/version/latest";

  const client = new ApolloClient({
    uri: QueryURL,
    cache: new InMemoryCache()
  });
  const GET_TRANSFERS = gql`query{ 
    transfers(first: 5) {
      id
      sender
      receiver
      amount
    }
  }`;

  useEffect(() => {
    const fectechTransfers = async()=>{
      try{
        const {data} = await client.query({
          query: GET_TRANSFERS
        });
        setTransfers(data.transfers);
      }catch(error){
        console.error("error fectechTransfers", error);
      }
    };
      fectechTransfers();
      return()=>{};
  }, [client, GET_TRANSFERS]);

  return (
    <>
      <div>
        <h1>Connect Subgraph To A React Frontend with SpidyOfLagos</h1>
        {transfers !==null && transfers.length >0 && transfers.map((transfers) => (
          <div key={transfers.id}>
            <p>Sender: {transfers.sender}</p>
            <p>Receiver: {transfers.receiver}</p>
            <p>Amount: {transfers.amount}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App;