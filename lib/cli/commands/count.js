const { CountCommand } = require('../../classes/commands/CountCommand')

module.exports = function () {
  return {
    command: 'count',
    desc: 'Count amount of pages in Google index',
    builder: function (yargs) {
      return yargs.option('sites', {
        describe: 'JSON array of sites domain for counting pages in index',
        type: 'string',
        group: 'options'
      })
        .option('under-root', {
          describe: 'Configure tool for running under root',
          type: 'boolean',
          group: 'options'
        })
        .demandOption(['sites'], 'Please provide "sites" option as array of site domains')
    },
    handler: function (argv) {
      const command = new CountCommand()
      const sites = command.validateSitesInput(argv)
      const isUnderRoot = argv['under-root']

      if (!sites) {
        console.log('Not valid JSON or not array')
        return
      }

      command.run(sites, isUnderRoot).then((results) => {
        console.log(JSON.stringify(results, null, 2))
        process.emit('commandResult', results)
      })
    }
  }
}
