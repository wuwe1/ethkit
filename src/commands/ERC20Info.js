const { ask } = require('../utils')

const { NAME, SYMBOL, DECIMALS, TOTAL_SUPPLY } = require('../common/signature')

const getTokenInfo = async (web3, token) => {
  let symbol = await web3.eth.call({
    to: token,
    data: SYMBOL
  })
  symbol = web3.utils.hexToAscii(symbol)

  let decimal = await web3.eth.call({
    to: token,
    data: DECIMALS
  })
  decimal = Number(decimal)

  let name = await web3.eth.call({
    to: token,
    data: NAME
  })
  name = web3.utils.hexToAscii(name)

  let totalSupply = await web3.eth.call({
    to: token,
    data: TOTAL_SUPPLY
  })
  totalSupply = web3.utils.hexToNumberString(totalSupply)

  TOTAL_SUPPLY
  return {
    symbol,
    name,
    decimal,
    totalSupply
  }
}

module.exports = {
  name: 'ERC20Info',
  alias: ['tinfo'],
  description: '<address> get basic info of ERC20 token',
  run: async toolbox => {
    const { parameters, web3, print } = toolbox
    let address = parameters.first

    if (address === undefined) address = await ask('address')

    const { symbol, name, decimal, totalSupply } = await getTokenInfo(
      web3,
      address
    )

    print.info(`symbol: ${symbol}`)
    print.info(`name: ${name}`)
    print.info(`decimal: ${decimal}`)
    print.info(`totalSupply: ${totalSupply}`)
    print.info(`totalSupply normalized: ${totalSupply / 10 ** decimal}`)
  }
}
