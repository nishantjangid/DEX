# FOLDER STRUCTURE
- API folder have api in nodejs which have router
--- Three routing addLiquidity, removeLiquidity, mintToken

- Root have hardhat project which contract deployements

- You can find deployed contracts in API/contracts/index.js file

- If you want to deploy contract with your wallet just simple paste your private key in .env
and run command 
npx hardhat run --network goerli scripts/1_tokenA.js
npx hardhat run --network goerli scripts/2_tokenB.js
npx hardhat run --network goerli scripts/3_dex.js

# AFTER DEPLOYMENT
paste deployed address in API/contracts/index.js file.


# DEPLOYED SMART CONTRACT
TOKEN A
https://goerli.etherscan.io/address/0xa6e14722140d9c8Ad77Adf8f351257533fB966AE#writeContract

TOKEN B
https://goerli.etherscan.io/address/0xEaAb0fBA310F465Ff3B3E99b0ff42F0905F5Ea80

DEX 
https://goerli.etherscan.io/address/0x370a3Ed6de15536F5C3A7e504CfBB3EBe47d3A13#code

// IF YOU HAVE ANY QUERY RELATED TO INTEGRATION PLEASE CONTACT ME
nishantsharam39262@gmail.com




