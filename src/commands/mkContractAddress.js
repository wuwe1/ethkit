const { ask } = require('../utils')

module.exports = {
  name: 'mkContractAddress',
  alias: ['mkca'],
  description: 'calculate contract address by sender and nonce',
  run:async toolbox => {
    const { parameters, web3, print } = toolbox
    let sender = parameters.first
    let nonce = parameters.second

    if (sender === undefined) sender = await ask('sender')
    if (nonce === undefined) nonce = await ask('nonce')
    let result = web3.calculateContractAddress(sender, nonce)
    result = web3.utils.toChecksumAddress(result)
    print.info(result)
  }
}
