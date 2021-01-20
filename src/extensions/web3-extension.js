const rlp = require('rlp')
const Web3 = require('web3')
const httpProvider = `https://mainnet.infura.io/v3/${process.env.WEB3_INFURA_PROJECT_ID}`
const web3 = new Web3(httpProvider || '')

module.exports = toolbox => {
  const getStorageAt = async (address, index) => {
    const storage = web3.eth.getStorageAt(address, index)
    return storage
  }

  const toChecksumAddress = address => {
    return web3.utils.toChecksumAddress(address)
  }

  const encodeFunctionSignature = arg => {
    return web3.eth.abi.encodeFunctionSignature(arg)
  }

  const calculateContractAddress = (sender, nonce) => {
    return '0x' + web3.utils.sha3(rlp.encode([sender, nonce])).slice(26) // 12 + 14
  }

  toolbox.web3 = {
    toChecksumAddress,
    getStorageAt,
    encodeFunctionSignature,
    calculateContractAddress
  }
}
