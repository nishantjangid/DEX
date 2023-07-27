
const hre = require("hardhat");

async function main() {

  const Token = await hre.ethers.deployContract("TOKENTESTB");

  await Token.waitForDeployment();

  console.log(
    `Token B Address ${Token.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
