/*
  Send ETH from one account to another.

  Note:
  This test assumes that you are running hardhat with the following command:
  npx hardhat node
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

    // Count contract details.
    const countAddr = '0xFd875033d3f7E096c8df8aE708921B0C41C959Bf'
    const countAbi = [
      "function getCount() view returns (int)",
      "function incrementCounter()",
      "function decrementCounter()"
    ]

    // Connect to the contract.
    let countContract = new ethers.Contract(countAddr, countAbi, provider)

    // Connect the Signer so that it can interact with the Contract.
    countContract = countContract.connect(signer)

    // Get the current state of the contract.
    const count = await countContract.getCount()
    console.log('count: ', count.toString())

    // Increment the timer by updating the state of the Contract.
    await countContract.incrementCounter()
    console.log('Counter incremented')
  } catch(err) {
    console.error(err)
  }
}
start()
