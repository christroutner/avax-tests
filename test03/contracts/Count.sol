/*
    A simple smart contract that increments a counter when called.
*/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Count {
    int private count = 0;

    function incrementCounter() public {
        count += 1;
    }

    function decrementCounter() public {
        count -= 1;
    }

    function getCount() public view returns (int) {
        return count;
    }
}