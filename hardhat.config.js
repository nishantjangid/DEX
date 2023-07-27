require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
  	goerli: {
  		url: `${process.env.QUICKNODE_URL}`,
  		accounts: [`0x${process.env.PRIVATE_KEY}`]
  	}
  },
  etherscan:{
    apiKey : process.env.ETHERESCAN_API
  }
};
