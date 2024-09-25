// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Calculator.sol";

/// @title Addition Operation Implementation
/// @notice This contract implements addition operation by overriding calculate function defined in the Calculator abstract contract.
contract AdditionOperation is Calculator {

    /// @inheritdoc Calculator
    function calculate(int256 a, int256 b) public pure override returns (int256) {
        return a + b;
    }
}