import React, { useState } from 'react';
import Currencycontext from './Currencycontext';

export default function Currencystate(props) {
    const [currencyCode, setcurrencyCode] = useState({
      "$myro": "",
    });
    const [rateData, setRateData] = useState({
      // "$myro": 0.0010137227,
    })
    // fetching api
    async function currencyRateFetching(country){
      let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${country}.json`;

        let response = await fetch(url);
        let data = await response.json();
        setRateData(data[country]);
        console.log(data[country]);
    }
async function currencyFetching(){
  const url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json"
  let response = await fetch(url);
  let data = await response.json();
  setcurrencyCode(data);
  console.log(currencyCode);
}
    // const [flagCode, setFlagCode] = useState("IN")    
// const flagUrl = `https://flagsapi.com/${flagCode}/flat/32.png`;

  return (
    <Currencycontext.Provider value={{currencyCode, setcurrencyCode ,currencyFetching, currencyRateFetching, rateData, setRateData}}>
        {props.children}
    </Currencycontext.Provider>
  )
}
