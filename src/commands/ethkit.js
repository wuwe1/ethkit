module.exports = {
  name: 'ethkit',
  run: async toolbox => {
    const { print } = toolbox

    print.printHelp(toolbox)
  }
}
