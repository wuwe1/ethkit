const { ask } = require('../utils')

module.exports = {
  name: 'uniswapGetAmountOut',
  alias: ['uniout'],
  description: 'uniswap getAmountOut <amountIn> <reverseIn> <reserveOut>',
  run: async toolbox => {
    const { parameters, print } = toolbox
    let amountIn = parameters.first
    let reserveIn = parameters.second
    let reserveOut = parameters.third

    if (amountIn === undefined) amountIn = await ask('amountIn')
    if (reserveIn === undefined) reserveIn = await ask('reserveIn')
    if (reserveOut === undefined) reserveOut = await ask('reserveOut')

    const amountInWithFee = amountIn * 997
    const numerator = amountInWithFee * reserveOut
    const denominator = reserveIn * 1000 + amountInWithFee
    const out = numerator / denominator
    print.info(`out: ${out} reverseIn: ${amountIn + reserveIn} reserveOut: ${reserveOut - out}`)
  }
}
