const puppeteer = require('puppeteer')

class CountCommand {
  /**
   * Main command handler
   */
  async run (sites = []) {
    const requests = []
    const browser = await puppeteer.launch()

    sites.forEach(site => {
      requests.push(this._getPagesCount(site, browser))
    })

    const result = await Promise.all(requests)

    await browser.close()

    return result
  }

  /**
   * Validates "sites" CLI argument to be valid JSON array
   */
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

  /**
   * Parses google search results in order to retrive pages count
   */
  async _getPagesCount (site, browser) {
    const googleDomain = 'https://google.com/search?hl=en-US&rls=en&q='
    const requestUrl = `${googleDomain}site:${site}`
    const result = {
      site: site,
      count: ''
    }

    try {
      const page = await browser.newPage()
      await page.goto(requestUrl)
      const element = await page.$('#result-stats')
      const text = await (await element.getProperty('textContent')).jsonValue()

      result.count = this._extractPagesCount(text)

      return result
    } catch (error) {
      result.count = `Error retrieving data from ${site}`
      return result
    }
  }

  /**
   * Extracts pages cpunt from strig like this - "About 1,190 results (0.21 seconds)"
   */
  _extractPagesCount (text = '') {
    const parts = text.split(' ')
    return parseInt(parts[1].replace(',', ''), 10)
  }
}

module.exports = { CountCommand }
