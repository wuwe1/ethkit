const privateKeyToAddress = require('ethereum-private-key-to-address')

const { ask } = require('../utils')

module.exports = {
  name: 'privateKeyToAddress',
  alias: ['p2a'],
  description: 'convert private key to address',
  run: async toolbox => {
    const { parameters, print } = toolbox
    let privateKey = parameters.first

    if (privateKey === undefined) privateKey = await ask('privateKey')

    const address = privateKeyToAddress(privateKey)

    print.info(`${address}`)
  }
}
