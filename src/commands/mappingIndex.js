const { ask } = require('../utils')
const CryptoJS = require('crypto-js')
const cryptoJSsha3 = require('crypto-js/sha3')

const _cryptoJS_sha3 = (value, options) => {
    if (options && options.encoding === 'hex') {
      if (value.length > 2 && value.substr(0, 2) === '0x') {
        value = value.substr(2)
      }
      value = CryptoJS.enc.Hex.parse(value)
    }

    return cryptoJSsha3(value, {
      outputLength: 256
    }).toString()
  }

  const calculateMappingIndex = (key, position) => {
    return '0x' + _cryptoJS_sha3(key + position, {encoding: 'hex'})
  }

module.exports = {
  name: 'mappingIndex',
  alias: ['mapi'],
  description: 'calculate mapping storage index by key and position',
  run:async toolbox => {
    const { parameters, print } = toolbox
    let key = parameters.first
    // 00000000000000000000000xbccc714d56bc0da0fd33d96d2a87b680dd6d0df6
    let position = parameters.second
    // 0000000000000000000000000000000000000000000000000000000000000005

    if (key === undefined) sender = await ask('key')
    if (position === undefined) nonce = await ask('position')
    const result = calculateMappingIndex(key, position)
    print.info(result)
  }
}
