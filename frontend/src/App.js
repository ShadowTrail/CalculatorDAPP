import React, { useState, useEffect } from "react";
import { Container, Snackbar, Alert } from "@mui/material";
import Web3 from "web3";
import Calculator from "./Calculator";
import AddContract from "./contracts/AdditionOperation.json";
import SubtractContract from "./contracts/SubtractionOperation.json";
import MultiplyContract from "./contracts/MultiplicationOperation.json";
import DivideContract from "./contracts/DivisionOperation.json";
import ModulusContract from "./contracts/ModulusOperation.json";

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
            "0x64a375aBd5aACfAc4abd0EE4cCB36B240E8850dB"
          ),
          subtract: new web3Instance.eth.Contract(
            SubtractContract.abi,
            "0x8dd383D0D5eCD46ABdDe3853604b67917D861a36"
          ),
          multiply: new web3Instance.eth.Contract(
            MultiplyContract.abi,
          ),
          divide: new web3Instance.eth.Contract(
            DivideContract.abi,
            "0x1bae7e65E160701ECdB8B3aD55e8E5D74311B5E3"
          ),
          modulus: new web3Instance.eth.Contract(
            ModulusContract.abi,
            "0x32940CacBfA4065BB555875e25d830F25BfAB39f"
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
