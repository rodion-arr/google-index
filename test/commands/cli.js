'use strict'
const { suite, it } = require('mocha')
const childProcess = require('child_process')
const assert = require('assert')
const path = require('path')

suite('cli', () => {
  const tool = './bin/google-index'
  const cwd = path.join(__dirname, '../../')

  it('should handle fails', () => {
    const command = `${tool} not-existed-command`
    const result = childProcess.execSync(command, { cwd: cwd }).toString()

    assert.notStrictEqual(result.indexOf('Unknown command: not-existed-command'), -1)
  })
})
