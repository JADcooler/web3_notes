// https://docs.ethers.org/v5/api/
// checkout
const { toUtf8Bytes, toUtf8String } = require("@ethersproject/strings");
const
    {
        expect, assert
    } = require("chai")
const { ethers } = require("hardhat")

const {
    time

} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

const { EDIT_DISTANCE_THRESHOLD } = require("hardhat/internal/constants");
const { Contract } = require("hardhat/internal/hardhat-network/stack-traces/model");
//globals
let nftThief

describe("NFT Thief Tests", function () {
    before(async function () {
        const nftThiefFactory = await ethers.getContractFactory("Thief")
        nftThief = await nftThiefFactory.deploy()
    })

    context("Can set custom token uri", () => {
        it("Should work ", async function () {

            await nftThief.setTokenURI("YO wassup");
            let ret = await nftThief.tokenURI(1n);
            console.log(ret)
        })

    })

    // A Provider in ethers is a read-only abstraction to access the blockchain data.
    // Coming from Web3.js?

    //ACCOUNT METHODS
    context("ACCOUNT METHODS ", () => {

        it("Should getBalance ", async function () {

            x = await ethers.provider.getBalance(await nftThief.getAddress())
            console.log("[Balance] Contract : ", x)
        })

        it("Should getCode ", async function () {

            x = await ethers.provider.getCode(await nftThief.getAddress())
            console.log("[Code] Contract : ", x.slice(0, 50), " ...")
        })

        it("Should getStorage ", async function () {

            x = await ethers.provider.getStorage(await nftThief.getAddress(), 0)
            console.log("[Storage] Storage 0 : ", x)
        })

        it("Should getTransactionCount ", async function () {

            x = await ethers.provider.getTransactionCount(await nftThief.getAddress())
            console.log("[Tx count] TransactionCount : ", x)
        })

    })

    // Blocks Methods

    context("Blocks Methods", () => {

        it("Should getBlock ", async function () {

            x = await ethers.provider.getBlock(0)

            console.log(x)

        })

        it("Should getBlockWithTransactions ", async function () {

            // x = await ethers.provider.getBlockWithTransactions(await time.latestBlock())
            // assert.fail("doesnt ", "work ", "bruh");
            //fail
            // todo with a live network

        })



    })

    context("ENS ", () => {

        it("Should getResolver", async function () {
            provider1 = ethers.getDefaultProvider()
            resolver = await provider1.lookupAddress("0x6fC21092DA55B392b045eD78F4732bff3C580e2c");
            console.log("[ENS] ", resolver)

        })

        it("Should resolveName", async function () {

            provider2 = new ethers.getDefaultProvider()


            resolver = await provider2.resolveName("ricmoo.eth");
            console.log("[ENS] ", resolver)


            //SKIPPED EnsResolver methods
            // https://docs.ethers.org/v5/api/providers/provider/#EnsResolver

        })
    })

    context("Logs Methods", () => {
        it("Should getNetwork", async function () {

            //infure 
            provider2 = ethers.getDefaultProvider("arbitrum");
            networkis = await provider2.getNetwork("homestead");
            console.log("[provider2 NETWORK] ", networkis.toJSON());

            //get set network
            networkis = await ethers.provider.getNetwork("goerli");
            console.log("[homestead NETWORK] ", networkis.toJSON());

        })

        it("Should getBlockNumber", async function () {

            blockNo = await ethers.provider.getBlockNumber();
            console.log("[BLOCK] ", blockNo);

            provider2 = ethers.getDefaultProvider("matic");
            blockNo2 = await provider2.getBlockNumber();
            console.log("[provider 2 BLOCK] ", blockNo2);

            //check fork (local node has latest block data) (Assume necessary modifications are made in hardhat config)
            blockNo3 = await ethers.provider.getBlockNumber();
            console.log("[forked 2 BLOCK] ", blockNo3);

        })

        it("Should getGasPrice", async function () {

            networkis = (await ethers.provider.getFeeData()).gasPrice;
            console.log("[GAS PRICE] ", networkis);

        })

        it("Should getFeeData", async function () {

            networkis = await ethers.provider.getFeeData();
            console.log("[FEE DATA] ", networkis);

        })
    })

    context("Transactions Methods", () => {

        it("Should call", async function () {

            await ethers.provider.call({
                to: await nftThief.getAddress()
                , data: "0xe0df5b6f000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000072"
            })

            // 0xe0df5b6f
            // 0000000000000000000000000000000000000000000000000000000000000020
            // 0000000000000000000000000000000000000000000000000000000000000001
            // 0000000000000000000000000000000000000000000000000000000000000072



            // Actual for a string call [Offset to actual data, length, actual data]
            // 0xf5b30904
            // 0000000000000000000000000000000000000000000000000000000000000020
            // 0000000000000000000000000000000000000000000000000000000000000001
            // 7300000000000000000000000000000000000000000000000000000000000000

            // My mistake
            // 0xe0df5b6f00000000000000000000000000000000000000000000000000000001
            // 00000000000000000000000000000000000000000000000000000000000000e1

            // and 

            // 0xe0df5b6f000000000000000000000000000000000000000000000000000000
            // 0000000000000000000000000000000000000000000000000000000000000001
            // 0000000000000000000000000000000000000000000000000000000000000001

            // So actually it would be 
            // 0xe0df5b6f
            // 0000000000000000000000000000000000000000000000000000000000000020
            // 0000000000000000000000000000000000000000000000000000000000000001
            // 0000000000000000000000000000000000000000000000000000000000000072 //ascii for d


        })

    })

    context("Events and logs", () => {
        it("Should get event emitted", async function () {


            deployer = (await ethers.getSigners())[1];
            console.log("deployer is ", deployer.address);

            
            //way 1 
            let nonceFilter = {
                address: await nftThief.getAddress(),
                topics: [
                    ethers.id("TokenSet(address,address,uint256)"),                    
                    '0x0000000000000000000000000000000000000000000000000000000000000017' //filter to indexed nonce as 23
                    
                ]

            }

            console.log("Filter is ", nonceFilter)

            ethers.provider.on(nonceFilter, (log, event) => {
                console.log("The first results are ");
                console.log(log);
                console.log(event);
            });
            

            await nftThief.setTokenURI("yolo");
            console.log(await nftThief.nonce());

        })
    })




})
