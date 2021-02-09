const { ask } = require('../utils')

module.exports = {
  name: 'mkContractAddress',
  alias: ['mkca'],
  description:
    '<sender> <nonce> calculate contract address by sender and nonce',
  run: async toolbox => {
    const { parameters, web3, print } = toolbox
    let sender = parameters.first
    let nonce = parameters.second

    if (sender === undefined) sender = await ask('sender')
    if (nonce === undefined) {
      const info = []
      for (let n = 1; n <= 10; n++) {
        info.push({
          nonce: n,
          address: web3.calculateContractAddress(sender, n)
        })
      }
      console.table(info)
    } else {
      print.info(web3.calculateContractAddress(sender, nonce))
    }
  }
}
