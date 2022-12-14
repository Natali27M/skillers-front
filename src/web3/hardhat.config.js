require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.17",
    networks : {
        goerli: {
            url: "https://eth-goerli.g.alchemy.com/v2/hcoV7p_ipzuRQ-SHbicjL5sOm54-t5IF",
            accounts: ['162126d0ed47f5daeb15d4fc186a463b296002379543a5f96f58577667a42c1e']
        }
    }
};
