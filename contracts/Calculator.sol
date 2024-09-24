// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title Abstract Calculator Contract
/// @notice This abstract contract defines basic operations that must be implemented by all the derived contracts.
abstract contract Calculator {
    /// @notice Performs any operation on two integers.
    function calculate(int256 a, int256 b) public view virtual returns (int256);
}
