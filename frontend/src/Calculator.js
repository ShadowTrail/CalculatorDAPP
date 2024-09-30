import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { Button, TextField, Grid2, Typography, Paper } from "@mui/material";
import AddContract from "./contracts/AdditionOperation.json";
import SubtractContract from "./contracts/SubtractionOperation.json";
import MultiplyContract from "./contracts/MultiplicationOperation.json";
import DivideContract from "./contracts/DivisionOperation.json";
import ModulusContract from "./contracts/ModulusOperation.json";

const Calculator = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [web3, setWeb3] = useState(null);
  const [contracts, setContracts] = useState({});

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const web3Instance = new Web3(
          Web3.givenProvider || "http://localhost:8545"
        );
        setWeb3(web3Instance);
        await loadContracts(web3Instance);
      } catch (err) {
        setError("Failed to initialize Web3: " + err.message);
      }
    };

    const loadContracts = async (web3Instance) => {
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
          "0x5253D3c312756D1c28ed5F1e8EDC49548786c203"
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
    };

    initWeb3();
  }, [web3]); // Add web3 as a dependency

  const handleCalculate = async (operation) => {
    const number1 = parseInt(num1);
    const number2 = parseInt(num2);

    if (isNaN(number1) || isNaN(number2)) {
      setError("Please enter valid numbers");
      return;
    }

    setError("");

    try {
      let calculationResult;

      switch (operation) {
        case "ADD":
          calculationResult = await contracts.add.methods
            .calculate(number1, number2)
            .call();
          break;
        case "SUBTRACT":
          calculationResult = await contracts.subtract.methods
            .calculate(number1, number2)
            .call();
          break;
        case "MULTIPLY":
          calculationResult = await contracts.multiply.methods
            .calculate(number1, number2)
            .call();
          break;
        case "DIVIDE":
          calculationResult = await contracts.divide.methods
            .calculate(number1, number2)
            .call();
          break;
        case "MODULO":
          calculationResult = await contracts.modulus.methods
            .calculate(number1, number2)
            .call();
          break;
        default:
          setError("Unknown operation");
          return;
      }

      setResult(calculationResult);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Calculator
      </Typography>
      <Grid2 container spacing={11}>
        <Grid2 item xs={6}>
          <TextField
            label="Number 1"
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            fullWidth
          />
        </Grid2>
        <Grid2 item xs={6}>
          <TextField
            label="Number 2"
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            fullWidth
          />
        </Grid2>
        <Grid2 item xs={12}>
          {error && <Typography color="error">{error}</Typography>}
          {result && (
            <Typography variant="h6">Result: {String(result)}</Typography>
          )}
        </Grid2>
      </Grid2>
      <Grid2 container spacing={2} style={{ marginTop: "20px" }}>
        {["ADD", "SUBTRACT", "MULTIPLY", "DIVIDE", "MODULO"].map(
          (operation) => (
            <Grid2 item xs={3} key={operation}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleCalculate(operation)}
              >
                {operation}
              </Button>
            </Grid2>
          )
        )}
      </Grid2>
    </Paper>
  );
};

export default Calculator;
