/*
    Unit tests for the Count.sol contract
*/
/* eslint no-undef: 0 */

const { assert } = require('chai')
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers')

describe('#Count', () => {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployCountFixture () {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners()

    const Count = await ethers.getContractFactory('Count')
    const count = await Count.deploy()

    return { count, owner, otherAccount }
  }

  describe('Deployment', () => {
    it('should initialize the count to zero', async () => {
      const { count } = await loadFixture(deployCountFixture)
      const currentCnt = await count.getCount()
      console.log('currentCnt: ', currentCnt)

      assert.equal(currentCnt, 0)
    })

    it('should increment the count', async () => {
      const { count } = await loadFixture(deployCountFixture)
      await count.incrementCounter()
      const currentCnt = await count.getCount()
      console.log('currentCnt: ', currentCnt)

      assert.equal(currentCnt, 1)
    })

    it('should decrement the count', async () => {
      const { count } = await loadFixture(deployCountFixture)
      await count.decrementCounter()
      const currentCnt = await count.getCount()
      console.log('currentCnt: ', currentCnt)

      assert.equal(currentCnt, -1)
    })
  })
})
