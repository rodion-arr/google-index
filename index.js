const { CountCommand } = require('./lib/classes/commands/CountCommand')

module.exports.count = async (sites = [], underRoot = false) => {
  if (!Array.isArray(sites) || !sites.length) {
    throw new Error('sites array is empty')
  }

  return await (new CountCommand()).run(sites, underRoot)
}
