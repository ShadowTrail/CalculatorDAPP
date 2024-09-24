// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Calculator.sol";

/// @title Multiplication Operation Implementation
/// @notice This contract implements multiplication operation by overriding calculate function defined in the Calculator abstract contract.
contract MultiplicationOperation is Calculator {

    /// @inheritdoc Calculator
    function calculate(int256 a, int256 b) public view override returns (int256) {
        return a * b;
    }
}