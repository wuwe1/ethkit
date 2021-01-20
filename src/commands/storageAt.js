const { ask } = require('../utils')

module.exports = {
  name: 'storageAt',
  alias: ['st'],
  description: 'getStorageAt',
  run: async toolbox => {
    const { parameters, web3, print } = toolbox
    let address = parameters.first
    let start = parameters.second
    let end = parameters.third

    if (address === undefined) address = await ask('address')
    if (start === undefined) start = await ask('start')

    address = web3.toChecksumAddress(address)
    if (end === undefined) {
      const s = await web3.getStorageAt(address, start)
      print.info(s)
    } else {
      for (let i = start; i <= end; i++) {
        const s = await web3.getStorageAt(address, i)
        print.info(s)
      }
    }
  }
}
