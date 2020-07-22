class CountCommand {
  validateSitesInput (argv) {
    const { sites } = argv

    try {
      const sitesObj = JSON.parse(sites)
      if (!Array.isArray(sitesObj)) {
        throw new Error('not array')
      }

      return sitesObj
    } catch {
      return false
    }
  }

  async countIndexedPages (sites = []) {
    const requests = []

    sites.forEach(site => {
      requests.push(this._getPagesCount(site))
    })

    const result = await Promise.all(requests)

    return result
  }

  async _getPagesCount (site) {
    const googleDomain = 'https://google.com/search?q='
    const requestUrl = `${googleDomain}site:${site}`

    try {
      // TODO: fetch data

      return requestUrl
    } catch (error) {
      return `Error retrievint data from ${site}`
    }
  }
}

module.exports = { CountCommand }
