
const hre = require("hardhat");

async function main() {

  const Dex = await hre.ethers.deployContract("Dex");

  await Dex.waitForDeployment();

  console.log(
    `Dex Address ${Dex.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
