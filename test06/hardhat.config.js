require('@nomicfoundation/hardhat-toolbox')

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.17',
  networks: {
    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      gasPrice: 225000000,
      chainId: 43113,
      accounts: [process.env.FUJI_ACCOUNT]
    },
    mainnet: {
      url: 'https://api.avax.network/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43114,
      accounts: []
    }
  }
}
