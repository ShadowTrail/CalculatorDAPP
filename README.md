Calculator DApp
This is a decentralized application (DApp) for performing basic arithmetic operations such as addition, subtraction, multiplication, division, percentage, and modulus using Solidity smart contracts. The DApp interacts with Ethereum blockchain via Web3.js to perform these calculations.

Features
Smart contracts deployed on Ethereum.
Supports operations like addition, subtraction, multiplication, division, percentage, and modulus.
Uses MetaMask for user authentication and transaction signing.
Results are displayed using Web3.js without the need for transactions.
Prerequisites
Node.js (v14 or later)
MetaMask extension installed in your browser.
Ethereum test network (e.g., Ropsten or Ganache for local development).
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/ShadowTrail/Calculator_DAPP.git
cd Calculator_DAPP
Install dependencies:

bash
Copy code
npm install
Compile the smart contracts:

bash
Copy code
npx hardhat compile
Deploy the contracts:

bash
Copy code
npx hardhat run scripts/deploy.js --network <network_name>
Usage
Start the local development server:

bash
Copy code
npm start
Open the application in your browser and connect your MetaMask account.

Select the arithmetic operation you want to perform and input the numbers.

Click the button to see the result, which is fetched from the smart contract.

Smart Contract Structure
Calculator.sol: Abstract contract containing base structure and a function calculate which other contracts inherit.
Addition.sol: Contract that performs addition operation.
Subtraction.sol: Contract that performs subtraction operation.
Multiplication.sol: Contract that performs multiplication operation.
Division.sol: Contract that performs division operation.
Percentage.sol: Contract that calculates percentage.
Modulus.sol: Contract that performs modulus operation.

Project Structure
contracts/: Contains all Solidity contracts.
scripts/: Deployment scripts.
src/: Front-end React components.

License
This project is licensed under the MIT License.