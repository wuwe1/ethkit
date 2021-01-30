const { ask } = require('../utils')

const { TOTAL_SUPPLY } = require('../common/signature')

module.exports = {
  name: 'ERC20Info',
  alias: ['info'],
  description: 'get basic info of ERC20 token',
  run: async toolbox => {
    const { parameters, web3, print } = toolbox
    let address = parameters.first

    if (address === undefined) address = await ask('address')

    web3.eth.call()

    print.info(`${sig} <= ${argCleaned}`)
  }
}
