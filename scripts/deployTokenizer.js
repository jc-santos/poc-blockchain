import pkg from 'hardhat';
const { ethers } = pkg;

async function main() {
    const Tokenizer = await ethers.getContractFactory("Tokenizer");
    const tokenizer = await Tokenizer.deploy("FlexBen Token", "FBT");
    await tokenizer.waitForDeployment();
  
    console.log("Tokenizer deployed to:", await tokenizer.getAddress());
  }
  
  main()
    .then(() => process.exit())
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });