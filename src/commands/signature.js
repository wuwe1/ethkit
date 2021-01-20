const { ask } = require('../utils')

module.exports = {
  name: 'signature',
  alias: ['sig'],
  description: 'function signature',
  run:async toolbox => {
    const { parameters, web3, print } = toolbox
    let arg = parameters.first

    if (arg === undefined) arg = await ask('arg')
    const sig = web3.encodeFunctionSignature(arg)
    print.info(sig)
  }
}
