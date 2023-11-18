const 
{
    expect, assert
} = require("chai")
const { ethers } = require("hardhat")

const {
    time
    
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
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

    // A Provider in ethers is a read-only abstraction to access the blockchain data.
    // Coming from Web3.js?

    //ACCOUNT METHODS
    context("ACCOUNT METHODS ", () => {
        
        it("Should getBalance ", async function() {

            x = await ethers.provider.getBalance(await nftThief.getAddress() )
            console.log("[Balance] Contract : ", x)
        })

        it("Should getCode ", async function() {

            x = await ethers.provider.getCode(await nftThief.getAddress() )
            console.log("[Code] Contract : ", x.slice(0,50), " ...")
        })

        it("Should getStorage ", async function() {

            x = await ethers.provider.getStorage(await nftThief.getAddress(), 0 )
            console.log("[Storage] Storage 0 : ", x )
        })
        
        it("Should getTransactionCount ", async function() {

            x = await ethers.provider.getTransactionCount(await nftThief.getAddress())
            console.log("[Tx count] TransactionCount : ", x )
        })
        
    })

    // Blocks Methods

    context("Blocks Methods", () => {

        it("Should getBlock ", async function(){

            x = await ethers.provider.getBlock(0)

            console.log(x)

        })

        it("Should getBlockWithTransactions ", async function(){

            // x = await ethers.provider.getBlockWithTransactions(await time.latestBlock())
            assert.fail("doesnt ", "work ", "bruh");
            //fail

        })



    })

    context("ENS ", () => {
        it("Should getResolver", async function (){

            resolver = await ethers.provider.lookupAddress("0x5555763613a12D8F3e73be831DFf8598089d3dCa");
            console.log("[ENS] ", resolver)

        })
    })

})
