// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract dummyToken is ERC20, Ownable
{

    constructor() ERC20("DUMMY", "DUM") Ownable(msg.sender) {

    }

    function mint(uint256 amount) public
    {
        _mint(msg.sender, amount);
    }

}