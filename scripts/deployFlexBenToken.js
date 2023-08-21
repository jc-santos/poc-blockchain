import pkg from 'hardhat';
const { ethers } = pkg;

async function main() {
    const FlexBenToken = await ethers.getContractFactory("FlexBenToken");
    const flexbenToken = await FlexBenToken.deploy();
    await flexbenToken.waitForDeployment();
  
    console.log("FlexBen Token deployed to:", await flexbenToken.getAddress());
  }
  
  main()
    .then(() => process.exit())
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });