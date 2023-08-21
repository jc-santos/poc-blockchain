import pkg from 'hardhat';
const { ethers } = pkg;


async function main() {
    const Logger = await ethers.getContractFactory("TransactionLogger");
    const logger = await Logger.deploy("Initial transaction data");
    await logger.waitForDeployment();
  
    console.log("Transaction Logger deployed to:", await logger.getAddress());
  }
  
  main()
    .then(() => process.exit())
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });