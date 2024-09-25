// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Calculator.sol";

/// @title Percentage Operation Implementation
/// @notice This contract implements percentage operation by overriding calculate function defined in the Calculator abstract contract.
contract PercentageOperation is Calculator {

    /// @inheritdoc Calculator
    function calculate(int256 a, int256 b) public pure override returns (int256) {
        require(b != 0, "Total must be greater than zero.");
        return (a / b) * 100;
    }
}