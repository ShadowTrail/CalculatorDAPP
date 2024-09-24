// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Calculator.sol";

/// @title Division Operation Implementation
/// @notice This contract implements division operation by overriding calculate function defined in the Calculator abstract contract.
contract DivisionOperation is Calculator {

    /// @inheritdoc Calculator
    function calculate(int256 a, int256 b) public view override returns (int256) {
        return a / b;
    }
}