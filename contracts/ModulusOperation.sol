// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Calculator.sol";

/// @title Modulus Operation
/// @notice This contract extends to handle modulus operation by overriding calculate function defined in the Calculator abstract contract.
contract ModulusOperation is Calculator {
    
    /// @inheritdoc Calculator
    function calculate(int256 a, int256 b) public pure override returns (int256) {
        require(b != 0 && b <= a, "Divisor should not be 0 or more than the dividend itself");
        return (a % b);
    }
}
