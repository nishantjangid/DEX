
const hre = require("hardhat");

async function main() {

  const Token = await hre.ethers.deployContract("TOKENTESTA");

  await Token.waitForDeployment();

  console.log(
    `Token A Address ${Token.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
