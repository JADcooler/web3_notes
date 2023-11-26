// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Thief is ERC721, Ownable
{

    constructor() ERC721("THFFF", "TF") Ownable(msg.sender)
    {

    }

    mapping(address user => string custom_url) token_uri;

    function setTokenURI(string calldata url) external returns(uint256)
    {
        token_uri[msg.sender] = url;

        return uint256(uint160(msg.sender));

    }

    function tokenURI(uint256 ) public view override returns (string memory)
    {

        return token_uri[msg.sender];

    }


}