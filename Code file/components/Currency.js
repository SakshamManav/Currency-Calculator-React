import React, { useContext, useEffect, useState } from "react";
import Currencycontext from "./currency/Currencycontext";
import './Currency.css'; // Make sure to import the CSS file

export default function Currency() {
  const [convert, setConvert] = useState("$myro");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const currencyData = useContext(Currencycontext);
  const { currencyRateFetching, currencyCode, currencyFetching, rateData } =
    currencyData;

  function handleChange(e) {
    currencyRateFetching(e.target.value.toLowerCase());
    currencyFetching();
  }

  function findResult() {
    let answer, currencyName;
    // eslint-disable-next-line
    Object.keys(rateData).map((key) => {
      if (key === convert) {
      let answer1 = value * rateData[key];
        
       answer = (answer1.toString().split(".")[0]) +  "." +  (answer1.toString().split(".")[1].slice(0,4));
      }
    });
    // eslint-disable-next-line
    Object.keys(currencyCode).map((currency)=>{
      if(currency===convert){
        currencyName = currencyCode[currency];
      }
      setResult(answer+ " "  +  currencyName);
    })
  }
  function handleChange2(e) {
    setConvert(e.target.value.toLowerCase());
  }

  function handleChange3(e) {
    setValue(e.target.value);
  }

  useEffect(() => {
    currencyFetching();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Currency Converter</h1>
        <div className="card-body">
        <label className="label">Amount</label>
          <input
            type="number"
            className="input"
            placeholder="Amount"
            aria-label="Currency"
            aria-describedby="addon-wrapping"
            onChange={handleChange3}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                findResult();
              }
            }}
          />
          <label className="label">From</label>
          <select
            onChange={handleChange}
            className="select"
            id="currency"
            name="currency"
          >
                      <option disabled selected>
              Select Currency
            </option>
            {Object.keys(currencyCode).map((country) => (
              <option key={country}>{country.toUpperCase()}</option>
            ))}
          </select>

          <div
            className="convert-button"
            onClick={findResult}
          >
            <i className="fa-solid fa-arrow-right-arrow-left"></i>
          </div>
          <label className="label">  To  </label>
          <select
            onChange={handleChange2}
            className="select"
            id="currency"
            name="currency"
          >
            <option disabled selected>
              Select Converting Currency
            </option>
            {Object.keys(currencyCode).map((country) => (
              <option key={country}>{country.toUpperCase()}</option>
            ))}
          </select>
        </div>

        <div className="result">
          <h2>{result}</h2>
        </div>
      </div>
    </div>
  );
}
