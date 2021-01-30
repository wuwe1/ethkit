const { ask } = require('../utils')

const typeMap = new Map([['uint', 'uint256']])

const strip = s => {
  return s.replace(/^\s+|\s+$/g, '')
}

const clean = s => {
  const functionName = s.match(/(\w+)\(.*\)/)[1]
  let args = strip(s.match(/\((.*)\)/)[1])
  const argTypes = args.split(',').map(arg => {
    return strip(arg).split(' ')[0]
  })
  for (let i = 0; i < argTypes.length; i++) {
    const t = argTypes[i]
    argTypes[i] = typeMap.get(t) || t
  }
  return `${functionName}(${argTypes.join(',')})`
}

module.exports = {
  name: 'signature',
  alias: ['sig'],
  description: 'function signature',
  run: async toolbox => {
    const { parameters, web3, print } = toolbox
    let arg = parameters.first

    if (arg === undefined) arg = await ask('arg')

    const argCleaned = clean(arg)

    const sig = web3.eth.abi.encodeFunctionSignature(argCleaned)
    print.info(`${sig} <= ${argCleaned}`)
  }
}
