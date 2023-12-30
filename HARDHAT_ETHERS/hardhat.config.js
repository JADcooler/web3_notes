require("@nomicfoundation/hardhat-toolbox");

// import config before anything else
require('dotenv').config();
 

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
      forking: {
        url: "https://polygon-mainnet.infura.io/v3/" + process.env.API_KEY,
      }
    }
  }
};
