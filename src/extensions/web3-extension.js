const rlp = require('rlp')
const Web3 = require('web3')
const httpProvider = `https://mainnet.infura.io/v3/${process.env.WEB3_INFURA_PROJECT_ID}`
const web3 = new Web3(httpProvider || '')

module.exports = toolbox => {
  const calculateContractAddress = (sender, nonce) => {
    const address = '0x' + web3.utils.sha3(rlp.encode([sender, nonce])).slice(26) // 12 + 14
    return web3.utils.toChecksumAddress(address)
  }

  toolbox.web3 = {
    utils: web3.utils,
    eth: web3.eth,
    calculateContractAddress
  }
}
