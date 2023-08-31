require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // solidity: "0.8.19",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true 
    },
},

  solidity: {
  
    compilers: [
      {
        version: "0.5.16",
      },
      {
        version: "0.6.6",
      },
      {
        version: "0.8.19",
        settings: {},
      },
    ],
  },
};
