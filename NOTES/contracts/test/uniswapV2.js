const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");
// const {deployContract} = waffle;

const abiRouter = require('../artifacts/contracts/uniswapv2/UniswapV2Router02.sol/UniswapV2Router02.json').abi;

describe("Uniswap V2", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.

  async function deployFactory() {
    
    // Contracts are deployed using the first signer/account by default
    const [owner, puppetOwner, player, player2] = await ethers.getSigners();

    //libraries
    const SafeMath =(await (await ethers.getContractFactory("SafeMath")).deploy())
    const Math =(await (await ethers.getContractFactory("Math")).deploy())
    // const UniswapV2Library = await (await ethers.getContractFactory("UniswapV2Library")).deploy()
    const UQ112x112 =(await (await ethers.getContractFactory("UQ112x112")).deploy())
    const UniswapV2OracleLibrary =(await (await ethers.getContractFactory("UniswapV2OracleLibrary")).deploy())
    
    // console.log("math is ", Math)

    // // const Lock = await ethers.getContractFactory("Lock");
    const Factory = await ethers.getContractFactory("UniswapV2Factory");
    const factory = await Factory.deploy(puppetOwner.address);

    const Weth = await ethers.getContractFactory("WETH9");
    const weth = await Weth.deploy();

    // console.log("FACTORY",await factory.getAddress())
    fa = await factory.getAddress();
    wa = await weth.getAddress();

    const routerFactory = await ethers.getContractFactory("UniswapV2Router02");
    const router = await routerFactory.deploy(
      fa,
      wa
    );

    return { owner, puppetOwner, player, player2,  factory, weth, router};

  }

  async function deployTokens() {

    const tokenA = await (await ethers.getContractFactory("TokenA")).deploy(
      "tokenA",
      "A"
    );

    const tokenB = await (await ethers.getContractFactory("TokenB")).deploy(
      "tokenB",
      "B"
    );

    return {tokenA, tokenB};
    
  }

  describe("Add liquidity (addLiquidity) ", function () {

    it("Should create pair if it doesn't exist ", async function () {
      const {owner, puppetOwner, player, player2,  factory, weth, router} = await loadFixture(deployFactory);
      const {tokenA, tokenB} = await loadFixture(deployTokens);

      tokenA.approve(await router.getAddress(), 10000000);
      tokenB.approve(await router.getAddress(), 10000000);

      allPairsArrayCount = await ethers.provider.getStorage(await factory.getAddress(), 3);
      expect(BigInt(allPairsArrayCount)).to.equal(0n);

      await router.addLiquidity(
        await tokenA.getAddress(),
        await tokenB.getAddress(),
        10000,
        10000,
        10,
        10,
        player.address,
        123123123123123123n
      );

      allPairsArrayCount = await ethers.provider.getStorage(await factory.getAddress(), 3);
      expect(BigInt(allPairsArrayCount)).to.equal(1n);

      expect(await factory.allPairs(0)).to.not.equal(0);


    });

    it("Should add liquidity with amount A Desired and amount B desired ", async function() {

      const {owner, puppetOwner, player, player2,  factory, weth, router} = await loadFixture(deployFactory);
      const {tokenA, tokenB} = await loadFixture(deployTokens);

      tokenA.approve(await router.getAddress(), 10000000);
      tokenB.approve(await router.getAddress(), 10000000);

      //first liquidity to add to the pair
      result = await router.addLiquidity(
        await tokenA.getAddress(),
        await tokenB.getAddress(),
        10000,
        1000,
        1000,
        1000,
        player.address,
        123123123123123123n //deadline
      );
      // const UniswapPairFactory = new ethers.ContractFactory(pairJson.abi, pairJson.bytecode, deployer);
      const UniswapPairFactory = await ethers.getContractFactory("UniswapV2Pair");
      //attach pair token to pair var
      uniswapExchange = await UniswapPairFactory.attach(
        await factory.getPair(await tokenA.getAddress() ,await tokenB.getAddress())
    );

      liquidity = await uniswapExchange.balanceOf(await player.getAddress());

      expect(liquidity).to.equal(BigInt(Math.floor(Math.sqrt(10000*1000) - 1000)))

      result = await router.addLiquidity(
        await tokenA.getAddress(),
        await tokenB.getAddress(),
        1000,
        100,
        1000,
        100,
        player.address,
        123123123123123123n //deadline
      );
      

    });


    it("Should prefer amount A Desired even when amount B Desired is bigger ", async function() {

      const {owner, puppetOwner, player, player2,  factory, weth, router} = await loadFixture(deployFactory);
      const {tokenA, tokenB} = await loadFixture(deployTokens);

      tokenA.approve(await router.getAddress(), 10000000);
      tokenB.approve(await router.getAddress(), 10000000);

      //first liquidity to add to the pair
      result = await router.addLiquidity(
        await tokenA.getAddress(),
        await tokenB.getAddress(),
        10000,
        10000,
        1000,
        1000,
        player.address,
        123123123123123123n //deadline
      );

      const UniswapPairFactory = await ethers.getContractFactory("UniswapV2Pair");
      //attach pair token to pair var
      uniswapExchange = await UniswapPairFactory.attach(
        await factory.getPair(await tokenA.getAddress() ,await tokenB.getAddress())
    );

      let reserveA, reserveB
      [reserveA, reserveB,]  = await uniswapExchange.getReserves();
   
      amountADesired = 1000 //this reachable

      const Lib = await ethers.getContractFactory("UniswapV2Library2");
      const lib = await Lib.deploy();

      amountBOptimal = await lib.quote(amountADesired, reserveA, reserveB);
      console.log("amountBOptimal ",amountBOptimal)
      result = await router.addLiquidity(
        await tokenA.getAddress(),
        await tokenB.getAddress(),
        1000, //amountADesired
        2000,  //amountBDesired
        500, //amountAMin
        500,  //amountBMin
        player.address, //to
        123123123123123123n //deadline
      );
      

    });

  });
});
