require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    polygon_mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/Ze1r-qlqgkTnUSv1s_JhIfTq9lcWQItg",
      accounts: [`0x58cc9961aeedf981c19ed7f1cac644e5615062bd2fa7e8719431d2063e6d2914`]
    }
  }
};
