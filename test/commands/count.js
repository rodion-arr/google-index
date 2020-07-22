'use strict'
const { suite, it } = require('mocha')
const childProcess = require('child_process')
const assert = require('assert')
const path = require('path')

suite('count command', () => {
  const tool = './bin/google-index'
  const cwd = path.join(__dirname, '../../')

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
