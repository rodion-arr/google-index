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
        .demandOption(['sites'], 'Please provide "sites" option as array of site domains')
    },
    handler: function (argv) {
      const command = new CountCommand()
      const sites = command.validateSitesInput(argv)

      if (!sites) {
        console.log('Not valid JSON or not array')
      }

      // сommand.countIndexedPages(sites).then((results) => {
      //   console.log(results)
      // })
    }
  }
}
