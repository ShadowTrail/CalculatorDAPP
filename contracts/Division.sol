// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Calculator.sol";

/// @title Division Operation Implementation
/// @notice This contract implements division operation by overriding calculate function defined in the Calculator abstract contract.
contract DivisionOperation is Calculator {

    /// @inheritdoc Calculator
    function calculate(int256 a, int256 b) public pure override returns (int256) {
        require(b != 0, "Cannot divide by zero");
        require(b <= a, "Divisor cannot be greater than dividend to receive an integer result.");
        return a / b;
    }
}