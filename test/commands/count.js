'use strict'
const { suite, it, afterEach } = require('mocha')
const childProcess = require('child_process')
const assert = require('assert')
const path = require('path')
const sinon = require('sinon')
const puppeteer = require('puppeteer')

suite('count command', () => {
  const tool = './bin/google-index'
  const cwd = path.join(__dirname, '../../')

  afterEach(() => {
    sinon.restore()
  })

  suite('validation', () => {
    it('should validate JSON in argv.sites', () => {
      const command = `${tool} count --sites=not-json`
      const result = childProcess.execSync(command, { cwd: cwd }).toString()

      assert.strictEqual(result, 'Not valid JSON or not array\n')
    })

    it('should validate for array in argv.sites', () => {
      const command = `${tool} count --sites='{"valid-json": true}'`
      const result = childProcess.execSync(command, { cwd: cwd }).toString()

      assert.strictEqual(result, 'Not valid JSON or not array\n')
    })
  })

  it('should retrieve pages amout', function (done) {
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

    require('../../lib/cli')()([
      'count',
      '--sites=\'["exmaple.com","example2.com"]\''
    ])

    process.once('commandResult', (results) => {
      assert.deepStrictEqual(results, [
        {
          count: 1190,
          site: 'exmaple.com'
        },
        {
          count: 'Error retrieving data from example2.com',
          site: 'example2.com'
        }
      ])

      done()
    })
  })

  it('should accept root configuration', function (done) {
    const jsonValueStub = sinon.stub()
    jsonValueStub.onCall(0).resolves('About 1,190 results (0.21 seconds)')

    const elementFake = {
      getProperty: sinon.fake.resolves({
        jsonValue: jsonValueStub
      })
    }

    const pageFake = {
      goto: sinon.fake.resolves(true),
      $: sinon.fake.resolves(elementFake)
    }

    sinon.mock(puppeteer).expects('launch').once().withArgs({ args: ['--no-sandbox'] })
      .resolves({
        newPage: sinon.fake.resolves(pageFake),
        close: sinon.fake.resolves(true)
      })

    require('../../lib/cli')()([
      'count',
      '--sites=\'["exmaple.com"]\'',
      '--under-root=true'
    ])

    process.once('commandResult', (results) => {
      assert.deepStrictEqual(results, [
        {
          count: 1190,
          site: 'exmaple.com'
        }
      ])

      done()
    })
  })
})
