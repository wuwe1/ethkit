const { ask } = require('../utils')

const {
  GET_RESERVES,
  TOKEN0,
  TOKEN1,
  SYMBOL,
  DECIMALS
} = require('../common/signature')

const getParameter = (data, index) => {
  // index from 0
  return '0x' + data.slice(2).slice(index * 64, index * 64 + 64)
}

const uint256ToAddress = uint => {
  return '0x' + uint.slice(2).slice(24)
}

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
  return [symbol, decimal]
}

module.exports = {
  name: 'uniswapGetReserves',
  alias: ['unires'],
  description: '<pair address>',
  run: async toolbox => {
    const { parameters, web3 } = toolbox
    let pair = parameters.first

    if (pair === undefined) pair = await ask('pair')

    const reserves = await web3.eth.call({
      to: pair,
      data: GET_RESERVES
    })

    const _reserve0 = getParameter(reserves, 0)
    const _reserve1 = getParameter(reserves, 1)

    let token0 = await web3.eth.call({
      to: pair,
      data: TOKEN0
    })
    let token1 = await web3.eth.call({
      to: pair,
      data: TOKEN1
    })

    token0 = uint256ToAddress(token0)
    token1 = uint256ToAddress(token1)

    const [symbol0, decimals0] = await getTokenInfo(web3, token0)
    const [symbol1, decimals1] = await getTokenInfo(web3, token1)

    console.log(`${symbol0}: ${Number(_reserve0) / 10 ** decimals0}`)
    console.log(`${symbol1}: ${Number(_reserve1) / 10 ** decimals1}`)
  }
}
