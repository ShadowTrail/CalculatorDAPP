// 2_deploy_calculator.js

const Add = artifacts.require("AdditionOperation");
const Subtract = artifacts.require("SubtractionOperation");
const Multiply = artifacts.require("MultiplicationOperation");
const Divide = artifacts.require("DivisionOperation");
const Modulus = artifacts.require("ModulusOperation");
const Percentage = artifacts.require("PercentageOperation");

module.exports = async function (deployer) {
  try {
    await deployer.deploy(Add);
    await deployer.deploy(Subtract);
    await deployer.deploy(Multiply);
    await deployer.deploy(Divide);
    await deployer.deploy(Modulus);
    await deployer.deploy(Percentage);

    console.log("Contracts deployed successfully!");
  } catch (error) {
    console.error("Error deploying contracts:", error);
  }
};
