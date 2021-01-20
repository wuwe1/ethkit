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
    const result = web3.calculateContractAddress(sender, nonce)
    print.info(result)
  }
}
