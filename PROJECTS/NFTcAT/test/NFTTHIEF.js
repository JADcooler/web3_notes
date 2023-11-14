const 
{
    expect
} = require("chai")
const { ethers } = require("hardhat")

//globals
let nftThief

describe("Can set Arbitrary token uri", function()
{
    before(async function(){
        const nftThiefFactory = await ethers.getContractFactory("Thief")
        nftThief = await nftThiefFactory.deploy()
    })

    context("Can set custom token uri", () => {
        it("Should work ", async function() {

            await nftThief.setTokenURI("YO wassup");
            let ret = await nftThief.tokenURI(1n);
            console.log(ret)
        })
        
    })
})
