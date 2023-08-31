const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Uniswap V2", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.

  async function deployFactory() {

    // Contracts are deployed using the first signer/account by default
    const [owner, puppetOwner, player, player2] = await ethers.getSigners();

    //libraries
    const SafeMath = await (await (await ethers.getContractFactory("SafeMath")).deploy()).getAddress()
    const Math = await (await (await ethers.getContractFactory("Math")).deploy()).getAddress()
    const UniswapV2Library = await (await (await ethers.getContractFactory("UniswapV2Library")).deploy()).getAddress()
    const UQ112x112 = await (await (await ethers.getContractFactory("UQ112x112")).deploy()).getAddress()
    const UniswapV2OracleLibrary = await (await (await ethers.getContractFactory("UniswapV2OracleLibrary")).deploy()).getAddress()
    
    console.log("math is ", Math)

    // // const Lock = await ethers.getContractFactory("Lock");
    const Factory = await ethers.getContractFactory("UniswapV2Factory");
    const factory = await Factory.deploy(puppetOwner.address);

    const Weth = await ethers.getContractFactory("WETH9");
    const weth = await Weth.deploy();

    console.log("FACTORY",await factory.getAddress())
    fa = await factory.getAddress();
    wa = await weth.getAddress();

    const routerFactory = await ethers.getContractFactory("UniswapV2Router02");
    const router = await routerFactory.deploy(
      fa,
      wa
    );
    // factory = 2;
    // router = 3;
  //   // weth = 4;
  //   ,
  //   {
  //   libraries : {
  //     SafeMath: SafeMath,
  //     UniswapV2Library: UniswapV2Library,
  //     UniswapV2OracleLibrary: UniswapV2OracleLibrary,
  //     UQ112x112: UQ112x112
  //   }
  // }

    return { owner, puppetOwner, player, player2,  factory, weth, router};

  }

  describe("Add liquidity (addLiquidity) ", function () {

    it("Should create pair if it doesn't exist ", async function () {
      const {owner, puppetOwner, player, player2,  factory, weth, router} = await loadFixture(deployFactory);

      const tokenA = await (await ethers.getContractFactory("TokenA")).deploy(
        "tokenA",
        "A"
      );

      const tokenB = await (await ethers.getContractFactory("TokenB")).deploy(
        "tokenB",
        "B"
      );
      
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

    });

  //   it("Should set the right owner", async function () {
  //     const { lock, owner } = await loadFixture(deployOneYearLockFixture);

  //     expect(await lock.owner()).to.equal(owner.address);
  //   });

  //   it("Should receive and store the funds to lock", async function () {
  //     const { lock, lockedAmount } = await loadFixture(
  //       deployOneYearLockFixture
  //     );

  //     expect(await ethers.provider.getBalance(lock.target)).to.equal(
  //       lockedAmount
  //     );
  //   });

  //   it("Should fail if the unlockTime is not in the future", async function () {
  //     // We don't use the fixture here because we want a different deployment
  //     const latestTime = await time.latest();
  //     const Lock = await ethers.getContractFactory("Lock");
  //     await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
  //       "Unlock time should be in the future"
  //     );
  //   });
  // });

  // describe("Withdrawals", function () {
  //   describe("Validations", function () {
  //     it("Should revert with the right error if called too soon", async function () {
  //       const { lock } = await loadFixture(deployOneYearLockFixture);

  //       await expect(lock.withdraw()).to.be.revertedWith(
  //         "You can't withdraw yet"
  //       );
  //     });

  //     it("Should revert with the right error if called from another account", async function () {
  //       const { lock, unlockTime, otherAccount } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       // We can increase the time in Hardhat Network
  //       await time.increaseTo(unlockTime);

  //       // We use lock.connect() to send a transaction from another account
  //       await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
  //         "You aren't the owner"
  //       );
  //     });

  //     it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
  //       const { lock, unlockTime } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       // Transactions are sent using the first signer by default
  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).not.to.be.reverted;
  //     });
  //   });

  //   describe("Events", function () {
  //     it("Should emit an event on withdrawals", async function () {
  //       const { lock, unlockTime, lockedAmount } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw())
  //         .to.emit(lock, "Withdrawal")
  //         .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
  //     });
  //   });

  //   describe("Transfers", function () {
  //     it("Should transfer the funds to the owner", async function () {
  //       const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).to.changeEtherBalances(
  //         [owner, lock],
  //         [lockedAmount, -lockedAmount]
  //       );
  //     });
  //   });
  });
});
