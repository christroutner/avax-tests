/*
  Interact with the NFT contract by minting a new NFT.
*/

const ethers = require('ethers')
// console.log('ethers: ', ethers)

const contract = require('./artifacts/contracts/orange-fish-nft.sol/MyNFT.json')
// console.log('contract: ', JSON.stringify(contract, null, 2))


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
    const abi = contract.abi
    const contractAddress = '0x1320c664F388019af5a73a37e47540c367CbA310'

    // Create a contract instance
    const myNftContract = new ethers.Contract(contractAddress, abi, signer)

    // This metadata will define the token icon.
    const tokenUri = 'https://pearson-ipfs-gateway.fullstackcash.nl/ipfs/bafybeifonecrujf4gurhnrosmxk2ilu2rztwrosrkri5zt2k25f5kp2yse/data.json'

    // Call mintNFT function
    const mintNFT = async () => {
      let nftTxn = await myNftContract.mintNFT(signer.address, tokenUri)
      await nftTxn.wait()
      console.log(`NFT Minted! Check it out at: https://testnet.snowtrace.io/tx/${nftTxn.hash}`)
    }

    mintNFT()
      .then(() => process.exit(0))
      .catch((error) => {
          console.error(error);
          process.exit(1);
      });

  } catch(err) {
    console.error(err)
  }
}
start()

