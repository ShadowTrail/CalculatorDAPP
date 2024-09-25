import React, { useState, useEffect } from "react";
import { Container, Snackbar, Alert } from "@mui/material";
import Web3 from "web3";
import Calculator from "./Calculator";
import AddContract from "./contracts/AdditionOperation.json";
import SubtractContract from "./contracts/SubtractionOperation.json";
import MultiplyContract from "./contracts/MultiplicationOperation.json";
import DivideContract from "./contracts/DivisionOperation.json";
import ModulusContract from "./contracts/ModulusOperation.json";
import PercentageContract from "./contracts/PercentageOperation.json";

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [contracts, setContracts] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const web3Instance = new Web3(
          Web3.givenProvider || "http://localhost:8545"
        );
        setWeb3(web3Instance);

        const contractInstances = {
          add: new web3Instance.eth.Contract(
            AddContract.abi,
            "0x7DBc0098D713b11db0AdD862540bD50595B5de95"
          ),
          subtract: new web3Instance.eth.Contract(
            SubtractContract.abi,
            "0x06cC2E5b45f849cd414140dbB6908098DFa3f925"
          ),
          multiply: new web3Instance.eth.Contract(
            MultiplyContract.abi,
            "0x59F5903bF23A048366668C41bb89a8CF6b6a85AD"
          ),
          divide: new web3Instance.eth.Contract(
            DivideContract.abi,
            "0x1ABb6DbaC5e46dE4D47798a3b09003000d9BD78F"
          ),
          modulus: new web3Instance.eth.Contract(
            ModulusContract.abi,
            "0x94167718974f347b283359F3E201206B1885B302"
          ),
          percentage: new web3Instance.eth.Contract(
            PercentageContract.abi,
            "0xBB47f1E1129DC30d2BB903183e3cd26152DF2510"
          ),
        };

        setContracts(contractInstances);
      } catch (err) {
        setError("Failed to connect to Web3 provider: " + err.message);
        console.error(err);
      }
    };

    initWeb3();
  }, [contracts]); // Add contracts as a dependency

  const handleCloseSnackbar = () => {
    setError("");
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      {error && (
        <Snackbar
          open={true}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
      {/* Passing web3 and contracts as props to Calculator */}
      <Calculator web3={web3} contracts={contracts} />
    </Container>
  );
};

export default App;
