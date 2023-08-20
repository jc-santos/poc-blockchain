import pkg from 'hardhat';
const { ethers } = pkg;

// const Greeter = await ethers.getContractFactory("Greeter");
// const greeter = await Greeter.deploy("Hello, Hardhat!");
// await greeter.waitForDeployment();

// console.log("Greeter deployed to:", await greeter.getAddress());

async function main() {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, Hardhat!");
    await greeter.waitForDeployment();
  
    console.log("Greeter deployed to:", await greeter.getAddress());
  }
  
  main()
    .then(() => process.exit())
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });