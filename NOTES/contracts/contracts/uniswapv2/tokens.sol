// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenA is ERC20
{
    constructor(string memory _name, string memory _sym) ERC20(_name , _sym)
    {
        _mint(msg.sender, type(uint256).max);
    }

}

contract TokenB is ERC20
{
    constructor(string memory _name, string memory _sym) ERC20(_name , _sym)
    {
        _mint(msg.sender, type(uint256).max);
    }

}