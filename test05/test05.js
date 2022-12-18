/*
  Analyize the transaction history of an address.
*/

// const Web3 = require('web3')
// const provider = new Web3.providers.HttpProvider("http://localhost:8545")
// const web3 = new Web3(provider)

const ethers = require('ethers')

// Connect to Fuji RPC provided by AVA Labs
const provider = new ethers.providers.JsonRpcProvider(`https://api.avax-test.network/ext/bc/C/rpc`);
// console.log('provider: ', provider)

if(!process.env.FUJI_ACCOUNT) {
  console.log('FUJI_ACCOUNT environment variable not found. Can not start app.')
  return
}

// const signer = provider.getSigner()
// console.log('signer: ', signer)

async function start() {
  try {
    // Example of interacting with the AVAX node.
    const blockNum = await provider.getBlockNumber()
    console.log('blockNum: ', blockNum)

    // Instantiate a Signer from a private key.
    const signer = new ethers.Wallet(process.env.FUJI_ACCOUNT, provider)

    const address = await signer.getAddress()
    const balance = await signer.getBalance()
    const avaxBalance = balance / Math.pow(10,18)
    console.log(`Address ${address} has a blance of ${balance} wei or ${avaxBalance} AVAX`)

    const etherscanProvider = new ethers.providers.EtherscanProvider();
    const txHistory = await etherscanProvider.getHistory(address)
    console.log('txHistory: ', txHistory)

    // const abi = [
    //   "function balanceOf(walletAddress) view returns (uint256)",
    //   "function decimals() view returns (uint256)"
    // ];
    const abi = [
      // Read-Only Functions
      "function balanceOf(address owner) view returns (uint256)",
      "function decimals() view returns (uint8)",
      "function symbol() view returns (string)",

      // Authenticated Functions
      "function transfer(address to, uint amount) returns (bool)",

      // Events
      "event Transfer(address indexed from, address indexed to, uint amount)"
  ];
    const linkContractAddr = '0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846'
    const linkContract = new ethers.Contract(linkContractAddr,abi,provider);

    const decimals = await linkContract.decimals()
    console.log('decimals: ', decimals.toString())

    const walletAddress = address.toString()
    console.log('walletAddress: ', walletAddress)
    const linkBalance = await linkContract.balanceOf(walletAddress);
    console.log('LINK balance (wei): ', linkBalance.toString())
    const normalLinkBalance = linkBalance / Math.pow(10, 18)
    console.log('LINK balance (tokens): ', normalLinkBalance.toString())

  } catch(err) {
    console.error(err)
  }
}
start()
