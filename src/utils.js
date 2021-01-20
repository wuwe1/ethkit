const { prompt } = require('gluegun/prompt')
module.exports = {
  ask: async name => {
    const result = await prompt.ask({
      type: 'input',
      name: name,
      message: `${name}> `
    })
    if (result && result[name]) return result[name]
  }
}
