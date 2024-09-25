import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { Button, TextField, Grid, Typography, Paper } from "@mui/material";
import AddContract from "./contracts/AdditionOperation.json";
import SubtractContract from "./contracts/SubtractionOperation.json";
import MultiplyContract from "./contracts/MultiplicationOperation.json";
import DivideContract from "./contracts/DivisionOperation.json";
import ModulusContract from "./contracts/ModulusOperation.json";
import PercentageContract from "./contracts/PercentageOperation.json";

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
        case "PERCENTAGE":
          calculationResult = await contracts.percentage.methods
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
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Number 1"
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Number 2"
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          {error && <Typography color="error">{error}</Typography>}
          {result && (
            <Typography variant="h6">Result: {String(result)}</Typography>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        {["ADD", "SUBTRACT", "MULTIPLY", "DIVIDE", "MODULO", "PERCENTAGE"].map(
          (operation) => (
            <Grid item xs={3} key={operation}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleCalculate(operation)}
              >
                {operation}
              </Button>
            </Grid>
          )
        )}
      </Grid>
    </Paper>
  );
};

export default Calculator;
