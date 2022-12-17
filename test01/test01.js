/*
  Send ETH from one account to another.

  Note:
  This test assumes that you are running hardhat with the following command:
  npx hardhat node
*/

const Web3 = require('web3')
const provider = new Web3.providers.HttpProvider("http://localhost:8545")
const web3 = new Web3(provider)

async function start() {
  try {
    // Replace these values with private keys generated from testrpc
    const privKey1 = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
    const privKey2 = '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d'

    // Generate account 1
    const account1 = web3.eth.accounts.privateKeyToAccount(privKey1)
    console.log('account1: ', account1)
    let balance1 = await web3.eth.getBalance(account1.address)
    console.log('balance for account1: ', balance1)

    // Generate account 2
    const account2 = web3.eth.accounts.privateKeyToAccount(privKey2)
    console.log('account2: ', account2)
    let balance2 = await web3.eth.getBalance(account2.address)
    console.log('balance for account2: ', balance2)

    const from = account1.address
    const to = account2.address

    const transaction = {
      from,
      to,
      value: 100000
    }
    const txid = await web3.eth.sendTransaction(transaction)
    console.log('txid: ', txid)

    balance1 = await web3.eth.getBalance(account1.address)
    console.log('balance for account1: ', balance1)

    balance2 = await web3.eth.getBalance(account2.address)
    console.log('balance for account2: ', balance2)

  } catch(err) {
    console.error(err)
  }
}
start()
