const { suite, it, afterEach } = require('mocha')
const { count } = require('../../index')
const sinon = require('sinon')
const puppeteer = require('puppeteer')
const assert = require('assert')

suite('programmatic api', () => {
  afterEach(() => {
    sinon.restore()
  })

  it('should validate sites array length', async () => {
    try {
      await count([], false)
    } catch (e) {
      assert.strictEqual(e.message, 'sites array is empty')
    }
  })

  it('should validate sites array type', async () => {
    try {
      await count('string', false)
    } catch (e) {
      assert.strictEqual(e.message, 'sites array is empty')
    }
  })

  it('should have correct count api', async () => {
    const jsonValueStub = sinon.stub()
    jsonValueStub.onCall(0).resolves('About 1,190 results (0.21 seconds)')
    jsonValueStub.onCall(1).rejects(new Error())

    const elementFake = {
      getProperty: sinon.fake.resolves({
        jsonValue: jsonValueStub
      })
    }

    const pageFake = {
      goto: sinon.fake.resolves(true),
      $: sinon.fake.resolves(elementFake)
    }

    sinon.stub(puppeteer, 'launch').resolves({
      newPage: sinon.fake.resolves(pageFake),
      close: sinon.fake.resolves(true)
    })

    const results = await count(['example.com', 'example2.com'], false)
    assert.deepStrictEqual(results, [
      {
        count: 1190,
        site: 'example.com'
      },
      {
        count: 'Error retrieving data from example2.com',
        site: 'example2.com'
      }
    ])
  })
})
