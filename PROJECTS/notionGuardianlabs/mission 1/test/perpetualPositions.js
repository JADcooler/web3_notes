const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("Perpetual Positions test ", function () {
    let perp, tok

    before(async function () {
        let perpF = await ethers.getContractFactory("perpetuals")
        let tokF = await ethers.getContractFactory("dummyToken")
        tok = await tokF.deploy()
        perp = await perpF.deploy(await tok.getAddress() )

    })

    context("Liquidity ", () => {
        it("Should depositLiquidity", async function () {
            let amount = 10n*10n**18n
            await perp.depositLiquidity( amount , {value: amount } )
        })

        it("Should openPosition",async function () {
            let amount = 10n*10n**18n;
            await tok.approve(await perp.getAddress(), amount)
            await perp.openPosition(amount, 0);
        })

    })

})