'use strict'
const yargs = require('yargs/yargs')
const path = require('path')

module.exports = (options = {}) => {
  const cli = yargs()
    .demandCommand(1, 'You must specify the command to run')
    .strictCommands(true)
    .strict(true)
    .commandDir(path.join(__dirname, 'commands'), {
      visit: (mod) => typeof mod === 'function' ? mod(options) : mod
    })
    .usage('$0 <command> [options]')

  cli.wrap(Math.min(cli.terminalWidth(), 100))

  cli.fail((msg) => {
    console.error(msg)
    console.log()
    cli.showHelp()
    process.exit(1)
  })

  return (argv) => cli.parse(argv)
}
