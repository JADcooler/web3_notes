// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract perpetuals 
{
    // This is gonna be a perpetual based on a collateral of an underlying token 
    // we're gonna get ETH in return
    // The Oracle is gonna deal with the exchange rate of USDC/ETH 

    // leverage till 20x


    // Add liquidity, Remove liquidity
    mapping(address liquidityProvider => uint256 liquidity) liquidityProviderLiquidity ;
    

    event DepositedLiquidity(uint256 amount);
    function depositLiquidity(uint256 amount ) public payable 
    {

        liquidityProviderLiquidity[msg.sender] += msg.value;

        if(msg.value > amount){
            (bool success, bytes memory returnData) = msg.sender.call{value: (msg.value - amount ) }("");
            require(success, string(returnData) );
        }

    }

    enum positions 
    {
        LONG,
        SHORT
    }

    struct Position {

        positions isShort;
        uint256 amount;

    }
    mapping(address trader => Position[] position) traderPosition;
    IERC20 collateralToken;

    constructor(address _collateralToken ){
        collateralToken = IERC20(_collateralToken);
    }

    // Open position
    function openPosition(uint256 amount, positions isShort) public 
    {
        require(collateralToken.allowance(msg.sender, address(this) ) >= amount , " require allowance " );
        traderPosition[msg.sender].push(Position({isShort: isShort, amount: amount}));
        console.log("length is ",traderPosition[msg.sender].length);

    }

    // Close position

    // Fetch Oracle price

    // Liquidate

}

    // steps

    // Add liquidity, Remove liquidity

    // Open position

    // Close position

    // Fetch Oracle price

    // Liquidate