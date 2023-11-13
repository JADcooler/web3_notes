import { expect } from "chai";
import { ethers, upgrades } from "hardhat";

describe("MyContract", function () {
  it("Test contract", async function () {
    const ContractFactory = await ethers.getContractFactory("MyContract");

    const initialOwner = (await ethers.getSigners())[0].address;

    const instance = await upgrades.deployProxy(ContractFactory, [initialOwner]);
    await instance.waitForDeployment();
  });
});
